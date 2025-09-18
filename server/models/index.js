import sequelize from "./db.js";
import Sequelize from "sequelize"

import User from "./user.model.js";
import Activity from "./activity.model.js";
// import Teacher from "./teacher.model.js";
// import Judge from "./judge.model.js";
// import Admin from "./admin.model.js";
import VerificationToken from "./verificationToken.model.js";

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Activity = Activity;
// db.Admin = Admin;
// db.Teacher = Teacher;
// db.Judge = Judge;
db.VerificationToken = VerificationToken;

//Association
db.VerificationToken.belongsTo(db.User, { foreignKey: "userId" });
db.User.hasOne(db.VerificationToken, { foreignKey: "userId" });

export default db;
