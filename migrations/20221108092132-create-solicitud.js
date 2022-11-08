'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Solicituds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_manager: {
        type: Sequelize.INTEGER,
        references: { model: 'Managers', key: 'id' },
      },
      id_car: {
        type: Sequelize.INTEGER,
        references: { model: 'Cars', key: 'id' },
      },
      titulo: {
        type: Sequelize.STRING
      },
      presupuesto: {
        type: Sequelize.INTEGER
      },
      descripcion: {
        type: Sequelize.STRING
      },
      estado: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Solicituds');
  }
};