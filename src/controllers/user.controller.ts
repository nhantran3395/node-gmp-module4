import { Request, Response, NextFunction } from "express";
import { userService } from "../services";
import { CreateUserRequestDto } from "../dtos";
import { Logger } from "../logger";
import { API_MESSAGES } from "../shared/messages";

const {
  getUserById,
  getUserAutoSuggestion,
  createUser,
  updateUser,
  deleteUser,
} = userService;

export const userController = {
  async getUserById(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    const id = req.params.id;
    Logger.info(`Finding user with id = ${id}`);

    try {
      const user = await getUserById(id);
      Logger.info(`Found user with id = ${user.id}`);
      res.json(user);
    } catch (error: any) {
      next(error);
    }
  },
  async getUserAutoSuggestion(
    req: Request<{}, {}, {}, { loginQuery: string; limit: number }>,
    res: Response,
    next: NextFunction
  ) {
    const { loginQuery, limit } = req.query;
    Logger.info(`Getting user auto suggestions`);
    Logger.info(`loginQuery: ${loginQuery}`);
    Logger.info(`limit: ${limit}`);

    try {
      const suggests = await getUserAutoSuggestion(loginQuery, limit);
      res.json(suggests);
    } catch (error) {
      next(error);
    }
  },
  async createUser(
    req: Request<{}, {}, CreateUserRequestDto>,
    res: Response,
    next: NextFunction
  ) {
    const userData = req.body;
    Logger.info(`Creating new user`);
    Logger.info(userData);

    try {
      await createUser(userData);
      Logger.info(`Created user`);
      res.status(201).json({ message: API_MESSAGES.USER_CREATED_SUCCESS });
    } catch (error: any) {
      next(error);
    }
  },
  async updateUser(
    req: Request<{ id: string }, {}, CreateUserRequestDto>,
    res: Response,
    next: NextFunction
  ) {
    const id = req.params.id;
    const userData = req.body;
    Logger.info(`Updating user with id = ${id}`);
    Logger.info(userData);

    try {
      const user = await updateUser(id, userData);
      Logger.info(`Updated user with id = ${id}`);
      res.json(user);
    } catch (error: any) {
      next(error);
    }
  },
  async deleteUser(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    const id = req.params.id;
    Logger.info(`Removing user with ${id}`);

    try {
      await deleteUser(id);
      Logger.info(`Removed user with id = ${id}`);
      res.json({ message: API_MESSAGES.USER_DELETED_SUCCESS });
    } catch (error: any) {
      next(error);
    }
  },
};
