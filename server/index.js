import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
const NODE_ENV = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL;
import ActivityRouter from "./routers/activity.router.js";
import authRouter from "./routers/auth.router.js";
import cors from "cors";
app.use(
  cors({
    origin: ["http://localhost:5173", "127.0.0.1:5173", FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "x-access-token"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
console.log("##################################");
import db from "./models/index.js";
const initDatabase = async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Database connection established successfully");
    // if (NODE_ENV === "development") {
    await db.sequelize.sync({ alter: true });
    console.log("database Synced in development mode");
    // }
  } catch (error) {
    console.error("Unable to connect to database", error);
  }
};
initDatabase();

app.get("/", (req, res) => {
  res.send("SCI Competition Restful API Completed");
});

//use routers
app.use("/api/v1/activities", ActivityRouter);
app.use("/api/v1/auth", authRouter);

app.listen(PORT, () => {
  console.log("Listening to http://localhost:" + PORT);
});
