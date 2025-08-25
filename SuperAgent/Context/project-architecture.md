# Arquitectura del proyecto

## Estructura de archivos

project-root/
├── src/
│   ├── backend/
│   │   ├── index.ts
│   │   ├── config/
│   │   │   ├── server.ts
│   │   │   └── googleSheets.ts
│   │   ├── routes/
│   │   │   └── metrics.ts
│   │   ├── services/
│   │   │   ├── googleSheets.ts
│   │   │   └── mockData.ts
│   │   └── types/
│   ├── frontend/
│   │   ├── src/
│   │   │   ├── main.tsx
│   │   │   ├── App.tsx
│   │   │   ├── index.css
│   │   │   ├── components/
│   │   │   │   ├── MetricsTable.tsx
│   │   │   │   └── MetricCard.tsx
│   │   │   └── services/
│   │   │       └── api.ts
│   │   └── index.html
│   └── shared/
│       └── types/
│           └── metrics.ts
├── SuperAgent/
│   ├── tech-structure.md
│   ├── project-brief.md
│   └── Context/
│       ├── project-architecture.md
│       └── iterations-log.md
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── env.example
├── .env
├── dist/
└── README.md

## Esquema de dependencias

### Backend Dependencies
```
index.ts
  ├── config/server.ts
  ├── routes/metrics.ts
  │   ├── services/googleSheets.ts
  │   │   ├── config/googleSheets.ts
  │   │   └── services/mockData.ts
  │   └── shared/types/metrics.ts
  └── shared/types/metrics.ts
```

### Frontend Dependencies
```
main.tsx
  └── App.tsx
      ├── components/MetricsTable.tsx
      │   └── components/MetricCard.tsx
      ├── services/api.ts
      └── shared/types/metrics.ts
```

## Descripción de módulos

### Backend Modules

#### `src/backend/index.ts`
- **Propósito**: Punto de entrada del servidor Express
- **Funcionalidad**: Configuración del servidor, middleware CORS, rutas
- **Dependencias**: Express, dotenv, rutas de métricas

#### `src/backend/config/googleSheets.ts`
- **Propósito**: Configuración de Google Sheets API
- **Funcionalidad**: Autenticación OAuth 2.0, creación de cliente
- **Dependencias**: googleapis, dotenv

#### `src/backend/routes/metrics.ts`
- **Propósito**: Endpoints de la API de métricas
- **Funcionalidad**: GET /api/metrics, GET /api/metrics/test, GET /health
- **Dependencias**: GoogleSheetsService, tipos compartidos

#### `src/backend/services/googleSheets.ts`
- **Propósito**: Servicio para obtener datos de Google Sheets
- **Funcionalidad**: Fetching de datos, procesamiento, cálculo de porcentajes
- **Dependencias**: googleapis, configuración de Google Sheets

#### `src/backend/services/mockData.ts`
- **Propósito**: Datos de prueba para desarrollo
- **Funcionalidad**: Datos simulados con variaciones aleatorias
- **Dependencias**: Tipos compartidos

### Frontend Modules

#### `src/frontend/src/main.tsx`
- **Propósito**: Punto de entrada de React
- **Funcionalidad**: Renderizado de la aplicación React
- **Dependencias**: React, ReactDOM, App component

#### `src/frontend/src/App.tsx`
- **Propósito**: Componente principal de la aplicación
- **Funcionalidad**: Estado global, fetching de datos, manejo de errores
- **Dependencias**: MetricsTable, ApiService, tipos compartidos

#### `src/frontend/src/components/MetricsTable.tsx`
- **Propósito**: Panel principal de métricas
- **Funcionalidad**: Header moderno, tarjetas de resumen, grid de nodos
- **Dependencias**: MetricCard, tipos compartidos

#### `src/frontend/src/components/MetricCard.tsx`
- **Propósito**: Tarjeta individual de nodo
- **Funcionalidad**: Diseño moderno con gradientes, barras de progreso, iconos
- **Dependencias**: Tipos compartidos

#### `src/frontend/src/services/api.ts`
- **Propósito**: Cliente para comunicación con backend
- **Funcionalidad**: Fetching de métricas, manejo de errores
- **Dependencias**: Tipos compartidos

### Shared Modules

#### `src/shared/types/metrics.ts`
- **Propósito**: Tipos TypeScript compartidos
- **Funcionalidad**: Definición de interfaces para métricas
- **Dependencias**: Ninguna

## Tecnologías utilizadas

### Backend
- **Runtime**: Node.js 20.15.0
- **Framework**: Express.js 4.x
- **Language**: TypeScript
- **API**: Google Sheets API v4
- **Authentication**: OAuth 2.0
- **Development**: nodemon, ts-node

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite 4.x
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Heroicons (SVG)
- **Development**: Hot Module Replacement

### Shared
- **Package Manager**: npm
- **Version Control**: Git
- **Environment**: dotenv
- **CORS**: Configurado para desarrollo local

## Características del diseño moderno

### MetricCard Component
- **Gradientes**: Fondos con gradientes sutiles
- **Sombras**: Shadow-lg con hover effects
- **Animaciones**: Transiciones suaves y transformaciones
- **Barras de progreso**: Animadas con gradientes de color
- **Iconos SVG**: Heroicons para estados
- **Responsive**: Adaptativo a diferentes pantallas

### MetricsTable Component
- **Backdrop blur**: Efectos de transparencia
- **Gradientes de fondo**: Fondo degradado azul a púrpura
- **Tarjetas de resumen**: Estadísticas con iconos
- **Grid responsive**: Layout adaptativo
- **Efectos hover**: Interacciones visuales

## Configuración de autenticación

### OAuth 2.0 Setup
- **Client ID**: Configurado en .env
- **Client Secret**: Configurado en .env
- **Scopes**: https://www.googleapis.com/auth/spreadsheets.readonly
- **Redirect URIs**: No requerido (server-to-server)

### Google Sheets Configuration
- **Spreadsheet ID**: Configurado para nueva hoja
- **Range**: A:D (columnas principales)
- **Fallback**: Datos simulados en desarrollo
