import sequelize from "@/db";
import AdditionalInfoModel from "@/models/additionInfoModel";
import ClassModel from "@/models/classModel";
import ContactModel from "@/models/contactModel";
import GenderModel from "@/models/genderModel";
import GuardianInfoModel from "@/models/guardianInfoModel";
import StudentModel from "@/models/stundentModel";
import UniversityDetailsModel from "@/models/universityDetailsModel";
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
    const guardianInfo = await GuardianInfoModel.create(
      {
        name: guardianinfo.name,
        mother_name: guardianinfo.mother,
        phone: guardianinfo.phone,
        annual_income: guardianinfo.annualIncome,
      },
      { transaction }
    );

    const Contact = await ContactModel.create(
      {
        address: contact.address,
        email: contact.email,
        phone: contact.phone,
      },
      { transaction }
    );

    const AdditionalInfo = await AdditionalInfoModel.create(
      {
        ex_service_man: additionalinformation.exServiceman,
        disability_status: additionalinformation.disabilityStatus,
        nss_volunteer: additionalinformation.nssVolunteer,
        a_grade_insite: additionalinformation.aGradeInSite,
        ihrd_tss_quota: additionalinformation.ihrdTssQuota,
      },
      { transaction }
    );

    const Class = await ClassModel.findOne({
      where: { class: _class },
      transaction,
    });

    const Gender: any = await GenderModel.findOne({
      where: {
        gender: gender,
      },
      transaction,
    });

    if (!Gender) {
      await transaction.rollback();
      return res.status(404).json({ message: "Gender not found" });
    }

    const University = await UniversityDetailsModel.create(
      {
        cap_id: universitydetails.capId,
        doc_no: universitydetails.docNo,
        nationality: universitydetails.nationality,
        navity: universitydetails.nativity,
        religion: universitydetails.religion,
        addmission_no: admissionNumber,
      },
      { transaction }
    );

    const Student = await StudentModel.create(
      {
        name: name,
        dob: dateOfBirth,
        gender_id: Gender.id,
        contact_id: Contact.dataValues.id,
        guardian_id: guardianInfo.dataValues.id,
        university_id: University.dataValues.id,
        addition_info_id: AdditionalInfo.dataValues.id,
        class_id: Class?.dataValues.id,
        admission_date: admission_date,
      },
      { transaction }
    );

    console.log("Student is created : " + Student.dataValues.id);

    await transaction.commit(); // Commit the transaction if everything is successful
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
    const student = await StudentModel.findOne({
      where: { id: id },
      attributes: ["id", "name"],
      include: [
        { model: GenderModel, attributes: ["gender"] },
        { model: ContactModel, attributes: ["address", "email", "phone"] },
        {
          model: GuardianInfoModel,
          attributes: ["name", "mother_name", "phone", "annual_income"],
        },
        {
          model: UniversityDetailsModel,
          attributes: [
            "addmission_no",
            "cap_id",
            "doc_no",
            "nationality",
            "navity",
            "religion",
          ],
        },
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

export default StaffRouter;
