module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Tecnics', [
    {
      id: 1,
      nickname: 'geniogatoplayertecnic',
      email: 'pedrotecnic@gmail.com',
      hash_contrasena: '$2a$05$eMkEHcAHGJdLPlQom/A0MuUoTCOYSbU.lPrw79dZWohfwhrrMlE4C',
      createdAt: new Date(),
      updatedAt: new Date(),
    },

  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Tecnics', null, {}),
};
