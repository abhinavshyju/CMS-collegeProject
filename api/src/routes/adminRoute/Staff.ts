import StaffRoleModel from "@/models/staffRoleModel";
import StaffModel from "@/models/staffModel";
import { Request, Response } from "express";
import internalServerError from "@/utils/error";

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
    const staff = await StaffModel.findAll({
      include: StaffRoleModel,
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
        role: item["staff-role"].role,
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
    const { name, email, password, role } = req.body;

    const staff_role = await StaffRoleModel.findOne({ where: { role } });
    if (!staff_role) {
      res.status(404).json({ message: "Staff role is not found." });
    }

    const roleId = staff_role?.dataValues.id;

    const staff = await StaffModel.create({
      name: name,
      email: email,
      password: password,
      role_id: 1,
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
    const result = await StaffModel.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: StaffRoleModel,
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
    const result = await StaffModel.update(req.body, {
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
