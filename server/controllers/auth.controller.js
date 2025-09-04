import db from "../models/index.js";
const User = db.User;
const Role = db.Role;
import config from "../config/auth.config.js";
import bcrypt from "bcryptjs"; //เข้ารหัส
import jwt from "jsonwebtoken";
//import operator
import { Op } from "sequelize";
const authController = {};

authController.signUp = async (req, res) => {
  const { username, name, email, password } = req.body;
  if (!username || !name || !email || !password) {
    res.status(400).send({ message: "Please provide all required fields" });
    return;
  }
  // SELECT * FROM User WHERE username = username
  await User.findOne({ where: { username } })
    // .select("-password")
    .then((user) => {
      if (user) {
        res.status(400).send({ message: "Username is already existed" });
        return;
      }

      const newUser = {
        username,
        name,
        email,
        password: bcrypt.hashSync(password, 8),
      };
      User.create(newUser)
        .then((user) => {
          //send roles in request body [ADMIN]
          if (req.body.roles) {
            //SELECT * FROM Role WHERE name=role1 OR name=role2
            Role.findAll({
              where: {
                name: { [Op.or]: req.body.roles },
              },
            }).then((roles) => {
              //array. length คือจำนวนที่อยู่ใน roles
              if (roles?.length === 0) {
                user.setRoles([3]).then(() => {
                  res.send({ message: "User registered successfully3" });
                });
              } else {
                //มีค่า
                user.setRoles(roles).then(() => {
                  res.send({ message: "User registered successfully1" });
                });
              }
            });
          } else {
            user.setRoles([1]).then(() => {
              res.send({ message: "User registered successfully2" });
            });
          }
        })
        .catch((error) => {
          res.status(500).send({
            message:
              error.message || "Something error while registering a new user",
          });
        });
    });
};

authController.signIn = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send({
      message: "Username or password are missing",
    });
    return;
  }
  await User.findOne({
    where: { username: username },
  })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: "User not found!" });
        return;
      }
      const passwordIsValid = bcrypt.compareSync(password, user.password);
      if (!passwordIsValid) {
        res.status(401).send({ message: "Invalid password" });
      }
      //Valid User
      const token = jwt.sign({ username: user.username }, config.secret, {
        expiresIn: 60 * 60 * 24, //60sec * 60min *24h = 86400
      });
      const authorities = [];
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          console.log("name", roles[i].name.toUpperCase());
          //ROLES_USER list
          authorities.push("ROLES_" + roles[i].name.toUpperCase());
        }
        res.send({
          token: token,
          authorities: authorities,
          userInfo: {
            name: user.name,
            email: user.email,
            username: user.username,
          },
        });
      });
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "Something error while signign In",
      });
    });
};

export default authController;
