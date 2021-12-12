import { Sequelize, Model, DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { sequelize } from "../configs";
import { Group } from "../models";

class Permission extends Model {
  public id!: string;
  public login!: string;
  public password!: string;
  public age!: number;
  public isDeleted!: number;
}

Permission.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: () => uuidv4(),
    },
    name: {
      type: DataTypes.ENUM,
      values: ["READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"],
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "Permission",
    tableName: "permissions",
  }
);

export default Permission;
