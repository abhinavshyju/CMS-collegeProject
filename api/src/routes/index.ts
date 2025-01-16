import { Router } from "express";
import AuthRouter from "./authRoute";
import UtilRoute from "./utilRoutes";
import AdminRouter from "./adminRoute";
import StaffRouter from "./staffRoute";
import AttendanceRouter from "./attendanceRoute/test.index";
import SemesterRouter from "./semesterRoute";
import ClassRouter from "./class";
import StudentFormRouter from "./student-form";

const Routes = Router();

// ** Auth routes **//
Routes.use("/auth", AuthRouter);

// ** Admin route **//
Routes.use("/admin", AdminRouter);

// ** Attendance route **//
Routes.use("/attendance", AttendanceRouter);

// ** Semester route **//
Routes.use("/semester", SemesterRouter);

//  ** Staff route **//
/*
this route contains : 
- Add students
- view students
 */

Routes.use("/staff/", StaffRouter);

//* Util routes
/* routes : 
	create class 
	create semester
	create department */
Routes.use("/admin/util", UtilRoute);
Routes.use("/util", UtilRoute);

// ** Class route **//

Routes.use("/class", ClassRouter);

// ** Student form route **//
Routes.use("/student-form", StudentFormRouter);
export default Routes;
