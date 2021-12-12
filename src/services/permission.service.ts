import { Permission } from "../models";
import { ResourceNotFound } from "../exceptions";
import { Logger } from "../logger";

export const permissionService = {
  async getPermissionByName(name: string): Promise<Permission> {
    Logger.info(`Finding permission with name = ${name}`);

    let permission: Permission | null;

    try {
      permission = await Permission.findOne({
        where: { name: name },
      });
    } catch (err: any) {
      throw new Error(err.message);
    }

    if (!permission) {
      throw new ResourceNotFound("Permission", name);
    }

    return permission;
  },
};
