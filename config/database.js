require('dotenv').config()

const config = {
    default: {
      username: "cris_santander",
      password: null,
      dialect: 'postgres',
      database: "bbdd_training",
      host: '127.0.0.1',
    },
    development: {
      extend: 'default',
      database: "bbdd_training",
    },
    test: {
      extend: 'default',
      database: "bbdd_training",
    }
  };

module.exports = config;