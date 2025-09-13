import User from "./user.model.js";

const Admin = User.init(
  {},
  {
    scopes: {
      defaultScope: {
        where: {
          type: "admin",
        },
      },
    },
  },
  {
    hook: {
      beforeCreate: (admin) => {
        admin.type = "admin";
      },
    },
  }
);
export default Admin;
