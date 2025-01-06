import { Request, Response } from "express";
import internalServerError from "@/utils/error";
import { Staff, StaffRole } from "@/models";

const express = require("express");
const router = express.Router();

interface staff {
  id: number;
  name: string;
  email: string;
  role: string;
}

// route : /admin/staff/
router.get("/", async (req: Request, res: Response) => {
  try {
    const staff = await Staff.findAll({
      include: [
        {
          model: StaffRole,
          as: "staffRole",
        },
      ],
    });

    if (!staff) {
      res.status(404).json({ message: "Faculties are not found" });
    }
    const result: staff[] = [];
    staff.forEach((item: any) => {
      const obj = {
        id: item.id,
        name: item.name,
        email: item.email,
        role: item["staffRole"].role,
      };
      result.push(obj);
    });
    res
      .status(200)
      .json({ message: "staff are found successfully", data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
// rotue : /admin/staff/
router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, email, password, role_id } = req.body;

    const staff = await Staff.create({
      name: name,
      email: email,
      password: password,
      staffRoleId: role_id,
    });

    res
      .status(201)
      .json({ message: "Staff created successfully", data: staff });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server   Error" });
  }
});
// Route : /admin/staff/:id
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await Staff.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: StaffRole,
          attributes: ["role"],
        },
      ],
    });
    if (!result) {
      res.status(404).json({ message: "Staff is not found" });
    }
    res.status(200).json({ message: "Data fetched", data: result });
  } catch (error) {
    internalServerError(res);
  }
});

router.patch("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await Staff.update(req.body, {
      where: {
        id: id,
      },
    });
    res.status(200).json({ message: "Staff updated successfully" });
  } catch (error) {
    internalServerError(res);
  }
});

export default router;
