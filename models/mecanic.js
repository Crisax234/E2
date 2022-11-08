const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Mecanic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Simulacion, {
        foreignKey: 'id_mecanico',
        onDelete: 'CASCADE',
      });
      this.hasMany(models.Session, {
        foreignKey: 'id',
      });
    }
  }
  Mecanic.init({
    nickname: DataTypes.STRING,
    email: DataTypes.STRING,
    hash_contrasena: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Mecanic',
  });
  return Mecanic;
};
