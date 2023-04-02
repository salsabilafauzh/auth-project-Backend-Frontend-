import { Sequelize } from "sequelize";
import db from "../config/configDB.js";

const { DataTypes } = Sequelize;

const users = db.define(
    "users",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        refresh_token: {
            type: DataTypes.TEXT,
        },
    },
    {
        freezeTableName: true,
    }
);

export default users;
