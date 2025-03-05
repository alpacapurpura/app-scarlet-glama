#!/bin/bash

# Detener y eliminar contenedores existentes
docker-compose down

# Reconstruir las imágenes
docker-compose build

# Levantar los servicios
docker-compose up -d

# Aplicar migraciones de la base de datos
docker exec lc-lg-backend-1 alembic upgrade head

# Mostrar logs
docker-compose logs -f 