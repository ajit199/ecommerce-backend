const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/index");

class Category extends Model {}

Category.init(
  {
    // Define category model fields
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    createdAt: true,
    updatedAt: true,
  }
);

module.exports = Category;
