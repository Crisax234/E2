module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Managers', [
    {
      id: 1,
      nickname: 'geniogatoplayermanager',
      email: 'pedromanager@gmail.com',
      hash_contrasena: '$2a$05$eMkEHcAHGJdLPlQom/A0MuUoTCOYSbU.lPrw79dZWohfwhrrMlE4C',
      createdAt: new Date(),
      updatedAt: new Date(),
    },

  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Managers', null, {}),
};
