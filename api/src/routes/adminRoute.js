const { Router } = require("express");
const RoleModel = require("../models/RoleModel");
const StaffModel = require("../models/staffModel");
const FacultyModel = require("../models/facultyModel");
const FacultyRoleModel = require("../models/facultyRoleModel");

const router = Router();

router.post("/add-staff", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const staff_role = await RoleModel.findOne({ role: role });
    if (!staff_role) {
      res.status(404).json({ message: "Staff role is not found." });
    }
    const staff = await StaffModel.create({
      name: name,
      email: email,
      password: password,
      role_id: staff_role.id,
    });
    res
      .status(201)
      .json({ message: "Staff created successfully", data: staff });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/add-faculty", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const faculty_role = await FacultyRoleModel.findOne({ role: role });

    const faculty = await FacultyModel.create({
      name: name,
      email: email,
      password: password,
      role_id: faculty_role.id,
    });
    res
      .status(201)
      .json({ message: "Faculty created successfully", data: faculty });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/get-faculty", async (req, res) => {
  try {
    const faculty = await FacultyModel.findAll({
      include: FacultyRoleModel,
    });

    if (!faculty) {
      res.status(404).json({ message: "Faculties are not found" });
    }
    res
      .status(200)
      .json({ message: "Faculty are found successfully", data: faculty });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



 
module.exports = router;
