'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Simulacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Simulacion.init({
    id_solicitud: DataTypes.INTEGER,
    chasis: DataTypes.STRING,
    hp: DataTypes.INTEGER,
    torque: DataTypes.INTEGER,
    costo: DataTypes.INTEGER,
    estado: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Simulacion',
  });
  return Simulacion;
};