// import { DataTypes } from "sequelize";
// import sequelize from "./db.js";
// import becrypt from "bcryptjs";
// const User = sequelize.define("user", {
  
//   id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     primaryKey: true,
//   },
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//     validate: {
//       isEmail: true,
//     },
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   type: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   isVerified: {
//     type: DataTypes.BOOLEAN,
//     defaultValue: false,
//     allowNull: false,
//   },{
//     hook:{
//       // นี่คือ async ที่ใช้ไปแล้ว
//       beforeCreate: async (user) => {
//         if (user.password) {
//           // ช่วงอธิบายการเข้ารหัสผ่านโดยใช้ hash (ไม่เกี่ยวกับโค้ดแต่ที่อาจารย์อธิบายในคาบ)
//           // hash() ใช้กับ async/await
//           const salt = await becrypt.genSalt(10);
//           user.password = await becrypt.hash(user.password, salt);

//           // hashSync() ต้องรอโค้ดอื่นและไม่ต้องใช้ async/await
//           // user.password = becrypt.hashSync(); 
          
//         }
//       },
//       beforeUpdate: async (user) => {
//         if (user.changed("password")) {
//           const salt = await becrypt.genSalt(10);
//           user.password = await becrypt.hash(user.password, salt);
//         }
//       },
//     },
// });

// user.prototype.comparePassword = async function (candidatePassword) {
//   return await becrypt.compare(candidatePassword, this.password);
// };

// export default User;
