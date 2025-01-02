import { StaffRole } from "@/models";
import internalServerError from "@/utils/error";
import { Request, Response, Router } from "express";

const router = Router();

router.post("/create-staff-role", async (req: Request, res: Response) => {
  try {
    const role = req.body.role;
    const result = await StaffRole.create({
      role: role,
    });
    res
      .status(201)
      .json({ message: "Staff role created successfully", data: result });
  } catch (error) {
    internalServerError(res);
  }
});
router.get("/staff-role", async (req: Request, res: Response) => {
  try {
    const result = await StaffRole.findAll();
    res
      .status(200)
      .json({ message: "Staff roles retrieved successfully", data: result });
  } catch (error) {
    internalServerError(res);
  }
});
module.exports = router;
