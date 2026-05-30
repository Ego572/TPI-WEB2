import { Model, DataTypes } from "sequelize";
import sequelize from "../db/config";

class post extends Model { }



post.init(
    {
        idPost: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,



        },

        titulo: {
            type: DataTypes.STRING(100),
            allowNull: false,


            validate: {
                notEmpty: true,


            }



        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: false,


            validate: {
                notEmpty: true
            }



        },

        comentariosHabilitados: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,


        },








    },

    {
        sequelize,
        tableName: 'post',
        timestamps: true
    }


);
export default post