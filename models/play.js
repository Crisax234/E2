const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Play extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Mecanic, {
        foreignKey: 'id_mecanico',
      });
    }
  }
  Play.init({
    x: DataTypes.INTEGER,
    y: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Play',
  });
  return Play;
};
