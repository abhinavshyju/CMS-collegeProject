import sequelize from "@/db";
import {
  AdditionalInfo,
  Class,
  Contact,
  GuardianInfo,
  Student,
  UniversityDetail,
} from "@/models";
import express, { Request, Response, Router } from "express";

const StaffRouter = require("express").Router();

// Add a student
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
  } = req.body as {
    admissionNumber: string;
    name: string;
    gender: string;
    dateOfBirth: string;
    contact: { address: string; email: string; phone: string };
    guardianinfo: {
      name: string;
      mother: string;
      phone: string;
      annualIncome: number;
    };
    universitydetails: {
      capId: string;
      docNo: string;
      nationality: string;
      nativity: string;
      religion: string;
    };
    additionalinformation: {
      exServiceman: boolean;
      disabilityStatus: boolean;
      nssVolunteer: boolean;
      aGradeInSite: boolean;
      ihrdTssQuota: boolean;
    };
    _class: number;
    admission_date: string;
  };

  try {
    const student = await Student.create({
      gender,
      admissionNo: admissionNumber,
      name,
      admissionYear: admission_date,
      dob: dateOfBirth,
    });

    const guardianInfo = await GuardianInfo.create({
      studentId: student.id,
      name: guardianinfo.name,
      mottherName: guardianinfo.mother,
      phone: guardianinfo.phone,
      annualIncome: guardianinfo.annualIncome,
    });
    await guardianInfo.setStudent(student);

    const contactInfo = await Contact.create({
      studentId: student.id,
      address: contact.address,
      email: contact.email,
      phone: contact.phone,
    });
    await contactInfo.setStudent(student);

    const additionalInfo = await AdditionalInfo.create({
      studentId: student.id,
      exService: additionalinformation.exServiceman,
      disability: additionalinformation.disabilityStatus,
      nssVol: additionalinformation.nssVolunteer,
      aGrade: additionalinformation.aGradeInSite,
      ihrdtss: additionalinformation.ihrdTssQuota,
    });
    await additionalInfo.setStudent(student);

    const university = await UniversityDetail.create({
      studentId: student.id,
      capId: universitydetails.capId,
      docNo: universitydetails.docNo,
      nationality: universitydetails.nationality,
      navity: universitydetails.nativity,
      religion: universitydetails.religion,
      regNo: admissionNumber,
    });
    await university.setStudent(student);

    const classInfo = await Class.findOne({ where: { id: _class } });
    if (!classInfo) {
      return res.status(404).json({ message: "Class not found" });
    }
    await student.setClass(classInfo);

    return res
      .status(201)
      .json({ message: "Student created successfully", data: student });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
});

// Get all students
StaffRouter.get("/student", async (req: Request, res: Response) => {
  try {
    const students = await Student.findAll({
      include: [
        {
          model: AdditionalInfo,
          as: "additionalInfo",
        },
      ],
    });

    // if (!students || students.length === 0) {
    //   return res.status(404).json({ message: "No students found" });
    // }

    // const result = students.map((student: any) => ({
    //   id: student.id,
    //   name: student.name,
    //   admissionNumber: student.admissionNo,
    //   class: student.Class?.name || null,
    //   contact: student.Contact?.phone || null,
    // }));

    return res.status(200).json({ message: "Students found", data: students });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
});

// Get a specific student by ID
StaffRouter.get("/student/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const student = await Student.findOne({
      where: { id },
      attributes: ["id", "name", "gender", "admissionNo"],
      include: [
        { model: Contact, attributes: ["address", "email", "phone"] },
        {
          model: GuardianInfo,
          attributes: ["name", "motherName", "phone", "annualIncome"],
        },
        {
          model: UniversityDetail,
          attributes: [
            "admissionNo",
            "capId",
            "docNo",
            "nationality",
            "nativity",
            "religion",
          ],
        },
        { model: AdditionalInfo },
        { model: Class, attributes: ["name"] },
      ],
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    return res.status(200).json({ message: "Student found", data: student });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
});

export default StaffRouter;
