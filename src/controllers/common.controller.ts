import { Request, Response } from "express";
import { API_MESSAGES } from "../shared/messages";

export const commonController = {
  handleMethodNotAllowed: (req: Request, res: Response) => {
    res.status(405).json({ message: API_MESSAGES.METHOD_NOT_ALLOWED });
  },
};
