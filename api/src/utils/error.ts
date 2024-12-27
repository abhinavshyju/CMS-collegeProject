import { Response } from "express";

const internalServerError = (res: Response) => {
  res.status(500).json({ message: "Interal server error" });
};

export default internalServerError;
