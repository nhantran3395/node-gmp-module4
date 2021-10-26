import { Request, Response } from "express";
import { userService } from "../services";
import { CreateUserRequestDto } from "../dtos";
import { UserNotFound } from "../exceptions";
import Logger from "../logger";

const {
  getUserById,
  getUserAutoSuggestion,
  createUser,
  updateUser,
  deleteUser,
} = userService;

export const userController = {
  getUserById(req: Request<{ id: string }>, res: Response) {
    const id = req.params.id;

    try {
      const user = getUserById(id);
      Logger.info("Retrieved info for user: ", user);
      res.json(user);
    } catch (error: any) {
      Logger.error(error.message);

      if (error instanceof UserNotFound) {
        return res.status(404).json({ message: error.message });
      }

      res.status(500).json({ message: "Somethings went wrong" });
    }
  },
  getUserAutoSuggestion(
    req: Request<{}, {}, {}, { loginQuery: string; limit: number }>,
    res: Response
  ) {
    const { loginQuery, limit } = req.query;

    try {
      const suggests = getUserAutoSuggestion(loginQuery, limit);
      Logger.info(suggests);
      res.json(suggests);
    } catch (error) {
      Logger.error(error);
      res.status(500).json("message: Something went wrong");
    }
  },
  createUser(req: Request<{}, {}, CreateUserRequestDto>, res: Response) {
    const userData = req.body;

    try {
      createUser(userData);
      Logger.info("Created user ");
      res.status(201).json({ message: "User created successfully" });
    } catch (error: any) {
      Logger.error(error.message);
      res.status(500).json({ message: error.message });
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
      res.status(500).json({ message: error.message });
    }
  },
  deleteUser(req: Request<{ id: string }>, res: Response) {
    const id = req.params.id;

    try {
      deleteUser(id);
      res.json({ message: "User deleted successfully" });
    } catch (error: any) {
      Logger.error(error.message);

      if (error instanceof UserNotFound) {
        return res.status(404).json({ message: error.message });
      }

      res.status(500).json({ message: "Something went wrong" });
    }
  },
};
