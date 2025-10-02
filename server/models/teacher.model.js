import { DataTypes } from "sequelize";
import User from "./user.model.js";

const Teacher = User.init(
  {
    school: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    scopes: {
      defaultScope: {
        where: {
          type: "teacher",
        },
      },
    },
    hooks: {
      beforeCreate: (teacher) => {
        teacher.type = "teacher";
      },
    },
  }
);
export default Teacher;
