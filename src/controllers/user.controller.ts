import { Request, Response, NextFunction } from "express";
import { userService } from "../services";
import { CreateUserRequestDto } from "../dtos";
import { UserInputInvalid, UserNotFound } from "../exceptions";
import Logger from "../logger";
import { API_MESSAGES } from "../shared/messages";

const {
  getUserById,
  getUserAutoSuggestion,
  createUser,
  updateUser,
  deleteUser,
} = userService;

export const userController = {
  getUserById(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    const id = req.params.id;

    try {
      const user = getUserById(id);
      Logger.info("Retrieved info for user: ", user);
      res.json(user);
    } catch (error: any) {
      next(error);
    }
  },
  getUserAutoSuggestion(
    req: Request<{}, {}, {}, { loginQuery: string; limit: number }>,
    res: Response,
    next: NextFunction
  ) {
    const { loginQuery, limit } = req.query;

    try {
      const suggests = getUserAutoSuggestion(loginQuery, limit);
      Logger.info(suggests);
      res.json(suggests);
    } catch (error) {
      next(error);
    }
  },
  createUser(
    req: Request<{}, {}, CreateUserRequestDto>,
    res: Response,
    next: NextFunction
  ) {
    const userData = req.body;

    try {
      createUser(userData);
      Logger.info("Created user ");
      res.status(201).json({ message: API_MESSAGES.USER_CREATED_SUCCESS });
    } catch (error: any) {
      next(error);
    }
  },
  updateUser(
    req: Request<{ id: string }, {}, CreateUserRequestDto>,
    res: Response,
    next: NextFunction
  ) {
    const id = req.params.id;
    const userData = req.body;

    try {
      const user = updateUser(id, userData);
      res.json(user);
    } catch (error: any) {
      next(error);
    }
  },
  deleteUser(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    const id = req.params.id;

    try {
      deleteUser(id);
      res.json({ message: API_MESSAGES.USER_DELETED_SUCCESS });
    } catch (error: any) {
      next(error);
    }
  },
};
