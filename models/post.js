import { Model, DataTypes } from "sequelize";
import sequelize from "../db/config";

class post extends Model { }



post.init(

    {
        idPost: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: true,
            autoIncrement: true,


        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,


        },

        description: {
            type: DataTypes.STRING,



        },

        idImage: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,


        },

        idUser: {
            type: DataTypes.INTEGER,
            references: {

                model: 'user',
                key: 'idUser'

            }


        }



    },


    {
        sequelize,
        tableName: 'post',
        timestamps: true,

    },



);
export default post