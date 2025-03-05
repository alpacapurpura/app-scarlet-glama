# Agent as a Service (AaaS)

Sistema de asistente conversacional empresarial basado en IA.

## Características Principales

- Procesamiento de documentos y mensajes
- Integración con múltiples canales de comunicación (email, WhatsApp)
- Automatización de tareas empresariales
- Conexión con APIs externas
- Integración con n8n y RPA Framework
- Interfaz web moderna y responsiva

## Requisitos del Sistema

- Python 3.11+
- Node.js 18+
- Docker y Docker Compose
- PostgreSQL 15+
- Redis 7+

## Estructura del Proyecto

```
.
├── backend/                 # API FastAPI
│   ├── app/
│   │   ├── agents/         # Módulos de agentes
│   │   ├── auth/          # Autenticación
│   │   ├── comms/         # Comunicaciones
│   │   ├── core/          # Configuración
│   │   └── erp/           # Integración ERP
│   ├── tests/             # Tests
│   └── Dockerfile
├── frontend/               # Next.js 14
│   ├── app/               # App Router
│   ├── components/        # Componentes React
│   └── Dockerfile
├── infrastructure/        # Configuración de infraestructura
│   ├── docker/           # Docker configs
│   └── terraform/        # IaC para GCP
└── docker-compose.yml    # Orquestación de servicios
```

## Instalación y Desarrollo

1. Clonar el repositorio
2. Copiar `.env.example` a `.env` y configurar variables
3. Ejecutar `docker-compose up -d`

## Despliegue

El proyecto está configurado para desplegarse en Google Cloud Platform usando Compute Engine.

## Licencia

MIT 