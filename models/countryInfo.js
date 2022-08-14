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
      recommendedId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      countryCode: {
        allowNull: false,
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
      continent: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      headText: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      detailText: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      resultImageUrl: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      officialWebpage: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      getMoreCountryInfoUrl: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      getMoreVisitInfoUrl: {
        allowNull: true,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "CountryInfo",
      tableName: "CountryInfo",
    }
  );
  return CountryInfo;
};
