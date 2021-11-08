import { Sequelize } from "sequelize";
import { Logger } from "../logger";

const databaseUri = process.env.DATABASE_URI ?? "";

const sequelize = new Sequelize(databaseUri, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: (msg) => Logger.debug(msg),
});

export { sequelize };
