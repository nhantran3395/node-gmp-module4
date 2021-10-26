import { Request, Response } from "express";
import { userService } from "../services";
import { CreateUserRequestDto } from "../dtos";
import Logger from "../../common/logger";

const { getUserById, createUser, updateUser, deleteUser } = userService;

export const userController = {
  getUserById(req: Request<{ id: string }>, res: Response) {
    const id = req.params.id;

    try {
      const user = getUserById(id);
      Logger.info("Retrieved info for user: ", user);
      res.json(user);
    } catch (error: any) {
      Logger.error(error.message);
      res.status(404).json({ message: error.message });
    }
  },
  getUserAutoSuggestion(req: Request, res: Response) {
    res.json({ msg: "get user auto suggestion" });
  },
  createUser(req: Request<{}, {}, CreateUserRequestDto>, res: Response) {
    const userData = req.body;

    try {
      createUser(userData);
      Logger.info("Created user ");
      res.status(201).json({ message: "User created successfully" });
    } catch (error: any) {
      Logger.error(error.message);
      res.status(400).json({ message: error.message });
    }
  },
  updateUser(
    req: Request<{ id: string }, {}, CreateUserRequestDto>,
    res: Response
  ) {
    const id = req.params.id;
    const userData = req.body;

    try {
      const user = updateUser(id, userData);
      res.json();
    } catch (error: any) {
      Logger.error(error.message);
      res.status(400).json({ message: error.message });
    }
  },
  deleteUser(req: Request<{ id: string }>, res: Response) {
    const id = req.params.id;

    try {
      deleteUser(id);
      res.json({ message: "User deleted successfully" });
    } catch (error: any) {}
  },
};
