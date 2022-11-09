'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pieza_simulacions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_performance: {
        type: Sequelize.INTEGER,
        references: { model: 'Performances', key: 'id' },
      },
      id_look: {
        type: Sequelize.INTEGER,
        references: { model: 'Looks', key: 'id' },
      },
      id_simulacion: {
        type: Sequelize.INTEGER,
        references: { model: 'Simulacions', key: 'id' },
      },
      categoria: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('Pieza_simulacions');
  }
};
