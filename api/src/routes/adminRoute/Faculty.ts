import FacultyModel from "@/models/facultyModel";
import FacultyRoleModel from "@/models/facultyRoleModel";
import internalServerError from "@/utils/error";
import { Request, Response } from "express";

const router = require("express").Router();

interface faculty {
  id: number;
  name: string;
  email: string;
  role: string;
}

router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    const faculty_role = await FacultyRoleModel.findOne({
      where: {
        role: role,
      },
    });

    //  todo : change the id of role
    const roleId = faculty_role?.dataValues.id;
    console.log(roleId);

    const faculty = await FacultyModel.create({
      name: name,
      email: email,
      password: password,
      role_id: 1,
    });
    res
      .status(201)
      .json({ message: "Faculty created successfully", data: faculty });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const faculty = await FacultyModel.findAll({
      include: FacultyRoleModel,
    });

    if (!faculty) {
      res.status(404).json({ message: "Faculties are not found" });
    }
    const result: faculty[] = [];
    faculty.forEach((item: any) => {
      const obj = {
        id: item.id,
        name: item.name,
        email: item.email,
        role: item["faculty-role"].role,
      };
      result.push(obj);
    });
    res
      .status(200)
      .json({ message: "Faculty are found successfully", data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.patch("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await FacultyModel.update(req.body, {
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
