import { Model, DataTypes } from "sequelize";
import sequelize from "../db/config";

class rating extends Model { }

rating.init({

  idRating: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true


  },
  valor: {
    type: DataTypes.INTEGER,
    allowNull: null,

    validate: {
      min: 1,
      max: 5
    }


  },


},
  {
    sequelize,
    tableName: 'rating',
    timestamps: true,

    indexes: [
      {
        unique: true,
        fields: ['idUser', 'idImage']
      }


    ]


  }
);