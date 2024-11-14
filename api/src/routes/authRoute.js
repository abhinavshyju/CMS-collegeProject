const { Router } = require("express");
const AdminModel = require("../models/adminModel");
const jwt = require("jsonwebtoken");
const FacultyModel = require("../models/facultyModel");
const StaffModel = require("../models/staffModel");
const StudentModel = require("../models/stundentModel");
const UniversityDetailsModel = require("../models/universityDetailsModel");
const router = Router();

router.get("/", (req, res) => {
  res.send("Auth route");
});

// Admin login
router.post("/admin-login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await AdminModel.findOne({
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
        res.status(401).json("Password not matched.");
      }
    } else {
      res.status(404).json("Admin not found.");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
});

router.post("/staff-login", async (req, res) => {
  // staff login logic here
  const { email, password } = req.body;

  try {
    const result = await StaffModel.findOne({
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

router.post("/faculty-login", async (req, res) => {
  // Faculty login logic here
  const { email, password } = req.body;

  try {
    const result = await FacultyModel.findOne({
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

router.post("/student-login", async (req, res) => {
  // Student login logic here
  const { addmission_no, dob } = req.body;

  try {
    const result = await StudentModel.findOne({
      where: {
        dob: dob,
      },
      include: UniversityDetailsModel,
    });
    if (result) {
      if (result.password === password) {
        const token = jwt.sign(
          {
            role: "student",
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

module.exports = router;
