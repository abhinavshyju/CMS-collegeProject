import { Semester } from "@/models";
import internalServerError from "@/utils/error";
import { Request, Response, Router } from "express";

const router = Router();
router.post("/create-semster", async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(401).json({ message: "Name is required" });
    }
    const semester = await Semester.create({
      semester: name,
    });
    res
      .status(201)
      .json({ message: "Semester created success fully.", data: semester });
  } catch (error) {
    internalServerError(res);
  }
});

module.exports = router;
