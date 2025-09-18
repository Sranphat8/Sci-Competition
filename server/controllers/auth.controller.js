// redo
import jwt from "jsonwebtoken";
import authConfig from "../config/auth.config.js";
import db from "../models/index.js";
import crypto, { sign } from "crypto";
const User = db.User;
import { sendVerificationEmail } from "../utils/email.js";
import path from "path";
const VerificationToken = db.VerificationToken;

//Register
const signUp = async (req, res) => {
  const { email, password, type, name, school, phone } = req.body;
  try {
    //Validate request
    if (!email || !password || !type || !name) {
      return res
        .status(400)
        .send({ message: "Email, password, type and name are required !" });
    }

    //Validate user type
    const allowedTypes = ["admin", "teacher", "judge"];
    if (!allowedTypes.includes(type)) {
      return res.status(400).send({
        message: "Invalid user type. Must be one of: admin, teacher or judge",
      });
    }
    //Addition validation for teacher
    if (type === "teacher" && (!school || !phone)) {
      return res
        .status(400)
        .send({ message: "school and phone are required for teacher!" });
    }

    //Check if user already exists
    const existingUser = await User.findOne({
      where: {
        email: email,
      },
    });
    if (existingUser) {
      return res.status(400)
        .send({ message: "Email already in use!" })
    }

    //Create user object base on type
    const userData = {
      name: name,
      email: email,
      password: password,
      type: type,
    };
    if (type === "teacher") {
      userData.school = school;
      userData.phone = phone;
    }

    //Create new user
    const user = await User.create(userData);

    // res.status(201)
    // .send({ message: "User registered successfully!", userId: user.id });

    //If user is a teacher, create and send verification email
    if (type === "teacher") {
      try {
        //create verification token
        const token = crypto.randomBytes(32).toString("hex");
        const verificationToken = await db.VerificationToken.create({
          token,
          userId: user.id,
          expiredAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
        });
        console.log("Verification token created:", verificationToken);

        //TODO Send verification email
        await sendVerificationEmail(user.email, token, user.name);
        console.log("Verification email email sent successfully!");

        //Send verification email
      } catch (error) {
        console.error("Error sending verification email", error);
      }
    }


    res.status(201).send({
      message:
        user.type === "teacher"

          ? "Registration successful! Please check your  email to verify your account."

          : "User registered successfully!",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        type: user.type,
        ...(user.type === "teacher" && { isVerified: user.isVerified }),
      },
    });

  } catch (error) {
    return res
      .status(500)
      .send({
        message: error.message || "Some error occurred while creating the User."
      });
  }
};

const verifyEmail = async (req, res) => {
  const {token} = req.params;
  if(!token){
    returnres.status(400)
    .send({message: "Token is missing!"});
  }

  try {
    const verificationToken = await db.VerificationToken.findOne({
      // token: token สามารถลดรูปใช้แบบนี้ได้ { token }
      where: { token },
    });
    if(!verificationToken){
      return res.status(404)
      .send({message: "Invalid verification token!"});
    }
    //Check if token is expired
    // เอาวันหมดอายุมาเช็คกับวันปัจจุบัน
    if(new Date() > verificationToken.expiredAt){
      await verificationToken.destroy();
      return res.status(400)
      .send({message: "Verification token has expired!"});
    }
    const user = await User.findByPk(verificationToken.userId);
    if (!user) {
      return res.status(404)
      .send({message: "User not found!"});
    }
    await user.update({isVerified: true});
    // Delete the used token
    await verificationToken.destroy();
    // return web view
    const htmlPath = path.join(process.cwd(), 
    "views", 
    "verificationSuccess.html"
  );
  res.sendFile(htmlPath);

  } catch (error) {
    res.status(500)
    .send({message: error.message || "Some error occurred while verifying the user."

    });
  }
};

const authController = {
  signUp,
  verifyEmail
};

export default authController;