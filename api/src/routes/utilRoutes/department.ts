import { Department } from "@/models";
import internalServerError from "@/utils/error";
import { Request, Response } from "express";

const router = require("express").Router();

router.post("/create-department", async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    if (!name) {
      res.status(400).json({ message: "Name is required" });
    }
    const department = await Department.create({
      department: name,
    });
    res
      .status(201)
      .json({ message: "Department created successfully", data: department });
  } catch (error) {
    internalServerError(res);
  }
});
router.get("/department", async (req: Request, res: Response) => {
  try {
    const department = await Department.findAll();
    if (!department) {
      res.status(404).json({ message: "Department is not found" });
    }
    res
      .status(200)
      .json({ massage: "Department fetched successfully", data: department });
  } catch (error) {
    internalServerError(res);
  }
});

module.exports = router;
