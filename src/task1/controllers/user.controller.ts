import { Request, Response } from "express";
import { userService } from "../services";
import Logger from "../../common/logger";

const { getUserById } = userService;

export const userController = {
  getUserById(req: Request, res: Response) {
    const id = req.params.id as string;
    try {
      const user = getUserById(id);
      Logger.info("Retrieved info for user: ", user);
      res.json(user);
    } catch (error: any) {
      Logger.error(error.message);
      res.status(400).json({ message: error.message });
    }
  },
  getUserAutoSuggestion(req: Request, res: Response) {
    res.json({ msg: "get user auto suggestion" });
  },
  createUser(req: Request, res: Response) {
    res.json({ msg: "create user" });
  },
  updateUser(req: Request, res: Response) {
    res.json({ msg: "update user" });
  },
  deleteUser(req: Request, res: Response) {
    res.json({ msg: "delete user" });
  },
};
