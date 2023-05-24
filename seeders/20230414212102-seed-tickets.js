module.exports = {
    up: (queryInterface) => queryInterface.bulkInsert('Tickets', [
      {
        name:"CIRCO LAS AGUILAS HUMANAS EN TEMUCO",
        price: 6000,
        location: "PARQUE ISLA CAUTÍN",
        date: "2023-11-06 00:00:00",
        latitude: -84.55723524346583,
        longitude: 82.14802860724024,
        quantity:2867,
        event_id:"f21c83fa-a67b-47c2-b216-54ec0f5197c1",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]),
    down: (queryInterface) => queryInterface.bulkDelete('Tickets', null, {}),
  };
  