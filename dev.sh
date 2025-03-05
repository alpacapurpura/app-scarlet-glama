#!/bin/bash

# Detener contenedores existentes
docker-compose down

# Levantar los servicios en modo desarrollo
docker-compose up -d

# Aplicar migraciones de la base de datos
docker exec lc-lg-backend-1 alembic upgrade head

# Mostrar logs
docker-compose logs -f 