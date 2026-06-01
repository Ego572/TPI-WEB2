import { Model, DataTypes } from "sequelize";
import sequelize from "../db/config.js"


class collection extends Model {}


collection.init(
    {
        idCollection:{
            type: DataTypes.INTEGER,
            unique: true,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },

        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false,

            validate: {
                notEmpty: true
            }

        },

        descripcion: {
            type: DataTypes.TEXT,
            allowNull: true

        },

        privacidad: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "public",


            validate: {
                isIn:[[
                    "public",
                    "private"
                ]]
            }
        }






    },

    {
        sequelize,
        tableName: "collection",
        timestamps: true
    }

);
export default collection;