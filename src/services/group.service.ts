import { UniqueConstraintError, FindOptions, Transaction } from "sequelize";
import { Group, Permission, User, GroupPermission, GroupUser } from "../models";
import {
  ResourceNotFound,
  InputInvalid,
  ResourceDuplicated,
} from "../exceptions";
import { Logger } from "../logger";
import { uuidValidator } from "../utils";
import { CreateGroupRequestDto, AddUsersToGroupRequestDto } from "../dtos";
import {
  CreateGroupRequestSchema,
  AddUsersToGroupSchema,
} from "../validations";
import { sequelize } from "../configs";
import { userService } from "../services";

const findGroupOption: FindOptions = {
  include: [
    {
      model: User,
      as: "users",
      attributes: ["id", "login", "password", "age"],
      through: {
        attributes: [],
      },
    },
    {
      model: Permission,
      as: "permissions",
      attributes: ["id", "name"],
      through: {
        attributes: [],
      },
    },
  ],
};

export const groupService = {
  async getGroupById(id: string): Promise<Group> {
    Logger.info(`Finding group with id = ${id}`);

    if (!uuidValidator(id)) {
      throw new InputInvalid("id must be in uuid format");
    }

    let group: Group | null;

    try {
      group = await Group.findOne({
        where: { id: id },
        ...findGroupOption,
      });
    } catch (err: any) {
      throw new Error(err.message);
    }

    if (!group) {
      throw new ResourceNotFound("Group", id);
    }

    return group;
  },
  async getAllGroups(): Promise<Group[]> {
    let groups: Group[] | null;

    try {
      groups = await Group.findAll(findGroupOption);
    } catch (err: any) {
      throw new Error(err.message);
    }

    return groups;
  },
  async createGroup(groupData: CreateGroupRequestDto): Promise<void> {
    const { error } = CreateGroupRequestSchema.validate(groupData);

    if (error) {
      throw new InputInvalid(error.message);
    }

    const { name: groupName, permissions: permissionNames } = groupData;

    let createdGroup: Group | null;

    try {
      createdGroup = await Group.create({ name: groupName });

      const permissions = await Promise.all(
        permissionNames.map(async (permissionName) => {
          const permission = await Permission.findOne({
            where: { name: permissionName },
          });

          if (!permission) {
            throw new Error();
          }

          return permission;
        })
      );

      createdGroup.addPermissions(permissions);
    } catch (err: any) {
      if (err instanceof UniqueConstraintError) {
        throw new ResourceDuplicated("Group", "name");
      }

      throw new Error(err.message);
    }

    Logger.debug(createdGroup);
  },
  async updateGroup(
    id: string,
    groupData: CreateGroupRequestDto
  ): Promise<Group> {
    Logger.info(`Updating group with id = ${id}`);
    const group = await groupService.getGroupById(id);

    const { error } = CreateGroupRequestSchema.validate(groupData);

    if (error) {
      throw new InputInvalid(error.message);
    }

    const { name: groupName, permissions: permissionNames } = groupData;

    const permissions = await Promise.all(
      permissionNames.map(async (permissionName) => {
        const permission = await Permission.findOne({
          where: { name: permissionName },
        });

        if (!permission) {
          throw new Error();
        }

        return permission;
      })
    );

    try {
      await sequelize.transaction(async (transaction: Transaction) => {
        await Group.update(
          { name: groupName, updatedAt: new Date() },
          { where: { id: id }, transaction: transaction }
        );
        await GroupPermission.destroy({
          where: { groupId: id },
          transaction: transaction,
        });
        await group.addPermissions(permissions, { transaction: transaction });
      });
    } catch (err: any) {
      throw new Error(err.message);
    }

    // return group after update
    const updatedGroup = await groupService.getGroupById(id);
    return updatedGroup;
  },
  async deleteGroup(id: string) {
    Logger.info(`Deleting group with id = ${id}`);
    await groupService.getGroupById(id);

    try {
      await sequelize.transaction(async (transaction: Transaction) => {
        await Group.destroy({ where: { id: id }, transaction: transaction });
        await GroupPermission.destroy({
          where: { groupId: id },
          transaction: transaction,
        });
        await GroupUser.destroy({
          where: { groupId: id },
          transaction: transaction,
        });
      });
    } catch (err: any) {
      throw new Error(err.message);
    }
  },
  async addUsersToGroup(data: AddUsersToGroupRequestDto) {
    const { error } = AddUsersToGroupSchema.validate(data);

    if (error) {
      throw new InputInvalid(error.message);
    }

    const { groupId, userIds } = data;
    const group = await groupService.getGroupById(groupId);

    try {
      const users = await Promise.all(
        userIds.map(async (userId) => await userService.getUserById(userId))
      );
      group.addUsers(users);
    } catch (err: any) {
      throw new Error(err.message);
    }
  },
};
