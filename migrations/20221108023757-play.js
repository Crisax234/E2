module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Plays', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      x: {
        type: Sequelize.INTEGER,
      },
      y: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      id_mecanico: {
        type: Sequelize.INTEGER,
        references: { model: 'Mecanics', key: 'id' },
      },

    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Plays');
  },
};
