import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
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

import db from "./models/index.js";
const role = db.Role;

// Sync database มันคือการ 
// sync(): สั่งให้ Sequelize ซิงค์ Models กับฐานข้อมูล
// { force: true }: บอกให้ Sequelize บังคับซิงค์โดยจะ ลบตารางทั้งหมดทิ้งก่อน ถ้ามีตารางนั้นอยู่แล้ว แล้วค่อยสร้างใหม่ทั้งหมด

// การใช้ sync({ force: true }) (ทำไมถึงต้องใช้)
// รันเว็บครั้งแรกหรือจะรีเซ็ตใหม่จะทำให้ตารางทั้งหมดหายไปและถูกสร้างขึ้นใหม่ 
// ถ้ามันขึ้น  Log Connection has been established successfully และ Drop and Sync ใน log แปลว่าสำเร็จ
// *สำคัญ* ถ้าตารางขึ้นแล้วให้ปิด comment ไว้เหมือนเดิมและพร้อมใช้แล้ว เพื่อไม่ให้มาลบตารางทีหรือข้อมูลที่เราเพิ่มไป

db.sequelize.sync({ force: true }).then(() => {
  initRole();
  console.log("Drop and Sync");
});

const initRole = () => {
  role.create({ id: 1, name: "admin" });
  role.create({ id: 2, name: "manager" });
  role.create({ id: 3, name: "teacher" });
  role.create({ id: 4, name: "judge" });
};
app.get("/", (req, res) => {
  res.send("SCI Competition Restful API Completed");
});

// use routers
app.use("/api/v1/activities", ActivityRouter);
app.use("/api/v1/auth", authRouter);

app.listen(PORT, () => {
  console.log("Listening to http://localhost:" + PORT);
});
