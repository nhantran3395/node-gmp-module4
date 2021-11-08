import { Request, Response, NextFunction } from "express";
import { API_MESSAGES } from "../shared/messages";

const routeNotExistsHandlingMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(404).json({ message: API_MESSAGES.ROUTE_NOT_EXISTED });
};

export default routeNotExistsHandlingMiddleware;
