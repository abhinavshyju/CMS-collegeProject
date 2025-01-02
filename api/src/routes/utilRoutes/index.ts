import { Router } from "express";

const UtilRoute = Router();
const createClass = require("./class");
const createSemester = require("./semester");
const department = require("./department");
const staffRole = require("./staff-role");
const facultyRole = require("./faculty-role");

UtilRoute.get("/", (req, res) => {
  res.send("Util Route");
});

UtilRoute.use("/", createClass);
UtilRoute.use("/", createSemester);
UtilRoute.use("/", department);
UtilRoute.use("/", staffRole);
UtilRoute.use("/", facultyRole);

export default UtilRoute;
