import { Semester, SemesterTransaction } from "@/models";
import internalServerError from "@/utils/error";
import { Request, Response } from "express";

const SemesterRouter = require("express").Router();

SemesterRouter.post("/setSemester", async (req: Request, res: Response) => {
  try {
    const { semester_id, start_date, end_date, admission_date } = req.body;
    const semster = await Semester.findOne({
      where: {
        id: semester_id,
      },
    });
    if (!semster) {
      return res.status(404).json({ message: "Semester not found" });
    }
    const result = await SemesterTransaction.create({
      admissionYear: admission_date,
      startDate: start_date,
      endDate: end_date,
    });
    await result.setSemester(semster);
    res
      .status(201)
      .json({ message: "Semester set successfully.", data: result });
  } catch (error) {
    console.log(error);
    internalServerError(res);
  }
});

export default SemesterRouter;
