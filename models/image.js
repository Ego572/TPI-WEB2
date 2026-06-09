import { Model, DataTypes } from "sequelize";
import sequelize from "../db/config.js";

class image extends Model { }


image.init({

    idImage: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    imageData: {
        type: DataTypes.BLOB('long'),
        allowNull: false
    },

    licencia: {
        type: DataTypes.STRING(50)


    },

    watermark: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    watermarktext: {
        type: DataTypes.STRING(255)

    },




},

    {
        sequelize,
        tableName: 'image',
        timestamps: true
    }




);
export default image

