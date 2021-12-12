import { Request, Response, NextFunction } from "express";
import { groupService } from "../services";
import { Logger } from "../logger";
import { CreateGroupRequestDto } from "../dtos";
import { API_MESSAGES } from "../shared/messages";
import { AddUsersToGroupRequestDto } from "../dtos/add-users-to-group-request.dto";

const {
  getGroupById,
  getAllGroups,
  createGroup,
  updateGroup,
  deleteGroup,
  addUsersToGroup,
} = groupService;

export const groupController = {
  async getGroupById(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    const id = req.params.id;
    Logger.info(`Finding group with id = ${id}`);

    try {
      const group = await getGroupById(id);
      Logger.info(`Found group with id = ${group.id}`);
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
    Logger.info(`Finding all groups`);

    try {
      const groups = await getAllGroups();
      res.json(groups);
    } catch (error) {
      next(error);
    }
  },
  async createGroup(
    req: Request<{}, {}, CreateGroupRequestDto, {}>,
    res: Response,
    next: NextFunction
  ) {
    const groupData = req.body;
    Logger.info(`Creating new group`);
    Logger.info(groupData);

    try {
      await createGroup(groupData);
      Logger.info(`Created group`);
      res.status(201).json({ message: API_MESSAGES.GROUP_CREATED_SUCCESS });
    } catch (error: any) {
      next(error);
    }
  },
  async updateGroup(
    req: Request<{ id: string }, {}, CreateGroupRequestDto>,
    res: Response,
    next: NextFunction
  ) {
    const id = req.params.id;
    const groupData = req.body;
    Logger.info(`Updating group with id = ${id}`);
    Logger.info(groupData);

    try {
      const group = await updateGroup(id, groupData);
      Logger.info(`Updated group with id = ${id}`);
      res.json(group);
    } catch (error: any) {
      next(error);
    }
  },
  async deleteGroup(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    const id = req.params.id;
    Logger.info(`Removing group with id = ${id}`);

    try {
      await deleteGroup(id);
      Logger.info(`Removed group with id = ${id}`);
      res.json({ message: API_MESSAGES.GROUP_DELETED_SUCCESS });
    } catch (error: any) {
      next(error);
    }
  },
  async addUsersToGroup(
    req: Request<{}, {}, AddUsersToGroupRequestDto, {}>,
    res: Response,
    next: NextFunction
  ) {
    const data = req.body;
    Logger.info(`Adding users to group`);
    Logger.info(data);

    try {
      await addUsersToGroup(data);
      res.json({ message: API_MESSAGES.USERS_ADDED_TO_GROUP_SUCCESS });
    } catch (error: any) {
      next(error);
    }
  },
};
