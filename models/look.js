'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Look extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Simulacion, {
        foreignKey: 'neumaticoId',
        onDelete: 'CASCADE',
      });
      this.hasMany(models.Simulacion, {
        foreignKey: 'llantaId',
        onDelete: 'CASCADE',
      });
      this.hasMany(models.Simulacion, {
        foreignKey: 'capotId',
        onDelete: 'CASCADE',
      });
    }
  }
  Look.init({
    chasis_compatible: DataTypes.STRING,
    nombre: DataTypes.STRING,
    categoria: DataTypes.STRING,
    precio: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Look',
  });
  return Look;
};