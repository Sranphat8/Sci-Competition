import { Sequelize } from "sequelize";
import dbConfig from "../config/db.config.js";
// console.log(dbConfig);
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  logging: false,
  omitNull: true,
  // dialectOptions: {
  //   ssl: {
  //     required: true,
  //     rejectUnauthorized: false,
  //   },
  // },
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been etablished successfully");
  } catch (error) {
    console.log("Unable to connect to the database", error);
  }
};

testConnection();
export default sequelize;
