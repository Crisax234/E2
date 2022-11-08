'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Performance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.pieza_simulacion, {
        foreignKey: 'id_performance',
      });
    }
  }
  Performance.init({
    chasis_compatible: DataTypes.STRING,
    nombre: DataTypes.STRING,
    categoria: DataTypes.STRING,
    hp: DataTypes.INTEGER,
    torque: DataTypes.INTEGER,
    precio: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Performance',
  });
  return Performance;
};