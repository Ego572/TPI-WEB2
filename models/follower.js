import { Model, DataTypes } from "sequelize";
import sequelize from "../db/config.js"


class Follower extends Model {}

Follower.init(
  {
    idFollower: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique:true,
      autoIncrement: true,
    },

  },
  {
    sequelize, 
    tableName: 'Follower',
    timestamps: true,

    indexes: [
      {
        unique: true,
        fields: [
          "follower_id",
          "following_id"
        ]
      }
    ]
  },
);
export default Follower;