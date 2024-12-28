import TransactionSemesterModel from "@/models/semesterTransactionModel";
import StudentModel from "@/models/stundentModel";
import TransactionStudentsModel from "@/models/transactionModel";
import internalServerError from "@/utils/error";
import { Request, Response } from "express";

const SemesterRouter = require("express").Router();

SemesterRouter.post("/setSemester", async (req: Request, res: Response) => {
  try {
    const { semester_id, start_date, end_date, admission_date } = req.body;
    const semester = await TransactionSemesterModel.create({
      semester_id,
      start_date,
      end_date,
      admission_date,
    });
    const students = await StudentModel.findAll({
      where: {
        admission_date: admission_date,
      },
    });
    interface data {
      student_id: number;
      semester_id: number;
    }
    //   * For creating the transaction
    const insertData: data[] = [];
    students.forEach((student) => {
      insertData.push({
        student_id: student.dataValues.id,
        semester_id: semester.dataValues.id,
      });
    });

    const transaction = await TransactionStudentsModel.bulkCreate(
      insertData as any
    );
    res.status(200).json({
      message: "Semester created successfully",
      data: transaction,
    });
  } catch (error) {
    console.log(error);
    internalServerError(res);
  }
});

export default SemesterRouter;
