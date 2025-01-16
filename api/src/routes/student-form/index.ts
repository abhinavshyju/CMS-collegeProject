import {
  AdditionalInfo,
  Class,
  Contact,
  GuardianInfo,
  Student,
  StudentForm,
  UniversityDetail,
  User,
} from "@/models";
import { Request, Response, Router } from "express";

const StudentFormRouter = Router();

StudentFormRouter.get("/:pera/:id", async (req: Request, res: Response) => {
  const formData = await StudentForm.findOne({
    where: {
      id: req.params.id,
      admissionNo: req.params.pera,
    },
  });

  if (formData) {
    if (!formData.status) {
      if (formData.courseId !== null) {
        const course = await Class.findOne({
          where: {
            id: formData.courseId,
          },
        });
        if (course) {
          res.render("index", {
            id: req.params.id,
            course: course.class,
            admissionNumber: formData.admissionNo,
          });
        }
      } else {
        res.render("404");
      }
    } else {
      res.render("thanks");
    }
  }
  res.render("404");
});

StudentFormRouter.post(
  "/:course/:admissionNumber/:id",
  async (req: Request, res: Response) => {
    const course = req.params.course;
    const admissionNumber = req.params.admissionNumber;
    const {
      name,
      gender,
      dateOfBirth,
      contact,
      guardianinfo,
      universitydetails,
      additionalinformation,
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
      const formData = await StudentForm.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (!formData?.status) {
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

        const contactInfo = await Contact.create({
          studentId: student.id,
          address: contact.address,
          email: contact.email,
          phone: contact.phone,
        });

        const additionalInfo = await AdditionalInfo.create({
          studentId: student.id,
          exService: additionalinformation.exServiceman,
          disability: additionalinformation.disabilityStatus,
          nssVol: additionalinformation.nssVolunteer,
          aGrade: additionalinformation.aGradeInSite,
          ihrdtss: additionalinformation.ihrdTssQuota,
        });

        const university = await UniversityDetail.create({
          studentId: student.id,
          capId: universitydetails.capId,
          docNo: universitydetails.docNo,
          nationality: universitydetails.nationality,
          navity: universitydetails.nativity,
          religion: universitydetails.religion,
          regNo: admissionNumber,
        });

        const classInfo = await Class.findOne({ where: { class: course } });
        if (!classInfo) {
          res.status(404).json({ message: "Class not found" });
        }
        await student.setClass(classInfo!);

        await Promise.all([
          guardianInfo.setStudent(student),
          contactInfo.setStudent(student),
          additionalInfo.setStudent(student),
          university.setStudent(student),
          User.create({
            username: contact.email,
            password: admissionNumber,
            role: "student",
          }),
        ]);
        await StudentForm.update(
          {
            status: true,
          },
          {
            where: {
              id: req.params.id,
            },
          }
        );
        res.render("thanks");
      } else {
        res.render("thanks");
      }
    } catch (error) {
      console.error(error);
      res.render("404");
    }
  }
);

export default StudentFormRouter;
