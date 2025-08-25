# 📊 Panel de Control - Métricas de Nodos

Un panel de control moderno en tiempo real para monitorear métricas de ocupación de nodos desde Google Sheets.

## ✨ Características

- 🔄 **Auto-actualización cada 5 minutos**
- 🖱️ **Actualización manual con botón**
- 📊 **Datos en tiempo real desde Google Sheets**
- 🎨 **Diseño moderno con tarjetas profesionales**
- 🚦 **Indicadores de color dinámicos**:
  - 🟢 Verde: 0-75% (Normal)
  - 🟡 Amarillo: 75.1-80% (Advertencia)
  - 🔴 Rojo: 80.1-100% (Crítico)
- 📱 **Responsive design**

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone [URL_DE_TU_REPOSITORIO]
cd SuperAgent
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
```bash
# Copia el archivo de ejemplo
cp .env.example .env

# Edita el archivo .env con tus credenciales reales
nano .env
```

### 4. Configurar Google Sheets API

#### Opción A: API Key (Recomendado)
1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Activa la **Google Sheets API**
4. Ve a **"Credenciales" > "+ CREAR CREDENCIALES" > "Clave de API"**
5. **IMPORTANTE**: Restringe la API Key:
   - Haz clic en "RESTRINGIR CLAVE"
   - En "Restricciones de API", selecciona "Restringir clave"
   - Selecciona solo **"Google Sheets API"**
6. Copia la API Key y pégala en tu archivo `.env`:
   ```
   GOOGLE_API_KEY=tu_api_key_aqui
   ```

#### Opción B: OAuth 2.0
1. En Google Cloud Console, ve a **"Credenciales" > "+ CREAR CREDENCIALES" > "ID de cliente de OAuth 2.0"**
2. Configura el consentimiento OAuth si es necesario
3. Copia el Client ID y Client Secret al archivo `.env`

### 5. Configurar tu Google Sheet
1. Asegúrate de que tu hoja tenga estas columnas exactas:
   - **Ocupación Nodo**
   - **Capacidad Real (Gigas)**
   - **Viernes 22 Agosto 11:00 Últimas 24 horas**
   - **Capacidad en Uso (Gigas)**

2. Si usas API Key, haz tu hoja **pública**:
   - Abre tu Google Sheet
   - Haz clic en **"Compartir"**
   - Cambia a **"Cualquier persona con el enlace"**
   - Permisos: **"Lector"**

3. Copia el ID de tu hoja desde la URL:
   ```
   https://docs.google.com/spreadsheets/d/[ESTE_ES_TU_ID]/edit
   ```
   Y pégalo en `.env`:
   ```
   GOOGLE_SHEETS_ID=tu_sheet_id_aqui
   ```

## 🏃‍♂️ Ejecutar la aplicación

### Desarrollo
```bash
# Terminal 1: Backend
npm run dev

# Terminal 2: Frontend  
npm run dev:frontend
```

### Producción
```bash
# Construir frontend
npm run build:frontend

# Iniciar servidor de producción
npm start
```

## 📱 Acceso

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Health Check**: http://localhost:3001/health

## 📊 API Endpoints

- `GET /api/metrics` - Obtener todas las métricas
- `GET /api/metrics/test` - Datos de prueba
- `GET /health` - Estado del servidor

## 🔧 Tecnologías

- **Frontend**: React, TypeScript, Vite
- **Backend**: Node.js, Express, TypeScript
- **API**: Google Sheets API
- **Estilos**: CSS inline (sin dependencias externas)

## 🔒 Seguridad

- ✅ Archivo `.env` excluido de Git
- ✅ API Keys protegidas
- ✅ Variables de entorno separadas por ambiente
- ✅ Archivo `.env.example` para guía

## 📝 Scripts disponibles

```bash
npm run dev              # Servidor backend desarrollo
npm run dev:frontend     # Servidor frontend desarrollo  
npm run build:frontend   # Construir frontend para producción
npm start               # Servidor producción
npm run test            # Ejecutar tests (si los hay)
```

## 🆘 Solución de problemas

### Error: "Method doesn't allow unregistered callers"
- Verifica que tu API Key esté configurada correctamente
- Asegúrate de que Google Sheets API esté activada
- Si usas API Key, la hoja debe ser pública

### Error: "ECONNREFUSED"
- Verifica que el backend esté ejecutándose en puerto 3001
- Revisa que las variables de entorno estén configuradas

### Frontend no muestra estilos
- Los estilos están implementados con CSS inline
- No requiere Tailwind CSS ni dependencias externas

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'feat: agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

---

**⚠️ IMPORTANTE**: Nunca subas tu archivo `.env` a GitHub. Todas las credenciales deben mantenerse privadas.