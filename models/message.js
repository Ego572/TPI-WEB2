import { Model, DataTypes } from "sequelize";
import sequelize from "../db/config.js"


class message extends Model {}

message.init(
    {
        idMessage: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            unique: true, 
            primaryKey: true,
            allowNull: false

        },
        contenido: {
            type: DataTypes.TEXT,
            allowNull: false,

            validate: {
                notEmpty: true


            }

        },

        leido:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false

        }



    },

    {
        sequelize, 
        tableName: 'message',
        timestamps: true
    }
)
export default message