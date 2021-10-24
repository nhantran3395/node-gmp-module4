import { Request, Response } from "express";

export const userController = {
  getUserById(req: Request, res: Response) {
    res.json({ msg: "get user by id" });
  },
  getUserAutoSuggests(req: Request, res: Response) {
    res.json({ msg: "get user auto suggests" });
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
