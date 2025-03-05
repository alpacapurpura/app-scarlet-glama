# AaaS Frontend

Frontend de la aplicación AaaS (Asistente Empresarial basado en IA).

## Tecnologías

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Radix UI
- Next Themes

## Requisitos

- Node.js 18 o superior
- npm 9 o superior

## Instalación

1. Clonar el repositorio
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Crear archivo `.env.local` con las variables de entorno necesarias:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

## Desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

## Construcción

Para construir la aplicación para producción:

```bash
npm run build
```

## Inicio en producción

Para iniciar la aplicación en modo producción:

```bash
npm start
```

## Estructura del proyecto

```
frontend/
├── app/                    # Páginas y componentes de la aplicación
├── components/            # Componentes reutilizables
├── lib/                   # Utilidades y configuraciones
├── public/               # Archivos estáticos
└── styles/               # Estilos globales
```

## Características

- Autenticación de usuarios
- Chatbot interactivo
- Historial de conversaciones
- Tema claro/oscuro
- Diseño responsive
- Notificaciones toast
- Manejo de errores
- Carga progresiva
- Optimización de rendimiento

## Contribución

1. Fork el repositorio
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## Licencia

Este proyecto le pertenece a Christian Revilla Meléndez