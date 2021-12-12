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
  async createGroup(
    req: Request<{}, {}, CreateGroupRequestDto, {}>,
    res: Response,
    next: NextFunction
  ) {
    const groupData = req.body;

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

    try {
      await deleteGroup(id);
      Logger.info(`Deleted group with id = ${id}`);
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

    try {
      await addUsersToGroup(data);
      Logger.info(data);
      res.json({ message: API_MESSAGES.USERS_ADDED_TO_GROUP_SUCCESS });
    } catch (error: any) {
      next(error);
    }
  },
};
