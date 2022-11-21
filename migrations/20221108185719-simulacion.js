'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Simulacions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_mecanico: {
        type: Sequelize.INTEGER,
        references: { model: 'Mecanics', key: 'id' },
      },
      id_car: {
        type: Sequelize.INTEGER,
        references: { model: 'Cars', key: 'id' },
      },
      id_solicitud: {
        type: Sequelize.INTEGER,
        references: {model: 'Solicituds', key: 'id'},
      },
      intercoolerId: {
        type: Sequelize.INTEGER,
        references: { model: 'Performances', key: 'id' },
      },
      chargepipeId: {
        type: Sequelize.INTEGER,
        references: { model: 'Performances', key: 'id' },
      },
      turboId: {
        type: Sequelize.INTEGER,
        references: { model: 'Performances', key: 'id' },
      },
      capotId: {
        type: Sequelize.INTEGER,
        references: { model: 'Looks', key: 'id' },
      },
      llantaId: {
        type: Sequelize.INTEGER,
        references: { model: 'Looks', key: 'id' },
      },
      neumaticoId: {
        type: Sequelize.INTEGER,
        references: { model: 'Looks', key: 'id' },
      },

      hp: {
        type: Sequelize.INTEGER
      },
      torque: {
        type: Sequelize.INTEGER
      },
      costo: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Simulacions');
  }
};
