import { Model, DataTypes } from "sequelize";
import sequelize from "../db/config";

class image extends Model { }


image.init({

    idImage: {
        tpye: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    urlImage: {
        type: DataTypes.STRING(255),
        allowNull: false
    },

    coyright: {
        type: DataTypes.BOOLEAN,
        defaultValue: false



    },

    licencia: {
        type: DataTypes.STRING(50)


    },

    watermark: {
        type: DataTypes, BOOLEAN,
        defaultValue: false
    },

    watermarktext: {
        type: DataTypes.STRING(255)

    },

    comentarioshabilitados: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },









},

    {
        sequelize,
        tableName: 'image',
        timestamps: true
    }








);
export default image

