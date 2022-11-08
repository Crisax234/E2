'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Solicitud extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Manager, {
        foreignKey: 'id_manager',
      });
      this.belongsTo(models.Car, {
        foreignKey: 'id_car',  
      });
      this.hasMany(models.Simulacion, {
        foreignKey: 'id_solicitud',
      });
    }
  }
  Solicitud.init({
    titulo: DataTypes.STRING,
    presupuesto: DataTypes.INTEGER,
    descripcion: DataTypes.STRING,
    estado: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Solicitud',
  });
  return Solicitud;
};