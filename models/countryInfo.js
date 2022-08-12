"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CountryInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CountryInfo.init(
    {
      countryCode: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      countryName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      countryDomain: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      canVisit: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      visitInfo: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      continent: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      capitalCity: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      recommendedId: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      resultImageUrl: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      officialWebpage: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      getMoreDetail: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "CountryInfo",
    }
  );
  return CountryInfo;
};
