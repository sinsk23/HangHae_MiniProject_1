"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("AnswersCollection", {
      answersId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userIdNo: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      answersArr: {
        allowNull: false,
        type: Sequelize.JSON,
        defaultValue: [],
      },
      recommendedCountryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("AnswersCollection");
  },
};
