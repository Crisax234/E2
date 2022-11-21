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
      this.hasMany(models.Simulacion, {
        foreignKey: 'chargepipeId',
        onDelete: 'CASCADE',
      });
      this.hasMany(models.Simulacion, {
        foreignKey: 'intercoolerId',
        onDelete: 'CASCADE',
      });
      this.hasMany(models.Simulacion, {
        foreignKey: 'turboId',
        onDelete: 'CASCADE',
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