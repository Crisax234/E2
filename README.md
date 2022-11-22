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

La api esta docuemntada en postman actualmente, puedes revisarla en el siguiente link

https://documenter.getpostman.com/view/24277246/2s8YmULKKs#b57610c3-b0e7-449f-a30f-8a97d6b9bf95