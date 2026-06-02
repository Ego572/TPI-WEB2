import { Model, DataTypes } from "sequelize";
import sequelize from "../db/config.js";

class report extends Model { }


report.init(
    {
        idReport: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            unique: true,
            primaryKey: true,
            allowNull: false,




        },

        motivo: {
            type: DataTypes.STRING,
            allowNull: false,



        },

        descripcion: {
            type: DataTypes.TEXT,
            allowNull: true,


        },


        estado: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Pendiente",

            validate: {
                isIn: [[
                    "pendiente",
                    "rechazado",
                    "revisado",
                    "resuelto"




                ]]



            },


        }


    },

    {
        sequelize,
        tableName: 'report',
        timestamps: true
    }




);

export default report