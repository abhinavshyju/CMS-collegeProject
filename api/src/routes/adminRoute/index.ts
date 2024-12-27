import StaffSubRoute from "./Staff";
import FacultySubRoute from "./Faculty";

const { Router } = require("express");

const router = Router();

router.use("/staff", StaffSubRoute);
router.use("/faculty", FacultySubRoute);
1;

export default router;
