Documentacion de la API

Crear un .env con

DB_USER = 
DB_PASSWORD = 
DB_NAME = 
DB_HOST = db
SERVER_URL = http://api:4000
CELERY_BROKER_URL=redis://redis:6379/0
CELERY_RESULT_BACKEND=redis://redis:6379/0

En consola ejecutar:

sudo docker compose run api npx sequelize db:migrate
sudo docker compose run api npx sequelize db:seed:all

docker compose build
docker compose up

