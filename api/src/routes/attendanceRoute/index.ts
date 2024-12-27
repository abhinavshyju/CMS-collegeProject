import AttendanceModel from "@/models/attendaceModel";
import AttendanceDateModel from "@/models/attendanceDateModel";
import FacultyModel from "@/models/facultyModel";
import StudentModel from "@/models/stundentModel";
import internalServerError from "@/utils/error";
import { Request, Response } from "express";
import { it } from "node:test";

const AttendanceRouter = require("express").Router();

AttendanceRouter.post("/", async (req: Request, res: Response) => {
  const { attendancedata, date, hour, faculty_id } = req.body;

  let attendanceDate: any;
  try {
    attendanceDate = await AttendanceDateModel.findOrCreate({
      where: {
        date: date,
      },
    });
  } catch (error) {
    internalServerError(res);
  }

  interface Data {
    student_id: number;
    status: boolean;
    faculty_id: number;
    date_id: number;
    hour: number;
  }

  const DataToInsert: Data[] = attendancedata.map(
    (item: { student_id: number; status: boolean }) => ({
      student_id: item.student_id,
      status: item.status,
      faculty_id,
      date_id: attendanceDate[0].id,
      hour,
    })
  );

  try {
    await AttendanceModel.bulkCreate(DataToInsert);
    res.status(201).json({ message: "Attendance created successfully" });
  } catch (error) {
    console.error("Error in creating attendance:", error);
    res.status(500).json({ message: "Error in creating attendance" });
  }
});

AttendanceRouter.get("/", async (req: Request, res: Response) => {
  interface attendacesType {
    hour: number;
    status: boolean;
    faculty: string;
  }
  interface attendanceByDate {
    date: string;
    attend: number;
    attendance: attendacesType[];
  }
  interface student {
    name: string;
    attendances: attendanceByDate[];
  }

  try {
    // Fetch all the students with their attendance and associated faculties and dates
    const result = await StudentModel.findAll({
      attributes: ["name"],
      include: [
        {
          model: AttendanceModel,
          attributes: ["hour", "status"],
          include: [
            {
              model: FacultyModel,
              attributes: ["name"],
            },
            {
              model: AttendanceDateModel,
              attributes: ["date"],
            },
          ],
        },
      ],
    });

    // Fetch all the working days (attendance dates)
    const workingDays = await AttendanceDateModel.findAll({
      attributes: ["date"],
    });

    // Prepare the student attendance data
    const students: student[] = result.map((studentItem) => {
      const studentData = studentItem.toJSON();
      const studentName = studentData.name;

      // Collect attendance data by date for the student
      const attendancesByDate: attendanceByDate[] = workingDays.map(
        (workingDay) => {
          const date = workingDay.toJSON().date;
          const attendancesForDate = studentData.attendances
            .filter(
              (attendance: any) => attendance.attendance_date.date === date
            )
            .map((attendance: any) => ({
              hour: attendance.hour,
              status: attendance.status,
              faculty: attendance.faculty.name,
            }));

          return {
            date,
            attend:
              attendancesForDate.filter((attendance: any) => attendance.status)
                .length / attendancesForDate.length,
            attendance: attendancesForDate,
          };
        }
      );

      return {
        name: studentName,
        attendances: attendancesByDate,
      };
    });
    res.status(202).json({
      message: "Attendance data fetched successfully. ",
      data: students,
    });
  } catch (error) {
    internalServerError(res);
  }
});

export default AttendanceRouter;
