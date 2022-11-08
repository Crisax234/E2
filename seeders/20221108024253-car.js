module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Cars', [
    {
      id: 0,
      chasis: "WBALM12345",
      marca: "BMW",
      modelo: "Z4",
      hp: 306,
      torque: 400,
      peso: 1580,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Cars', null, {}),
};
