import { initializeMap } from './map.js';

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', ()=>{
  initializeMap();
});

// Export para debugging si es necesario
window._mapApp = { initializeMap };
