import { Sequelize } from "sequelize";
import { dbConfig } from "../config/config.jsconfig/config.js";

export const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: false,
  }
);

// Test DB connection
try {
  await sequelize.authenticate();
  console.log(" Sequelize connected to DB.");
} catch (err) {
  console.error(" DB connection error:", err);
}
