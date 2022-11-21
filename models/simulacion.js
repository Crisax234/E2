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
      this.belongsTo(models.Solicitud, {
        foreignKey: 'id_solicitud',
      });
      this.belongsTo(models.Performance, {
        foreignKey: 'intercoolerId',
      });
      this.belongsTo(models.Performance, {
        foreignKey: 'chargepipeId',
      });
      this.belongsTo(models.Performance, {
        foreignKey: 'turboId',
      });
      this.belongsTo(models.Look, {
        foreignKey: 'capotId',
      });
      this.belongsTo(models.Look, {
        foreignKey: 'llantaId',
      });
      this.belongsTo(models.Look, {
        foreignKey: 'neumaticoId',
      });
    }
  }
  Simulacion.init({
    hp: DataTypes.INTEGER,
    torque: DataTypes.INTEGER,
    costo: DataTypes.INTEGER,
    estado: DataTypes.BOOLEAN,
    // Piezas, inicialmente como Null y se van agregando o cambiando, a medida que se hacen las request
    intercoolerId: DataTypes.INTEGER,
    chargepipeId: DataTypes.INTEGER,
    turboId: DataTypes.INTEGER,
    capotId: DataTypes.INTEGER,
    llantaId: DataTypes.INTEGER,
    neumaticoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Simulacion',
  });
  return Simulacion;
};