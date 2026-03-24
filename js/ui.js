import { getLocalTime, isDayTime } from './timezone.js';

const infoPanel = document.getElementById('info-panel');
const nightOverlay = document.getElementById('night-overlay');
let isPanelOpen = false; // bandera para evitar cierres indeseados

export function animatePopulationCounter(targetValue, elementId, duration = 2000){
  const element = document.getElementById(elementId);
  const start = 0;
  const increment = targetValue / (duration / 16);
  let current = start;
  function updateCounter(){
    current += increment;
    if(current >= targetValue){
      element.textContent = new Intl.NumberFormat('es').format(Math.round(targetValue));
      return;
    }
    element.textContent = new Intl.NumberFormat('es').format(Math.round(current));
    requestAnimationFrame(updateCounter);
  }
  updateCounter();
}

export function updateWorldStats(stats){
  animatePopulationCounter(stats.totalPopulation,'population-counter');
  document.getElementById('total-countries').textContent = stats.countryCount;
  animatePopulationCounter(stats.averagePopulation,'avg-population',1500);
  const largestEl = document.getElementById('largest-country');
  if(stats.largestCountry && stats.largestCountry.name){
    largestEl.textContent = stats.largestCountry.name;
    largestEl.title = `${new Intl.NumberFormat('es').format(stats.largestCountry.population)} habitantes`;
  }
}

export function showCountryInfo(country){
  if(!country){
    document.getElementById('panel-country').textContent = 'País no identificado';
    document.getElementById('panel-continent').textContent = '—';
    document.getElementById('panel-capital').textContent = '—';
    document.getElementById('panel-languages').textContent = '—';
    document.getElementById('panel-population').textContent = '—';
    document.getElementById('panel-time').textContent = '—';
    document.getElementById('panel-daynight').textContent = '—';
    document.getElementById('panel-flag').style.display = 'none';
    infoPanel.classList.add('visible');
    isPanelOpen = true;
    return;
  }

  let localTime = '—';
  let isDay = true;
  let timezone = 'UTC';
  if(country.timezones && country.timezones.length>0){
    timezone = country.timezones[0];
    localTime = getLocalTime(timezone);
    isDay = isDayTime(timezone);
  }

  document.getElementById('panel-country').textContent = country.name?.common || 'Desconocido';
  document.getElementById('panel-continent').textContent = country.region || '—';
  document.getElementById('panel-capital').textContent = country.capital ? country.capital[0] : '—';
  document.getElementById('panel-languages').textContent = country.languages ? Object.values(country.languages).join(', ') : '—';
  document.getElementById('panel-population').textContent = country.population ? new Intl.NumberFormat('es').format(country.population) : '—';
  document.getElementById('panel-time').textContent = localTime;
  document.getElementById('panel-daynight').textContent = isDay ? '☀️ Día' : '🌙 Noche';

  const flagImg = document.getElementById('panel-flag');
  if(country.flags?.svg){
    flagImg.src = country.flags.svg;
    flagImg.style.display = 'inline';
  }else{
    flagImg.style.display = 'none';
  }

  nightOverlay.style.opacity = isDay ? '0' : '0.4';
  infoPanel.classList.add('visible');
  isPanelOpen = true;
}

export function closeInfoPanel(){
  infoPanel.classList.remove('visible');
  nightOverlay.style.opacity = '0';
  isPanelOpen = false;
}

// Event listeners for closing
const closeBtn = document.getElementById('close-panel');
if(closeBtn) closeBtn.addEventListener('click', closeInfoPanel);

// Close when clicking outside: sólo si el panel está abierto y el clic no fue dentro del panel ni dentro del mapa
document.addEventListener('click', (e)=>{
  if(!isPanelOpen) return;
  const mapWrapper = document.getElementById('map-wrapper');
  if(!infoPanel.contains(e.target) && !(mapWrapper && mapWrapper.contains(e.target))){
    closeInfoPanel();
  }
});

// Export for map to call when user clicks a point
