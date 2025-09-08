import sequelize from "./db.js";
import sequelize from "sequelize"

import User from "./user.model.js";
import Activity from "./activity.model.js";
import Teacher from "./teacher.model.js";
import Judge from "./judge.model.js";
import Admin from "./admin.model.js";
import VerificationToken from "./verificationToken.model.js";

const db = {};
db.Sequelize = sequelize;
db.sequelize = sequelize;

db.User = User;
db.Activity = Activity;
db.Teacher = Teacher;
db.Judge = Judge;
db.Admin = Admin;
db.VerificationToken = VerificationToken;

//Association
db.VerificationToken.belongsTo(db.User, { foreignKey: "userId"});
db.User.belongsTo(db.VerificationToken, { foreignKey: "userId"});

export default db;