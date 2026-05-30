import { Model, DataTypes } from "sequelize";
import sequelize from "../db/config";

class comment extends Model { }


comment.init(
    {
        idComment: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: true,
            autoIncrement: true,

        },
        texto: {

            type: DataTypes.TEXT,
            allowNull: false,

        },


    },

    {
        sequelize,
        tableName: 'Comment',
        timestamps: true


    }









);

export default comment;
