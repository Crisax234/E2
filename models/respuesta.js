'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Respuesta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Respuesta.init({
    id_solicitud: DataTypes.INTEGER,
    id_simulacion: DataTypes.INTEGER,
    hp: DataTypes.INTEGER,
    torque: DataTypes.INTEGER,
    estetica: DataTypes.BOOLEAN,
    costo: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Respuesta',
  });
  return Respuesta;
};