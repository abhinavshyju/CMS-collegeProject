import sequelize from "@/db";
import {
  AdditionalInfo,
  Class,
  Contact,
  GuardianInfo,
  Student,
  UniversityDetail,
} from "@/models";
import { Request, Response } from "express";

const { Router } = require("express");

const StaffRouter = Router();
// Ensure this is your Sequelize instance

StaffRouter.post("/add-student", async (req: Request, res: Response) => {
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
    admission_date,
  } = req.body;

  const transaction = await sequelize.transaction();

  try {
    const student = await Student.create({
      gender: gender,
      admissionNo: admissionNumber,
      name: name,
      admissionYear: admission_date,
      dob: dateOfBirth,
    });
    const guardianInfo = await GuardianInfo.create({
      name: guardianinfo.name,
      mottherName: guardianinfo.mother,
      phone: guardianinfo.phone,
      annualIncome: guardianinfo.annualIncome,
    });
    await guardianInfo.setStudent(student);

    const contactInfo = await Contact.create({
      address: contact.address,
      email: contact.email,
      phone: contact.phone,
    });
    await contactInfo.setStudent(student);

    const additionalInfo = await AdditionalInfo.create({
      exService: additionalinformation.exServiceman,
      disability: additionalinformation.disabilityStatus,
      nssVol: additionalinformation.nssVolunteer,
      aGrade: additionalinformation.aGradeInSite,
      ihrdtss: additionalinformation.ihrdTssQuota,
    });
    await additionalInfo.setStudent(student);

    const University = await universitydetails.create({
      cap_id: universitydetails.capId,
      doc_no: universitydetails.docNo,
      nationality: universitydetails.nationality,
      navity: universitydetails.nativity,
      religion: universitydetails.religion,
      addmission_no: admissionNumber,
    });
    await University.setStudent(student);
    const classInfo = await Class.findOne({
      where: {
        id: _class,
      },
    });
    if (!classInfo) {
      return res.status(404).json({ message: "Class not found" });
    }
    await student.setClass(classInfo);
    res
      .status(201)
      .json({ message: "Student created successfully", data: Student });
  } catch (error) {
    await transaction.rollback(); // Rollback the transaction in case of an error
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

StaffRouter.get("/student", async (req: Request, res: Response) => {
  try {
    const student = await Student.findAll({
      include: [Class, Contact, GuardianInfo, UniversityDetail, AdditionalInfo],
    });
    if (!student) {
      res.status(404).json({ message: "Students not found" });
    }

    const result: any = [];
    student.forEach((element: any) => {
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

StaffRouter.get("/student/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    console.log("test");
    const student = await Student.findOne({
      where: { id: id },
      attributes: ["id", "name", "gender"],
      include: [
        { model: Contact, attributes: ["address", "email", "phone"] },
        {
          model: GuardianInfo,
          attributes: ["name", "mother_name", "phone", "annual_income"],
        },
        {
          model: UniversityDetail,
          attributes: [
            "addmission_no",
            "cap_id",
            "doc_no",
            "nationality",
            "navity",
            "religion",
          ],
        },
        AdditionalInfo,
        Class,
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

export default StaffRouter;
