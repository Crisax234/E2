require('dotenv').config()

const config = {
    default: {
      username: "cristobal",
      password: "CC1501AA",
      dialect: 'postgres',
      database: "bdd-app-web",
      host: '127.0.0.1',
    },
    development: {
      extend: 'default',
      database: "bdd-app-web",
    },
    test: {
      extend: 'default',
      database: "bdd-app-web",
    }
  };

module.exports = config;