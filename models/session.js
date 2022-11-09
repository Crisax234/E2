'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Mecanic, {
        foreignKey: 'userid',
      });
      this.belongsTo(models.Manager, {
        foreignKey: 'managerid',
      });
      this.belongsTo(models.Tecnic, {
        foreignKey: 'tecnicid',
      });
    }
  }
  Session.init({
  }, {
    sequelize,
    modelName: 'Session',
  });
  return Session;
};