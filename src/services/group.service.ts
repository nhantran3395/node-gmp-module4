import { FindOptions } from "sequelize";
import { Group, Permission, User } from "../models";
import { ResourceNotFound, InputInvalid } from "../exceptions";
import { Logger } from "../logger";
import { uuidValidator } from "../utils";

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
};
