"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("CountryInfo", {
      recommendedId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      countryCode: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      countryName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      countryDomain: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      continent: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      headText: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      detailText: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      resultImageUrl: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      officialWebpage: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      getMoreCountryInfoUrl: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      getMoreVisitInfoUrl: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("CountryInfo");
  },
};
