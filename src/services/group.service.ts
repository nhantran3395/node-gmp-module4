import { UniqueConstraintError, FindOptions, Transaction } from "sequelize";
import { Group, Permission, User, GroupPermission } from "../models";
import {
  ResourceNotFound,
  InputInvalid,
  ResourceDuplicated,
} from "../exceptions";
import { Logger } from "../logger";
import { uuidValidator } from "../utils";
import { CreateGroupRequestDto } from "../dtos";
import { CreateGroupRequestSchema } from "../validations";
import { sequelize } from "../configs/sequelize.config";

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
      const { id: groupId } = createdGroup;

      permissionNames.forEach(async (permissionName) => {
        const permission = await Permission.findOne({
          where: { name: permissionName },
        });

        const permissionId = permission?.id;

        GroupPermission.create({ permissionId, groupId });
      });
    } catch (err: any) {
      if (err instanceof UniqueConstraintError) {
        throw new ResourceDuplicated("Group", "name");
      }

      throw new Error(err.message);
    }

    Logger.debug(createdGroup);
  },
  async deleteGroup(id: string) {
    Logger.info(`Deleting user with id = ${id}`);
    await groupService.getGroupById(id);

    try {
      await sequelize.transaction(async (transaction: Transaction) => {
        await Group.destroy({ where: { id: id }, transaction: transaction });
        await GroupPermission.destroy({
          where: { groupId: id },
          transaction: transaction,
        });
      });
    } catch (err: any) {
      throw new Error(err.message);
    }
  },
};
