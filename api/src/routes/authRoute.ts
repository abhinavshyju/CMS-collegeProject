import { Admin, Staff, Student } from "@/models";
import { Request, Response } from "express";

const { Router } = require("express");
const jwt = require("jsonwebtoken");

const AuthRouter = Router();

AuthRouter.get("/", (req: Request, res: Response) => {
  res.send("Auth route");
});

// Admin login
AuthRouter.post("/admin-login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await Admin.findOne({
      where: {
        email: email,
      },
    });
    if (result) {
      if (result.password === password) {
        const token = jwt.sign(
          {
            role: "admin",
            email: result["email"],
          },
          process.env.JWTKEY
        );
        res
          .status(200)
          .json({ messge: "Admin login successfully", token: token });
      } else {
        res.status(404).json({ messge: "Password not matched." });
      }
    } else {
      res.status(404).json({ massage: "Admin not found." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
});

AuthRouter.post("/staff-login", async (req: Request, res: Response) => {
  // staff login logic here
  console.log(req.body);
  const { email, password } = req.body;

  try {
    const result = await Staff.findOne({
      where: {
        email: email,
      },
    });
    if (result) {
      if (result.password === password) {
        const token = jwt.sign(
          {
            role: "staff",
            email: result["email"],
          },
          process.env.JWTKEY
        );
        res
          .status(200)
          .json({ messge: "Staff login successfully", token: token });
      } else {
        res.status(401).json("Password not matched.");
      }
    } else {
      res.status(404).json("Staff not found.");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
});

AuthRouter.post("/faculty-login", async (req: Request, res: Response) => {
  // Faculty login logic here
  const { email, password } = req.body;

  try {
    const result = await Staff.findOne({
      where: {
        email: email,
      },
    });
    if (result) {
      if (result.password === password) {
        const token = jwt.sign(
          {
            role: "faculty",
            email: result["email"],
          },
          process.env.JWTKEY
        );
        res
          .status(200)
          .json({ messge: "Faculty login successfully", token: token });
      } else {
        res.status(401).json("Password not matched.");
      }
    } else {
      res.status(404).json("Faculty not found.");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
});

AuthRouter.post("/student-login", async (req: Request, res: Response) => {
  // Student login logic here
  const { addmission_no, dob } = req.body;

  try {
    const result = await Student.findOne({
      where: {
        dob: dob,
      },
    });
    if (result) {
      if (result.dob === dob) {
        const token = jwt.sign(
          {
            role: "student",
            admissionNo: result.admissionNo,
          },
          process.env.JWTKEY
        );
        res
          .status(200)
          .json({ messge: "Faculty login successfully", token: token });
      } else {
        res.status(401).json("Password not matched.");
      }
    } else {
      res.status(404).json("Faculty not found.");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
});

export default AuthRouter;
