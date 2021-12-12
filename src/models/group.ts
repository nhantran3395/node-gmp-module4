import { Model, DataTypes, BelongsToManyAddAssociationsMixin } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { User, Permission } from "../models";
import { sequelize } from "../configs";

class Group extends Model {
  public id!: string;
  public name!: string;

  public addUsers!: BelongsToManyAddAssociationsMixin<User, number>;
  public addPermissions!: BelongsToManyAddAssociationsMixin<Permission, number>;
}

Group.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: () => uuidv4(),
    },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  {
    sequelize,
    modelName: "Group",
    tableName: "groups",
  }
);

export default Group;
