import { sequelize } from "../configs";
import { Group, Permission, User } from "../models";

export const GroupPermission = sequelize.define(
  "GroupPermission",
  {},
  { tableName: "groups_permissions" }
);

export const GroupUser = sequelize.define(
  "GroupUser",
  {},
  { tableName: "groups_users" }
);

Group.belongsToMany(User, {
  through: GroupUser,
  foreignKey: "groupId",
  as: "users",
});

Group.belongsToMany(Permission, {
  through: GroupPermission,
  foreignKey: "groupId",
  as: "permissions",
});

User.belongsToMany(Group, {
  through: GroupUser,
  foreignKey: "userId",
});

Permission.belongsToMany(Group, {
  through: GroupPermission,
  foreignKey: "permissionId",
});
