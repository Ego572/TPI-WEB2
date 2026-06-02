import { Model, DataTypes } from "sequelize";
import sequelize from "../db/config.js";

class tag extends Model { }



tag.init(
    {
        idTag: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: true,
            autoIncrement: true,

        },
        nameTag: {
            type: DataTypes.STRING,
            allowNull: false,



        },


    },

    {
        sequelize,
        tableName: 'Tags',
        timestamps: false,


    },




);
export default tag;