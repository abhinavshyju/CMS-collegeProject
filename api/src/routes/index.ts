import { Router } from "express";
import AuthRouter from "./authRoute";
import UtilRoute from "./utilRoutes";

const Routes = Router();

// ** Auth routes **//
Routes.use("/auth", AuthRouter);

//* Util routes
/* routes : 
	create class 
	create semester
	create department */
Routes.use("/admin/util", UtilRoute);
export default Routes;
