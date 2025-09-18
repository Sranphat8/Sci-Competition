import sequelize from "./db.js";
import User from "./user.model.js";

const Admin = User.init(
  {},
  {
    sequelize,
    scopes: {
      defaultScope: {
        where: {
          type: "admin",
        },
      },
    },
  },
  {
    hooks: {
      beforeCreate: (admin) => {
        admin.type = "admin";
      },
    },
  }
);
export default Admin;
