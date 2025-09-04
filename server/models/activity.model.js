import { DataTypes } from "sequelize";
import sequelize from "./db.js";
const Activity = sequelize.define("activity", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        required: true,
        trim: true,
    },
    description: {
        type: DataTypes.STRING,
        required: true,
    },
    type: {
        type: DataTypes.STRING,
        required: true,
    },
    level: {
        type: DataTypes.STRING,
        required: true,
    },
    type: {
        type: DataTypes.STRING,
        required: true,
    },
    type: {
        type: DataTypes.STRING,
        required: true,
    },
});