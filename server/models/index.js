import sequelize from "./db.js";
import Sequelize from "sequelize";

import User from "./user.model.js";
import Activity from "./activity.model.js";
import VerificationToken from "./verificationToken.model.js";

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Activity = Activity;

db.VerificationToken = VerificationToken;

//Association
db.VerificationToken.belongsTo(db.User, { foreignKey: "userId" });
db.User.hasMany(db.VerificationToken, { foreignKey: "userId" });

export default db;
