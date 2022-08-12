'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class surveypages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  surveypages.init({
    answers: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'surveypages',
  });
  return surveypages;
};