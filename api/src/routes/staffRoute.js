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
  // const {
  //   name,
  //   gender,
  //   dob,
  //   address,
  //   email,
  //   phone,
  //   gname,
  //   mothername,
  //   gphone,
  //   annuiincome,
  //   cap_id,
  //   doc_no,
  //   nationality,
  //   navity,
  //   religion,
  //   addmission_no,
  //   ex_man,
  //   disability,
  //   nss,
  //   agrade,
  //   ihrdq,
  //   _class,
  // } = req.body;

  console.log(req.body);
  const {
    admissionNumber,
    name,
    gender,
    dateOfBirth,
    contact,
    guardianinfo,
    universitydetails,
    additionalinformation,
    _class,
    parent,
  } = req.body;

  try {
    const guardianInfo = await GuardianInfoModel.create({
      name: guardianinfo.name,
      mother_name: guardianinfo.mother,
      phone: guardianinfo.phone,
      annual_income: guardianinfo.annualIncome,
    });

    const Contact = await ContactModel.create({
      address: contact.address,
      email: contact.email,
      phone: contact.phone,
    });

    const AdditionalInfo = await AdditionalInfoModel.create({
      ex_service_man: additionalinformation.exServiceman,
      disability_status: additionalinformation.disabilityStatus,
      nss_volunteer: additionalinformation.nssVolunteer,
      a_grade_insite: additionalinformation.aGradeInSite,
      ihrd_tss_quota: additionalinformation.ihrdTssQuota,
    });
    const Class = await ClassModel.findOne({ where: { class: _class } });
    const Gender = await GenderModel.findOne({
      where: {
        gender: gender,
      },
    });

    const University = await UniversityDetailsModel.create({
      cap_id: universitydetails.capId,
      doc_no: universitydetails.docNo,
      nationality: universitydetails.nationality,
      navity: universitydetails.nativity,
      religion: universitydetails.religion,
      addmission_no: admissionNumber,
    });

    const Student = await StudentModel.create({
      name: name,
      dob: dateOfBirth,
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

    const result = [];
    student.forEach((element) => {
      const obj = {
        id: element.id,
        name: " ",
        admissionNumber: " ",
        class: "",
        contact: "",
      };
      obj.name = element.name;
      obj.admissionNumber = element["university-info"].addmission_no;
      obj.class = element.class.class;
      obj.contact = element.contact.phone;
      result.push(obj);
    });
    res.status(200).json({ messgae: "Students found", data: result });
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

    res.status(200).json({ messgae: "Student found", data: student.data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
