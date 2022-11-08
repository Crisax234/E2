module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Simulacions', [
    {
      id: 0,
      id_mecanico: 1,
      id_car: 0,
      id_solicitud: 0,
      hp: 306,
      torque: 400,
      costo: 0,
      estado: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 1, 
      id_mecanico: 0,
      id_car: 0,
      id_solicitud: 1,
      hp: 306,
      torque: 400,
      costo: 0,
      estado: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },

  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Simulacions', null, {}),
};
