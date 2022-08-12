"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("CountryInfo", {
      countryCode: {
        allowNull: false,
        primaryKey: true,
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
      canVisit: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      visitInfo: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      continent: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      capitalCity: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      recommendedId: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      resultImageUrl: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      officialWebpage: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      getMoreDetail: {
        allowNull: false,
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
