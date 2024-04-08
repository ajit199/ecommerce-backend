const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/index");

class User extends Model {}

User.init(
  {
    // Define User model fields
    name: {
      type: DataTypes.STRING,
      allowNull: false,
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
    categories_id: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: {},
    },
  },
  {
    sequelize,
    createdAt: true,
    updatedAt: true,
  }
);

module.exports = User;
