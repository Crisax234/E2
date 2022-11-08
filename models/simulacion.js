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
      this.belongsTo(models.Mecanic, {
        foreignKey: 'id_mecanico',
      });
      this.belongsTo(models.Car, {
        foreignKey: 'id_car',
      });
    }
  }
  Simulacion.init({
    id_solicitud: DataTypes.INTEGER,
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