# 🌍 Mapa Mundial Interactivo con Hora Local y Efecto Día/Noche

## 📋 Descripción del Proyecto

Este proyecto es una aplicación web interactiva que muestra un mapa mundial con información detallada de países, incluyendo hora local en tiempo real y efectos visuales de día/noche. La aplicación permite a los usuarios explorar información geográfica y demográfica de manera visual e intuitiva.

## ✨ Características Principales

### 🗺️ Visualización del Mapa
- Mapa mundial interactivo generado con puntos sobre tierra firme
- Proyección cartográfica Equal Earth para una representación más precisa
- Animación suave al cargar los puntos del mapa
- Diseño responsive que se adapta a diferentes tamaños de pantalla

### 🕐 Sistema de Tiempo Real
- Cálculo automático de la hora local para cada país
- Detección de día/noche basada en la zona horaria
- Efecto visual de oscurecimiento para países en horario nocturno
- Soporte para múltiples zonas horarias por país

### 📊 Información de Países
- **Datos mostrados:**
  - Nombre del país
  - Continente/Región
  - Capital
  - Idiomas oficiales
  - Población formateada
  - Hora local actual
  - Estado día/noche con iconos
  - Bandera nacional

### 🌐 Contador de Población Mundial
- Contador animado de población mundial total
- Estadísticas en tiempo real:
  - Número total de países
  - Población promedio por país
  - País más poblado
- Animaciones suaves para los contadores numéricos

## 🛠️ Tecnologías Utilizadas

### Frontend
- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos con gradientes y sombras
- **JavaScript ES6+** - Lógica de aplicación

### Librerías
- **D3.js v7** - Visualización de datos y generación del mapa
- **TopoJSON v3** - Datos geográficos optimizados
- **RestCountries API** - Información actualizada de países
- **World Atlas** - Datos topográficos del mundo

## 📁 Estructura del Código

### HTML
```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <!-- Metadatos y recursos -->
  </head>
  <body>
    <!-- Contenedor principal -->
    <!-- SVG del mapa -->
    <!-- Panel de información -->
    <!-- Contador de población -->
    <!-- Footer -->
  </body>
</html>
```

### CSS - Estilos Principales

#### Diseño General
- Layout flexbox para distribución responsive
- Gradientes lineales para fondos atractivos
- Sombras suaves para profundidad visual
- Border-radius para elementos redondeados

#### Componentes Estilizados
1. **Contenedor Principal**
   - Max-width: 960px
   - Centrado automático
   - Padding adaptativo

2. **Panel de Información**
   - Fondo blanco con sombra
   - Animación de aparición/desaparición
   - Botón de cierre flotante

3. **Contador de Población**
   - Gradiente azul de fondo
   - Texto blanco con sombra
   - Estadísticas en grid flexible

### JavaScript - Funcionalidades

#### 1. Gestión de Zonas Horarias
```javascript
function getLocalTime(timezone) {
  // Conversión de UTC a zona IANA
  // Formato de hora local
  // Manejo de errores
}
```

#### 2. Detección Día/Noche
```javascript
function isDayTime(timezone) {
  // Cálculo de hora actual
  // Determinación de día (6-18h)
  // Retorno booleano
}
```

#### 3. Animación de Contadores
```javascript
function animatePopulationCounter(targetValue, elementId, duration) {
  // Incremento progresivo
  // RequestAnimationFrame
  // Formato de números
}
```

#### 4. Generación del Mapa
```javascript
async function initializeMap() {
  // Carga de datos
  // Filtrado de puntos
  // Renderizado SVG
  // Event listeners
}
```

## 📱 Diseño Responsive

### Breakpoints
- **Desktop**: >600px
  - Tamaño completo de elementos
  - Diseño horizontal para estadísticas

- **Mobile**: ≤600px
  - Reducción de tamaños de fuente
  - Stack vertical para estadísticas
  - Ajuste de padding y márgenes

## 🔄 Flujo de Datos

1. **Inicialización**
   - Carga de datos geográficos
   - Fetch de información de países
   - Cálculo de estadísticas globales

2. **Interacción**
   - Click/Touch en punto del mapa
   - Búsqueda de información del país
   - Cálculo de hora local
   - Actualización del panel

3. **Visualización**
   - Renderizado de puntos SVG
   - Animaciones CSS
   - Actualización de contadores
   - Efecto día/noche

## ⚡ Optimizaciones

### Performance
- Lazy loading de puntos del mapa
- Límite máximo de 3000 puntos
- Caché de datos de países
- Animaciones con CSS transforms

### Fallbacks
- Datos de respaldo si falla la API
- Manejo de errores en cálculos de tiempo
- Valores por defecto para datos faltantes

## 🎨 Paleta de Colores

- **Principal**: `#0288d1` (Azul claro)
- **Secundario**: `#00acc1` (Cyan)
- **Acento**: `#01579b` (Azul oscuro)
- **Fondos**: `#e0f7fa`, `#bbdefb` (Azules muy claros)
- **Texto**: `#37474f`, `#546e7a` (Grises azulados)

## 📊 APIs y Fuentes de Datos

### RestCountries API
- **Endpoint**: `https://restcountries.com/v3.1/all`
- **Campos**: name, ccn3, region, languages, population, flags, capital, timezones
- **Fallback**: Array local con 10 países principales

### World Atlas
- **URL**: `https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json`
- **Formato**: TopoJSON
- **Resolución**: 110m (media)

## 🔍 Características Técnicas Destacadas

### Mapeo de Zonas Horarias
- Conversión de offsets UTC a zonas IANA
- Soporte para países con múltiples zonas
- Cálculo preciso de hora local

### Sistema de Coordenadas
- Proyección Equal Earth
- Detección de puntos en tierra con `d3.geoContains`
- Mapeo bidireccional punto-país

### Animaciones
- Transiciones D3 para aparición de puntos
- CSS transitions para paneles
- RequestAnimationFrame para contadores

## 🚀 Instalación y Uso

### Requisitos
- Navegador moderno con soporte ES6+
- Conexión a internet para cargar librerías CDN
- JavaScript habilitado

### Implementación
1. Copiar el código HTML completo
2. Guardar como archivo `.html`
3. Abrir en navegador web
4. Esperar carga completa del mapa

## 📈 Métricas y Estadísticas

- **Puntos renderizados**: Hasta 3000
- **Países soportados**: 195+
- **Zonas horarias**: 24 principales
- **Tiempo de carga**: ~2-5 segundos

## 🎯 Casos de Uso

1. **Educativo**: Aprendizaje de geografía mundial
2. **Empresarial**: Visualización de zonas horarias globales
3. **Personal**: Exploración interactiva de países
4. **Analítico**: Comparación de datos demográficos

## 🔐 Consideraciones de Seguridad

- Uso de HTTPS para todas las APIs
- Sin almacenamiento de datos sensibles
- Validación de datos externos
- Manejo seguro de errores

## 📄 Licencia y Créditos

**© 2025 Jhorman Jesús Castellanos Morales - Todos los derechos reservados**

### Atribuciones
- D3.js - Mike Bostock
- TopoJSON - Mike Bostock
- RestCountries API - Alejandro Matos
- World Atlas - Natural Earth

---

*Este proyecto es una demostración de capacidades técnicas en visualización de datos geográficos y programación web interactiva. Todos los derechos están reservados al autor.*
