import { Model, DataTypes } from "sequelize";
import sequelize from "../db/config";
import { types } from "pg";

class like extends Model { }




like.init(

    {
        idLike: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: true,
            autoIncrement: true,

        },

        fecha: {
            type: DataTypes.DATE,

        },
        userID: {
            type: DataTypes.INTEGER,

            references: {
                model: 'user',
                key: 'idUser'
            }

        },
        artID: {
            type: DataTypes.INTEGER,
            references: {
                Model: 'art',
                key: 'idArt'



            }




        }





    },

    {
        sequelize,
        tableName: 'like',
        timestamps: true,


    },




);
export default like;
