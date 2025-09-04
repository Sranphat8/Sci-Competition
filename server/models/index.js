import sequelize from "./db.js";
import Sequelize from "sequelize";

import User from "./user.model.js";
import Role from "./role.model.js";

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Role = Role;

//Association
db.User.belongsToMany(db.Role, {
  through: "user_roles",
});

db.Role.belongsToMany(db.User, {
  through: "user_roles",
});
export default db;