#!/bin/bash

# Verificar que Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "Error: Docker no está instalado"
    exit 1
fi

# Verificar que docker compose está disponible
if ! docker compose version &> /dev/null; then
    echo "Error: docker compose no está disponible"
    exit 1
fi

echo "Deteniendo contenedores existentes..."
docker compose down

echo "Reconstruyendo imágenes..."
docker compose build

echo "Levantando servicios..."
docker compose up -d

echo "Esperando a que los servicios estén listos..."
sleep 10

echo "Aplicando migraciones de la base de datos..."
docker compose exec backend alembic upgrade head

echo "Mostrando logs..."
docker compose logs -f 