module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Solicituds', [
    {
      id: 0,
      id_manager: 1,
      id_car: 0,
      titulo: "Primera solicitud",
      presupuesto: 5000000,
      descripcion: "bmw z4",
      estado: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },

  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Solicituds', null, {}),
};