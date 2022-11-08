module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Simulacions', [
    {
      id: 0,
      id_mecanico: 1,
      id_car: 0,
      id_solicitud: 9,
      hp: 111,
      torque: 222,
      costo: 333,
      estado: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 1, 
      id_mecanico: 0,
      id_car: 0,
      id_solicitud: 123,
      hp: 111,
      torque: 222,
      costo: 333,
      estado: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },

  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Simulacions', null, {}),
};
