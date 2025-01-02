import { Class, Department } from "@/models";
import internalServerError from "@/utils/error";
import { Request, Response, Router } from "express";

const router = Router();

router.post("/create-class", async (req: Request, res: Response) => {
  try {
    const { name, department_id } = req.body;

    const department = await Department.findOne({
      where: {
        id: department_id,
      },
    });
    if (!department) {
      res.status(404).json({ message: "Department not found" });
    }
    const result = await Class.create({
      class: name,
      departmentId: department_id,
    });
    result.setDepartment(department!);
    res
      .status(201)
      .json({ message: "Class created successfully", data: result });
  } catch (error) {}
});

router.get("/class", async (req: Request, res: Response) => {
  try {
    const result = await Class.findAll({
      include: [
        {
          model: Department,
          as: "department",
          attributes: ["department"],
        },
      ],
    });
    if (!result) {
      res.status(404).json({ message: "Class not found" });
    }
    res.status(200).json({ message: "Class found successfully", data: result });
  } catch (error) {
    console.log(error);
    internalServerError(res);
  }
});
module.exports = router;
