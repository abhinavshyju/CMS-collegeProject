import StaffSubRoute from "./Staff";
import FacultySubRoute from "./Faculty";

const { Router } = require("express");

const AdminRouter = Router();

AdminRouter.use("/staff", StaffSubRoute);
AdminRouter.use("/faculty", FacultySubRoute);
1;

export default AdminRouter;
