import { Class, Department, Semester, SemesterTransaction } from "@/models";
import { Request, Response, Router } from "express";

const ClassRouter = Router();

ClassRouter.get("/", async (req: Request, res: Response) => {
  const result = await SemesterTransaction.findAll({
    include: [
      {
        model: Class,
        as: "class",
        include: [{ model: Department, as: "department" }],
      },
      { model: Semester, as: "semester" },
    ],
  });

  interface ClassType {
    classTitle: string;
    class: string;
    id: number;
    department: string;
    admissionYear: string;
    active: boolean;
  }
  const classes: ClassType[] = [];

  result.forEach((item: any) => {
    const obj = {
      classTitle: item.class.class + " " + item.semester.semester + " semester",
      class: item.class.class,
      id: item.id,
      department: item.class.department.department,
      admissionYear: item.admissionYear,
      active:
        new Date(item.startDate) < new Date() &&
        new Date() < new Date(item.endDate),
    };
    classes.push(obj);
  });
  console.log(classes);

  res.status(200).json({ message: "Data fetched", data: classes });
});

export default ClassRouter;
