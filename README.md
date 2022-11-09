Documentacion de la API

Para correr, crear un archivo .env con lo siguiente, reemplazando con sus datos propios

DB_USER = web_user
DB_PASSWORD = 12345678
DB_NAME = web_db
DB_HOST = 127.0.0.1
APP_KEYS = llavesecreta
SECRET_KEY = llavesecreta
JWT_SECRET = llavesecreta

luego ejecutamos los siquientes comandos:

1) sudo service postgresql start
2) yarn install
3) npx sequelize db:drop
4) npx sequelize db:create
5) npx sequelize db:migrate
6) npx sequelize db:seed:all

Con esto tendriamos nuestra app corriendo en el puerto 4000
En caso de querer la app en otro puerto se lo agregamos al .env

La api esta docuemntada en postman actualmente

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/c51273daba3ff7a3c4cb?action=collection%2Fimport)