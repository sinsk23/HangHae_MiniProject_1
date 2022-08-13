"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Result extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Result.init(
    {
      resultId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userIdNo: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      answersArr: {
        allowNull: false,
        type: DataTypes.JSON, //INTEGER
        defaultValue: [],
      },
      recommendedCountryId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Result",
    }
  );
  return Result;
};
