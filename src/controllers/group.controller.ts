import { Request, Response, NextFunction } from "express";
import { groupService } from "../services";
import { Logger } from "../logger";

const { getGroupById, getAllGroups } = groupService;

export const groupController = {
  async getGroupById(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    const id = req.params.id;

    try {
      const group = await getGroupById(id);
      Logger.info(`Retrieved info for group with id = ${group.id}`);
      res.json(group);
    } catch (error: any) {
      next(error);
    }
  },
  async getAllGroups(
    req: Request<{}, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const groups = await getAllGroups();
      Logger.info(groups);
      res.json(groups);
    } catch (error) {
      next(error);
    }
  },
};
