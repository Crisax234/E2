'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pieza_simulacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Performance, {
        foreignKey: 'id_performance',
      });
      this.belongsTo(models.Look, {
        foreignKey: 'id_look',
      });
      this.belongsTo(models.Simulacion, {
        foreignKey: 'id_simulacion',
      });
    }
  }
  Pieza_simulacion.init({
    categoria: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pieza_simulacion',
  });
  return Pieza_simulacion;
};