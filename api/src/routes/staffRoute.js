const { Router } = require("express");
const GuardianInfoModel = require("../models/guardianInfoModel");
const GenderModel = require("../models/genderModel");
const ClassModel = require("../models/classModel");
const UniversityDetailsModel = require("../models/universityDetailsModel");
const ContactModel = require("../models/contactModel");
const AdditionalInfoModel = require("../models/additionInfoModel");
const StudentModel = require("../models/stundentModel");

const router = Router();

router.post("/add-student", async (req, res) => {
  const {
    name,
    gender,
    dob,
    address,
    email,
    phone,
    gname,
    mothername,
    gphone,
    annuiincome,
    cap_id,
    doc_no,
    nationality,
    navity,
    religion,
    addmission_no,
    ex_man,
    disability,
    nss,
    agrade,
    ihrdq,
    _class,
  } = req.body;

  try {
    const guardianInfo = await GuardianInfoModel.create({
      name: gname,
      mother_name: mothername,
      phone: gphone,
      annual_income: annuiincome,
    });

    const Contact = await ContactModel.create({
      address: address,
      email: email,
      phone: phone,
    });

    const AdditionalInfo = await AdditionalInfoModel.create({
      ex_service_man: ex_man,
      disability_status: disability,
      nss_volunteer: nss,
      a_grade_insite: agrade,
      ihrd_tss_quota: ihrdq,
    });

    const Gender = await GenderModel.findOne({ where: gender });

    const Class = await ClassModel.findOne({ where: _class });

    const University = await UniversityDetailsModel.create({
      cap_id: cap_id,
      doc_no: doc_no,
      nationality: nationality,
      navity: navity,
      religion: religion,
      addmission_no: addmission_no,
    });

    const Student = await StudentModel.create({
      name: name,
      dob: dob,
      gender_id: Gender.id,
      contact_id: Contact.id,
      guardian_id: guardianInfo.id,
      university_id: University.id,
      addition_info_id: AdditionalInfo.id,
      class_id: Class.id,
    });
    console.log("Student is created : " + Student.id);
    res
      .status(201)
      .json({ message: "Student created successfully", data: Student });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/student", async (req, res) => {
  try {
    const student = await StudentModel.findAll({
      include: [
        GenderModel,
        ContactModel,
        GuardianInfoModel,
        UniversityDetailsModel,
        AdditionalInfoModel,
        ClassModel,
      ],
    });
    if (!student) {
      res.status(404).json({ message: "Students not found" });
    }
    res.status(200).json({ messgae: "Students found", data: student });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/student/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const student = await StudentModel.findOne({
      where: { id: id },
      include: [
        GenderModel,
        ContactModel,
        GuardianInfoModel,
        UniversityDetailsModel,
        AdditionalInfoModel,
        ClassModel,
      ],
    });
    if (!student) {
      res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ messgae: "Student found", data: student });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
