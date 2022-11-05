'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Looks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Looks.init({
    chasis: DataTypes.STRING,
    nombre: DataTypes.STRING,
    categoria: DataTypes.STRING,
    precio: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Looks',
  });
  return Looks;
};