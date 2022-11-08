'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Simulacion, {
        foreignKey: 'id_car',
      });
    }
  }
  Car.init({
    chasis: DataTypes.STRING,
    marca: DataTypes.STRING,
    modelo: DataTypes.STRING,
    hp: DataTypes.INTEGER,
    torque: DataTypes.INTEGER,
    peso: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Car',
  });
  return Car;
};