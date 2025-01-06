import { Router } from "express";
import AuthRouter from "./authRoute";
import UtilRoute from "./utilRoutes";
import AdminRouter from "./adminRoute";
import StaffRouter from "./staffRoute";

const Routes = Router();

// ** Auth routes **//
Routes.use("/auth", AuthRouter);

// ** Admin route **//
Routes.use("/admin", AdminRouter);

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
export default Routes;
