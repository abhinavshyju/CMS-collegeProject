import { Department, Faculty, FacultyRole, User } from "@/models";
import internalServerError from "@/utils/error";
import { Request, Response } from "express";

const router = require("express").Router();

interface facultyType {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
}

router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, email, password, role_id, department_id } = req.body;
    const faculty = await Faculty.create({
      name: name,
      email: email,
      password: password,
      departmentId: department_id,
      facultyRoleId: role_id,
    });
    const user = await User.create({
      username: email,
      password: password,
      role: "faculty",
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
    const faculty = await Faculty.findAll({
      include: [
        {
          model: FacultyRole,
          as: "facultyRole",
        },
        {
          model: Department,
          as: "department",
        },
      ],
    });

    if (faculty.length === 0) {
      return res.status(404).json({ message: "Faculties are not found" });
    }

    const result: facultyType[] = [];
    faculty.forEach((item: any) => {
      const obj = {
        id: item.id,
        name: item.name,
        email: item.email,
        role: item.facultyRole.role,
        department: item.department.department,
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
    const result = await Faculty.update(req.body, {
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
