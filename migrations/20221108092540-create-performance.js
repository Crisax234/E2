'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Performances', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      chasis_compatible: {
        type: Sequelize.STRING
      },
      nombre: {
        type: Sequelize.STRING
      },
      categoria: {
        type: Sequelize.STRING
      },
      hp: {
        type: Sequelize.INTEGER
      },
      torque: {
        type: Sequelize.INTEGER
      },
      precio: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Performances');
  }
};