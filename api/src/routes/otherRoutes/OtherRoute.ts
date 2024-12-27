import ClassModel from "@/models/classModel";
import DepartmentModel from "@/models/departmentModel";
import { Request, Response } from "express";

const router = require("express").Router();

// TODO: create class route

router.post("/class", async (req: Request, res: Response) => {
  const { name, department_id } = req.body;
  const Class = await ClassModel.create({
    name: name,
    department_id: department_id,
  });
  res.status(200).json({ message: "Class created successfully", data: Class });
});

// todo: Create Department route

router.post("/department", async (req: Request, res: Response) => {
  const { name } = req.body;
  const Department = await DepartmentModel.create({
    name: name,
  });
  res
    .status(200)
    .json({ message: "Department created successfully", data: Department });
});

export default router;
