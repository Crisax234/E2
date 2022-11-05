'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PiezasSeleccionadas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PiezasSeleccionadas.init({
    id_pieza: DataTypes.INTEGER,
    tipo: DataTypes.STRING,
    categoria: DataTypes.STRING,
    id_simulacion: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PiezasSeleccionadas',
  });
  return PiezasSeleccionadas;
};