import { Model, DataTypes } from "sequelize";
import sequelize from "../db/config.js";

class Favourite extends Model {}

Favourite.init(

    {
        idFavourite: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
            allowNull: false
        }
    },

    {
        sequelize,

        tableName: "favourite",

        timestamps: true,

        indexes: [
            {
                unique: true,
                fields: [
                    "idUser",
                    "idPost"
                ]
            }
        ]
    }

);

export default Favourite;