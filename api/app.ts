import bodyParser from "body-parser";
import { Request, Response } from "express";
import "tsconfig-paths/register";

import connectDB from "./src/services/dbConnection";
import RelationsJoin from "./src/models/relations";

import adminRoute from "./src/routes/adminRoute/index";
import AuthRouter from "./src/routes/authRoute";
import AttendanceRouter from "./src/routes/attendanceRoute";
import StaffRouter from "./src/routes/staffRoute";
import SemesterRouter from "./src/routes/semesterRoute";
// const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 3000;
const cores = require("cors");
const dotenv = require("dotenv");

// const authRoute = require("./src/routes/authRoute");
// const staffRoute = require("./src/routes/staffRoute");
// const adminRoute = require("./src/routes/adminRoute/index");
// const testRoute = require("./src/routes/testRoute");
// const eventRoute = require("./src/routes/eventRoute");

dotenv.config({ path: "./.env" });

// Database connection

try {
  connectDB();
  RelationsJoin();
} catch (error) {
  console.error(error);
}

app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cores({
    origin: "*",
    methods: ["GET", "POST", "PATCH"],
  })
);

app.get("/", (req: Request, res: Response) => res.send("Hello World!"));

// app.use("/auth", authRoute);
app.use("/admin", adminRoute);
app.use("/auth", AuthRouter);

app.use("/staff", StaffRouter);
// app.use("/event", eventRoute);

// * Attendance Route

app.use("/attendance", AttendanceRouter);
app.use("/sem", SemesterRouter);

// app.use("/test", testRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
