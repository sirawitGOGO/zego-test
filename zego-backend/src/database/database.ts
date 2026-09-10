import { Dialect, Sequelize } from "sequelize";
import config from "../config/config";
import initModel from "../model";

const sequelize = new Sequelize(
  config.dbName!,
  config.dbUsername!,
  config.dbPassword,
  {
    host: config.dbHost,
    port: Number(config.dbPort),
    dialect: config.dbDialect as Dialect,
  }
);

const model = initModel(sequelize);

const db = {
  sequelize,
  Sequelize,
  ...model,
};

export default db;
