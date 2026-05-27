import { Model, DataTypes } from "sequelize";
import sequelize from "../db/config";

class comment extends Model{}


comment.init(
    {
        idComment:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: true,
            autoIncrement: true,


        },
        description: {

            type:   DataTypes.STRING,
            allowNull: false,

           },

           idUser: {
            type: DataTypes.INTEGER,
            allowNull: false,



           },
           idArt: {
            type

           }
















    }









)
