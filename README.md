Documentacion de la API

Para correr, crear un archivo .env con lo siguiente, reemplazando con sus datos propios

DB_USER = web_user
DB_PASSWORD = 12345678
DB_NAME = web_db
DB_HOST = 127.0.0.1

Luego entrar a la carpeta client y crear otro archivo .env con lo siguiente (api corriendo en el puerto 4000)

REACT_APP_SERVER_URL = http://localhost:4000


luego ejecutamos los siquientes comandos:

1) sudo service postgresql start
2) yarn install
3) npx sequelize db:drop
4) npx sequelize db:create
5) npx sequelize db:migrate
6) npx sequelize db:seed:all

Con esto tendriamos nuestra app corriendo en el puerto 4000
En caso de querer la app en otro puerto se lo agregamos al .env
