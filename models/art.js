import { Model, DataTypes } from "sequelize";
import sequelize from "../db/config";

class art extends Model { }



art.init(

    {
        idArt: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: true,
            autoIncrement: true,


        },
        tittle: {
            type: DataTypes.STRING,
            allowNull: false,


        },

        description: {
            type: DataTypes.STRING,



        },

        userID: {
            type: DataTypes.INTEGER,
            references: {

                model: 'user',
                key: 'idUser'

            }


        }



    },


    {
        sequelize,
        tableName: 'tag',
        timestamps: true,

    },



)