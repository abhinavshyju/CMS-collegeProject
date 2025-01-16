import {
  Class,
  Semester,
  SemesterTransaction,
  Student,
  StudentTransaction,
} from "@/models";
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
    const conTest = await SemesterTransaction.findOne({
      where: {
        semesterId: semster.id,
        admissionYear: admission_date,
      },
    });
    if (conTest) {
      return res.status(400).json({ message: "Semester already set" });
    }
    const result = await SemesterTransaction.create({
      admissionYear: admission_date,
      startDate: start_date,
      endDate: end_date,
      semesterId: semster.id,
    });
    await result.setSemester(semster);
    const students = await Student.findAll({
      include: [
        {
          model: Class,
          as: "class",
        },
      ],
      where: {
        admissionYear: admission_date,
      },
    });

    interface StudentType {
      semesterTransactionId: number;
      classId: number | undefined;
      studentId: number;
    }

    // Assuming the `students` array has the following shape
    interface Student {
      id: number;
      class?: {
        id: number;
      };
    }

    const studentsData: StudentType[] = [];

    students.forEach((student) => {
      const obj: StudentType = {
        semesterTransactionId: result.id,
        classId: student.class?.id,
        studentId: student.id,
      };
      studentsData.push(obj);
    });

    const createStudentTransaction = await StudentTransaction.bulkCreate(
      studentsData
    );
    res.status(201).json({
      message: "Semester set successfully.",
      data: [result, createStudentTransaction],
    });
  } catch (error) {
    console.log(error);
    internalServerError(res);
  }
});

export default SemesterRouter;
