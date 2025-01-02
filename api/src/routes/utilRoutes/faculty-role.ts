import { FacultyRole } from "@/models";
import internalServerError from "@/utils/error";
import { Request, Response, Router } from "express";

const router = Router();

router.post("/create-faculty-role", async (req: Request, res: Response) => {
  try {
    const role = req.body.role;
    const result = await FacultyRole.create({
      role: role,
    });
    res
      .status(201)
      .json({ message: "Faculty role created successfully", data: result });
  } catch (error) {
    internalServerError(res);
  }
});
router.get("/faculty-role", async (req: Request, res: Response) => {
  try {
    const result = await FacultyRole.findAll();
    res
      .status(200)
      .json({ message: "faculty roles retrieved successfully", data: result });
  } catch (error) {
    internalServerError(res);
  }
});

module.exports = router;
