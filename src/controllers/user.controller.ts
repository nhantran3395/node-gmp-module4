import { Request, Response } from "express";
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

      res.status(500).json({ message: API_MESSAGES.SERVER_ERROR });
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
      res.status(500).json({ message: API_MESSAGES.SERVER_ERROR });
    }
  },
  createUser(req: Request<{}, {}, CreateUserRequestDto>, res: Response) {
    const userData = req.body;

    try {
      createUser(userData);
      Logger.info("Created user ");
      res.status(201).json({ message: API_MESSAGES.USER_CREATED_SUCCESS });
    } catch (error: any) {
      Logger.error(error.message);

      if (error instanceof UserInputInvalid) {
        return res.status(400).json({ message: error.message });
      }

      res.status(500).json({ message: API_MESSAGES.SERVER_ERROR });
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
      res.json(user);
    } catch (error: any) {
      Logger.error(error.message);

      if (error instanceof UserInputInvalid) {
        return res.status(400).json({ message: error.message });
      }

      res.status(500).json({ message: API_MESSAGES.SERVER_ERROR });
    }
  },
  deleteUser(req: Request<{ id: string }>, res: Response) {
    const id = req.params.id;

    try {
      deleteUser(id);
      res.json({ message: API_MESSAGES.USER_DELETED_SUCCESS });
    } catch (error: any) {
      Logger.error(error.message);

      if (error instanceof UserNotFound) {
        return res.status(404).json({ message: error.message });
      }

      res.status(500).json({ message: API_MESSAGES.SERVER_ERROR });
    }
  },
};
