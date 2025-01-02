import { Attendance, Faculty, StudentTransaction, WorkingDay } from "@/models";
import internalServerError from "@/utils/error";
import { Request, Response } from "express";

const AttendanceRouter = require("express").Router();

AttendanceRouter.post("/", async (req: Request, res: Response) => {
  interface AttendanceDataType {
    transaction_id: number;
    status: boolean;
  }

  const { attendancedata, date, hour, faculty_id } = req.body;

  try {
    if (!Array.isArray(attendancedata)) {
      return res
        .status(400)
        .json({ message: "Invalid attendance data format" });
    }

    const [attendanceDate] = await WorkingDay.findOrCreate({
      where: { date: date },
    });

    const faculty = await Faculty.findOne({
      where: { id: faculty_id },
    });

    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    const transactionIds = attendancedata.map((data) => data.transaction_id);
    const transactions = await StudentTransaction.findAll({
      where: {
        id: transactionIds,
      },
    });

    if (transactions.length !== transactionIds.length) {
      return res.status(404).json({
        message: "Some transactions are not found",
      });
    }

    const transactionMap = new Map(
      transactions.map((transaction) => [transaction.id, transaction])
    );

    const attendanceEntries = attendancedata.map((data) => ({
      hour: hour,
      status: data.status,
      FacultyId: faculty.id,
      WorkingDayId: attendanceDate.id,
      StudentTransactionId: transactionMap.get(data.transaction_id)?.id,
    }));

    const createdRecords = await Attendance.bulkCreate(attendanceEntries);

    res.status(201).json({
      message: "Attendance created successfully",
      data: createdRecords,
    });
  } catch (error) {
    console.error("Error creating attendance:", error);
    internalServerError(res);
  }
});

AttendanceRouter.get("/", async (req: Request, res: Response) => {
  interface attendacesType {
    hour: number;
    status: boolean;
    faculty: string;
    facultId: number;
  }
  interface attendanceByDate {
    date: string;
    attend: number;
    attendance: attendacesType[];
  }
  interface student {
    name: string;
    class: string;
    attendances: attendanceByDate[];
  }

  try {
    // Fetch all the students with their attendance and associated faculties and dates
    const result = await .findAll({
      attributes: ["student_id"],
      include: [
        {
          model: ClassModel,
          attributes: ["class"],
        },
        {
          model: AttendanceModel,
          attributes: ["hour", "status"],
          include: [
            {
              model: FacultyModel,
              attributes: ["name", "id"],
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
      const className = studentData.class.class;

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
              faculty_id: attendance.faculty.id,
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
        class: className,
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

// * sorting by class

AttendanceRouter.get("/class/:id", async (req: Request, res: Response) => {
  const classId = req.params.id;
  interface attendacesType {
    hour: number;
    status: boolean;
    faculty: string;
    facultId: number;
  }
  interface attendanceByDate {
    date: string;
    attend: number;
    attendance: attendacesType[];
  }
  interface student {
    name: string;
    class: string;
    attendances: attendanceByDate[];
  }

  try {
    const classData = await ClassModel.findByPk(classId);
    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }

    // Fetch all the students with their attendance and associated faculties and dates
    const result = await StudentModel.findAll({
      attributes: ["name"],
      where: {
        class_id: classId,
      },
      include: [
        {
          model: ClassModel,
          attributes: ["class"],
        },
        {
          model: AttendanceModel,
          attributes: ["hour", "status"],
          include: [
            {
              model: FacultyModel,
              attributes: ["name", "id"],
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
      const className = studentData.class.class;

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
              faculty_id: attendance.faculty.id,
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
        class: className,
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

// * sorting by student

AttendanceRouter.get("/student/:id", async (req: Request, res: Response) => {
  const studentId = req.params.id;
  interface attendacesType {
    hour: number;
    status: boolean;
    faculty: string;
    facultId: number;
  }
  interface attendanceByDate {
    date: string;
    attend: number;
    attendance: attendacesType[];
  }
  interface student {
    name: string;
    class: string;
    attendances: attendanceByDate[];
  }

  try {
    const studentData = await StudentModel.findByPk(studentId);
    if (!studentData) {
      return res.status(404).json({ message: "Student not found" });
    }
    // Fetch all the students with their attendance and associated faculties and dates
    const result = await StudentModel.findAll({
      attributes: ["name"],
      where: {
        id: studentId,
      },
      include: [
        {
          model: ClassModel,
          attributes: ["class"],
        },
        {
          model: AttendanceModel,
          attributes: ["hour", "status"],
          include: [
            {
              model: FacultyModel,
              attributes: ["name", "id"],
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
      const className = studentData.class.class;

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
              faculty_id: attendance.faculty.id,
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
        class: className,
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
