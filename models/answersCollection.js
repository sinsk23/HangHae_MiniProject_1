"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AnswersCollection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AnswersCollection.init(
    {
      answersId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userIdNo: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      answersArr: {
        allowNull: false,
        type: DataTypes.JSON,
        defaultValue: [],
      },
      recommendedCountryId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "AnswersCollection",
    }
  );
  return AnswersCollection;
};
