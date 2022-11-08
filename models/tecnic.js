'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tecnic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Session, {
        foreignKey: 'id',
      });
      
    }
  }
  Tecnic.init({
    nickname: DataTypes.STRING,
    email: DataTypes.STRING,
    hash_contrasena: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Tecnic',
  });
  return Tecnic;
};