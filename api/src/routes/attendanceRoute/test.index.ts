import {
  Attendance,
  Faculty,
  Student,
  StudentTransaction,
  WorkingDay,
} from "@/models";
import internalServerError from "@/utils/error";
import { Request, Response } from "express";
import { stat } from "fs";

const AttendanceRouter = require("express").Router();
const date = new Date();

const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, "0");
const day = String(date.getDate()).padStart(2, "0");

const todayFormattedDate = `${year}-${month}-${day}`;
AttendanceRouter.post("/", async (req: Request, res: Response) => {
  interface AttendanceDataType {
    transaction_id: number;
    status: boolean;
  }
  interface InsertionDataType {
    studentTransactionId: number;
    status: boolean;
    workingDayId: number;
    hour: number;
    facultyId: number;
  }

  const { class_id, hour, student_ids } = req.body;
  console.log(req.headers.id);

  const today = await WorkingDay.findOrCreate({
    where: {
      date: todayFormattedDate,
    },
    defaults: {
      date: todayFormattedDate,
    },
  });

  const studentData = await StudentTransaction.findAll({
    where: {
      semesterTransactionId: class_id,
    },
  });

  const InsertionData: InsertionDataType[] = [];
  studentData.map((student: any) => {
    if (student_ids.includes(String(student.id))) {
      const obj: InsertionDataType = {
        studentTransactionId: student.id,
        status: false,
        hour: parseInt(hour.replace(/{|}/g, ""), 10),
        workingDayId: today[0].id,
        facultyId: req.headers.id as unknown as number,
      };
      InsertionData.push(obj);
    } else {
      const obj: InsertionDataType = {
        studentTransactionId: student.id,
        status: true,
        hour: parseInt(hour.replace(/{|}/g, ""), 10),
        workingDayId: today[0].id,
        facultyId: req.headers.id as unknown as number,
      };
      InsertionData.push(obj);
    }
  });
  await Attendance.bulkCreate(InsertionData);
  res.json("dfsd");
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
    const result = await StudentTransaction.findAll({
      attributes: ["student_id"],
      include: [
        {
          model: Student,
          as: "student",
        },
      ],
    });
    // Fetch all the working days (attendance dates)
    const workingDays = await WorkingDay.findAll({
      attributes: ["date"],
    });

    // // Prepare the student attendance data
    // const students: student[] = result.map((studentItem) => {
    //   const studentData = studentItem.toJSON();
    //   const studentName = studentData..;
    //   const className = studentData.class.class;

    //   // Collect attendance data by date for the student
    //   const attendancesByDate: attendanceByDate[] = workingDays.map(
    //     (workingDay) => {
    //       const date = workingDay.toJSON().date;
    //       const attendancesForDate = studentData.attendances
    //         .filter(
    //           (attendance: any) => attendance.attendance_date.date === date
    //         )
    //         .map((attendance: any) => ({
    //           hour: attendance.hour,
    //           status: attendance.status,
    //           faculty: attendance.faculty.name,
    //           faculty_id: attendance.faculty.id,
    //         }));

    //       return {
    //         date,
    //         attend:
    //           attendancesForDate.filter((attendance: any) => attendance.status)
    //             .length / attendancesForDate.length,
    //         attendance: attendancesForDate,
    //       };
    //     }
    //   );

    //   return {
    //     name: studentName,
    //     class: className,
    //     attendances: attendancesByDate,
    //   };
    // });
    res.status(202).json({
      message: "Attendance data fetchedss successfully. ",
      data: result,
    });
  } catch (error) {
    internalServerError(res);
  }
});

// * sorting by class

// AttendanceRouter.get("/class/:id", async (req: Request, res: Response) => {
//   const classId = req.params.id;
//   interface attendacesType {
//     hour: number;
//     status: boolean;
//     faculty: string;
//     facultId: number;
//   }
//   interface attendanceByDate {
//     date: string;
//     attend: number;
//     attendance: attendacesType[];
//   }
//   interface student {
//     name: string;
//     class: string;
//     attendances: attendanceByDate[];
//   }

//   try {
//     const classData = await ClassModel.findByPk(classId);
//     if (!classData) {
//       return res.status(404).json({ message: "Class not found" });
//     }

//     // Fetch all the students with their attendance and associated faculties and dates
//     const result = await StudentModel.findAll({
//       attributes: ["name"],
//       where: {
//         class_id: classId,
//       },
//       include: [
//         {
//           model: ClassModel,
//           attributes: ["class"],
//         },
//         {
//           model: AttendanceModel,
//           attributes: ["hour", "status"],
//           include: [
//             {
//               model: FacultyModel,
//               attributes: ["name", "id"],
//             },
//             {
//               model: AttendanceDateModel,
//               attributes: ["date"],
//             },
//           ],
//         },
//       ],
//     });
//     // Fetch all the working days (attendance dates)
//     const workingDays = await AttendanceDateModel.findAll({
//       attributes: ["date"],
//     });

//     // Prepare the student attendance data
//     const students: student[] = result.map((studentItem) => {
//       const studentData = studentItem.toJSON();
//       const studentName = studentData.name;
//       const className = studentData.class.class;

