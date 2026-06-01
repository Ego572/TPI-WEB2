import { Model, DataTypes } from "sequelize";
import sequelize from "../db/config.js"


class interest extends Model { }


interest.init(
    {

        idInterest: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            unique: true,
            primaryKey: true,
            allowNull: false,
        },







    },

    {
        sequelize,

        tableName: 'interest',
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ["idUser", "idImage"]
            }

        ]


    }

);
export default interest;