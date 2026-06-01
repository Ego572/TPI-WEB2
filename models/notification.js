import { Model, DataTypes } from "sequelize";
import sequelize from "../db/config.js"


class notification extends Model { }



notification.init({
    idNotification: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
        allowNull: false,


    },

    tipo: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
            isIn: [[
                "follow",
                "comment",
                "rating",
                "interest"


            ]]



        }



    },

    leida: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false

    },





},

    {
        sequelize,

        tableName: "notification",


        timestamps: true

    }



);

export default notification;


