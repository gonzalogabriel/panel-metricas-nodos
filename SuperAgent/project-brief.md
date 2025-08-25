# Panel de Control de Métricas de Ocupación de Nodos

## Descripción del Proyecto
Panel de control web que muestra métricas de ocupación de nodos obtenidas desde Google Sheets, con indicadores visuales de colores según el nivel de ocupación.

## Funcionalidades Principales

### 1. Conexión con Google Sheets
- **Fuente de datos**: https://docs.google.com/spreadsheets/d/1P7toXdq8ccA7vyvEMbiBMmJ3IBuDP_Fb2tx4DO1RUbE/edit?usp=sharing
- **Actualización**: Automática al cargar la aplicación
- **Columnas a procesar**:
  - Ocupación Nodo
  - Capacidad Real (Gigas)
  - Viernes 22 Agosto 11:00 Últimas 24 horas
  - Capacidad en Uso (Gigas)

### 2. Sistema de Indicadores Visuales
- **Verde suave**: 0% - 75% de ocupación
- **Amarillo suave**: 75.1% - 80% de ocupación
- **Rojo suave**: 80.1% - 100% de ocupación

### 3. Interfaz de Usuario
- Diseño atractivo y moderno
- Tabla responsive con métricas
- Indicadores de color en tiempo real
- Actualización automática de datos

## Requerimientos Técnicos

### Backend (Express + TypeScript)
- API REST para obtener datos de Google Sheets
- Integración con Google Sheets API
- Cálculo de porcentajes de ocupación
- Endpoint para métricas en tiempo real
- Configuración CORS para frontend

### Frontend (React + TypeScript + Tailwind CSS)
- Componente principal de panel de control
- Tabla de métricas con diseño atractivo
- Sistema de colores dinámico
- Diseño responsive
- Actualización automática de datos

### Arquitectura
- Monolito modular
- Separación clara entre frontend y backend
- API REST para comunicación
- Manejo de errores robusto

## Casos de Uso
1. **Visualización de métricas**: Usuario accede al panel y ve datos actualizados
2. **Monitoreo en tiempo real**: Los datos se actualizan automáticamente
3. **Identificación rápida**: Colores indican inmediatamente el estado de ocupación
4. **Acceso multiplataforma**: Panel accesible desde cualquier dispositivo web

## Tecnologías Específicas
- **Google Sheets API**: Para obtener datos
- **Express.js**: Servidor backend
- **React**: Interfaz de usuario
- **Tailwind CSS**: Estilos y diseño
- **TypeScript**: Tipado fuerte
- **CORS**: Comunicación frontend-backend
