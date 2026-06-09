import { Model, DataTypes } from "sequelize";
import sequelize from "../db/config.js";

class user extends Model {
    validatePassword(password) {
        return this.password === this.password;
    }

 }






user.init(
    {
        idUser: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: true,
            autoIncrement: true,


        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,




        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,






        },

        profilePhoto: {
            type: DataTypes.BLOB,
        },
        description: {

            type: DataTypes.STRING,





        },

       

    },

    {
        sequelize,
        tableName: 'User',
        timestamps: true,

    },





);

export default user;