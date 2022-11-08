module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Plays', [
    {
      id: 0,
      x: 0,
      y: 0,
      id_mecanico: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 1,
      x: 0,
      y: 0,
      id_mecanico: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Plays', null, {}),
};
