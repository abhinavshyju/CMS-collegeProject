import {
  AdditionalInfo,
  Class,
  Contact,
  Department,
  GuardianInfo,
  Student,
  StudentForm,
  UniversityDetail,
  User,
} from "@/models";
import { Request, Response } from "express";

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
    admissionYear,
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
    admissionYear: string;
  };

  try {
    const student = await Student.create({
      gender,
      admissionNo: admissionNumber,
      name,
      admissionYear: admissionYear,
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
    await User.create({
      username: contact.email,
      password: admissionNumber,
      role: "student",
    });
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
        {
          model: Class,
          as: "class",
        },
        {
          model: Contact,
          as: "contact",
        },
      ],
    });

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

      include: [
        {
          model: Contact,
          as: "contact",
        },
        {
          model: GuardianInfo,
          as: "guardianInfo",
        },
        {
          model: UniversityDetail,
          as: "universityDetail",
        },
        { model: AdditionalInfo, as: "additionalInfo" },
        {
          model: Class,
          as: "class",
          include: [
            {
              model: Department,
              as: "department",
            },
          ],
        },
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

StaffRouter.post("/create-student", async (req: Request, res: Response) => {
  try {
    const { name, email, courseName, admissionYear, admissionNumber } =
      req.body;
    const course = await Class.findOne({
      where: { class: courseName },
    });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    const result = await StudentForm.create({
      email: email,
      name: name,
      admissionNo: admissionNumber,
      admissionYear: `${new Date(admissionYear).getFullYear()}`,
      courseId: course.id,
    });

    return res
      .status(201)
      .json({ message: "Student form created successfully", data: result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
});

StaffRouter.get("/students-accept", async (req: Request, res: Response) => {
  try {
    const students = await Student.findAll({
      where: {
        status: 0,
      },
    });

    if (!students || students.length === 0) {
      return res.status(404).json({ message: "No students found" });
    }

    const result = students.map((student: any) => ({
      id: student.id,
      name: student.name,
      admissionNumber: student.admissionNo,
    }));

    return res.status(200).json({ message: "Students found", data: result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
});

interface AdmissionFormValues {
  admissionNumber: string | null;
  name: string | null;
  gender: string | null;
  dateOfBirth: string | null;
  contact: {
    address: string | null;
    email: string | null;
    phone: string | null;
  } | null;
  guardianinfo: {
    name: string | null;
    mother: string | null;
    phone: string | null;
    annualIncome: string | null;
  } | null;
  universitydetails: {
    capId: string | null;
    docNo: string | null;
    nationality: string | null;
    nativity: string | null;
    religion: string | null;
  } | null;
  additionalinformation: {
    exServiceman: boolean | null;
    disabilityStatus: boolean | null;
    nssVolunteer: boolean | null;
    aGradeInSite: boolean | null;
    ihrdTssQuota: boolean | null;
  } | null;
  _class: string | null;
  // parent: {
  //   name: string | null;
  //   email: string | null;
  //   phone: string | null;
  // } | null;
}

StaffRouter.get("/students-accept/:id", async (req: Request, res: Response) => {
  const admissionNumber = req.params.id;
  try {
    const student = await Student.findOne({
      include: [
        {
          model: AdditionalInfo,
          as: "additionalInfo",
        },
        {
          model: Contact,
          as: "contact",
        },
        {
          model: GuardianInfo,
          as: "guardianInfo",
        },
        {
          model: UniversityDetail,
          as: "universityDetail",
        },
        {
          model: Class,
          as: "class",
        },
      ],

      where: { admissionNo: admissionNumber },
    });
    if (student) {
      const result: AdmissionFormValues = {
        admissionNumber: student.admissionNo,
        name: student.name,
        gender: student.gender,
        dateOfBirth: student.dob,
        contact: {
          address: student.contact!.address,
          email: student.contact!.email,
          phone: student.contact!.phone,
        },
        guardianinfo: {
          name: student.guardianInfo!.name,
          mother: student.guardianInfo!.mottherName,
          phone: student.guardianInfo!.phone,
          annualIncome: `${student.guardianInfo!.annualIncome}`,
        },
        universitydetails: {
          capId: student.universityDetail!.capId,
          docNo: student.universityDetail!.docNo,
          nationality: student.universityDetail!.nationality,
          nativity: student.universityDetail!.navity,
          religion: student.universityDetail!.religion,
        },
        additionalinformation: {
          exServiceman: student.additionalInfo!.exService,
          disabilityStatus: student.additionalInfo!.disability,
          nssVolunteer: student.additionalInfo!.nssVol,
          aGradeInSite: student.additionalInfo!.aGrade,
          ihrdTssQuota: student.additionalInfo!.ihrdtss,
        },
        _class: student.class!.class,
      };
      return res
        .status(200)
        .json({ message: "Student accepted", data: result });
    }
    return res.status(404).json({ message: "Student not found" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
});

StaffRouter.post("/student-update/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  console.log(id);
  const {
    admissionNumber,
    name,
    gender,
    dateOfBirth,
    contact,
    guardianinfo,
    universitydetails,
    additionalinformation,
    admission_date,
  } = req.body;

  try {
    // Fetch the student by primary key
    const student = await Student.findOne({
      where: { admissionNo: admissionNumber },
    });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Update student basic information
    await student.update({
      gender,
      admissionNo: admissionNumber,
      name,
      admissionYear: admission_date,
      dob: dateOfBirth,
      status: true,
    });

    // Update guardian information
    const guardianInfo = await student.getGuardianInfo();
    if (guardianInfo) {
      await guardianInfo.update({
        name: guardianinfo.name,
        mottherName: guardianinfo.mother,
        phone: guardianinfo.phone,
        annualIncome: guardianinfo.annualIncome,
      });
    }

    // Update contact information
    const contactInfo = await student.getContact();
    if (contactInfo) {
      await contactInfo.update({
        address: contact.address,
        email: contact.email,
        phone: contact.phone,
      });
    }

    // Update additional information
    const additionalInfo = await student.getAdditionalInfo();
    if (additionalInfo) {
      await additionalInfo.update({
        exService: additionalinformation.exServiceman,
        disability: additionalinformation.disabilityStatus,
        nssVol: additionalinformation.nssVolunteer,
        aGrade: additionalinformation.aGradeInSite,
        ihrdtss: additionalinformation.ihrdTssQuota,
      });
    }

    // Update university details
    const university = await student.getUniversityDetail();
    if (university) {
      await university.update({
        capId: universitydetails.capId,
        docNo: universitydetails.docNo,
        nationality: universitydetails.nationality,
        navity: universitydetails.nativity,
        religion: universitydetails.religion,
        regNo: admissionNumber,
      });
    }

    // Respond with success
    return res
      .status(200)
      .json({ message: "Student updated successfully", data: student });
  } catch (error) {
    console.error("Error updating student:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
});

export default StaffRouter;