//       // Collect attendance data by date for the student
//       const attendancesByDate: attendanceByDate[] = workingDays.map(
//         (workingDay) => {
//           const date = workingDay.toJSON().date;
//           const attendancesForDate = studentData.attendances
//             .filter(
//               (attendance: any) => attendance.attendance_date.date === date
//             )
//             .map((attendance: any) => ({
//               hour: attendance.hour,
//               status: attendance.status,
//               faculty: attendance.faculty.name,
//               faculty_id: attendance.faculty.id,
//             }));

//           return {
//             date,
//             attend:
//               attendancesForDate.filter((attendance: any) => attendance.status)
//                 .length / attendancesForDate.length,
//             attendance: attendancesForDate,
//           };
//         }
//       );

//       return {
//         name: studentName,
//         class: className,
//         attendances: attendancesByDate,
//       };
//     });
//     res.status(202).json({
//       message: "Attendance data fetched successfully. ",
//       data: students,
//     });
//   } catch (error) {
//     internalServerError(res);
//   }
// });

// * sorting by student

// AttendanceRouter.get("/student/:id", async (req: Request, res: Response) => {
//   const studentId = req.params.id;
//   interface attendacesType {
//     hour: number;
//     status: boolean;
//     faculty: string;
//     facultId: number;
//   }
//   interface attendanceByDate {
//     date: string;
//     attend: number;
//     attendance: attendacesType[];
//   }
//   interface student {
//     name: string;
//     class: string;
//     attendances: attendanceByDate[];
//   }

//   try {
//     const studentData = await StudentModel.findByPk(studentId);
//     if (!studentData) {
//       return res.status(404).json({ message: "Student not found" });
//     }
//     // Fetch all the students with their attendance and associated faculties and dates
//     const result = await StudentModel.findAll({
//       attributes: ["name"],
//       where: {
//         id: studentId,
//       },
//       include: [
//         {
//           model: ClassModel,
//           attributes: ["class"],
//         },
//         {
//           model: AttendanceModel,
//           attributes: ["hour", "status"],
//           include: [
//             {
//               model: FacultyModel,
//               attributes: ["name", "id"],
//             },
//             {
//               model: AttendanceDateModel,
//               attributes: ["date"],
//             },
//           ],
//         },
//       ],
//     });
//     // Fetch all the working days (attendance dates)
//     const workingDays = await AttendanceDateModel.findAll({
//       attributes: ["date"],
//     });

//     // Prepare the student attendance data
//     const students: student[] = result.map((studentItem) => {
//       const studentData = studentItem.toJSON();
//       const studentName = studentData.name;
//       const className = studentData.class.class;

//       // Collect attendance data by date for the student
//       const attendancesByDate: attendanceByDate[] = workingDays.map(
//         (workingDay) => {
//           const date = workingDay.toJSON().date;
//           const attendancesForDate = studentData.attendances
//             .filter(
//               (attendance: any) => attendance.attendance_date.date === date
//             )
//             .map((attendance: any) => ({
//               hour: attendance.hour,
//               status: attendance.status,
//               faculty: attendance.faculty.name,
//               faculty_id: attendance.faculty.id,
//             }));

//           return {
//             date,
//             attend:
//               attendancesForDate.filter((attendance: any) => attendance.status)
//                 .length / attendancesForDate.length,
//             attendance: attendancesForDate,
//           };
//         }
//       );

//       return {
//         name: studentName,
//         class: className,
//         attendances: attendancesByDate,
//       };
//     });
//     res.status(202).json({
//       message: "Attendance data fetched successfully. ",
//       data: students,
//     });
//   } catch (error) {
//     internalServerError(res);
//   }
// });

AttendanceRouter.post(
  "/get-students/:id",
  async (req: Request, res: Response) => {
    interface studentType {
      id: number;
      name: string;
      status: boolean;
    }
    const hour = req.body.hour;
    const semesterTransactionId = req.params.id;
    const workingDay = await WorkingDay.findOne({
      where: {
        date: todayFormattedDate,
      },
    });

    try {
      const attendanceExsist = await Attendance.findAll({
        where: {
          workingDayId: workingDay!.id,
          hour: parseInt(hour.replace(/{|}/g, ""), 10),
        },
        include: [
          {
            model: StudentTransaction,
            as: "studentTransaction",
            include: [{ model: Student, as: "student" }],
            where: {
              semesterTransactionId: semesterTransactionId,
            },
          },
        ],
      });
      if (attendanceExsist.length > 0) {
        const response: studentType[] = [];
        attendanceExsist.forEach((student: any) => {
          const obj = {
            id: student.studentTransaction.id,
            name: student.studentTransaction.student.name,
            status: student.status,
          };
          response.push(obj);
        });
        res.status(200).json({
          message: "Students fetched successfully. ",
          data: response,
          alredyPresent: true,
        });
      } else {
        const result = await StudentTransaction.findAll({
          include: [
            {
              model: Student,
              as: "student",
            },
          ],
          where: {
            semesterTransactionId: semesterTransactionId,
          },
        });
        const response: studentType[] = [];
        result.forEach((student: any) => {
          const obj = {
            id: student.id,
            name: student.student.name,
            status: true,
          };
          response.push(obj);
        });
        res.status(200).json({
          message: "Students fetched successfully. ",
          data: response,
          alredyPresent: false,
        });
      }
    } catch (error) {
      internalServerError(res);
    }
  }
);
export default AttendanceRouter;
