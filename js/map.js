import { loadWorldData, loadCountriesData, calculateWorldStats } from './data.js';
import { showCountryInfo, updateWorldStats } from './ui.js';

const width = 960;
const height = 540;
const isMobile = () => window.innerWidth < 600;
const spacing = 5;
const maxPoints = 3000;

let countryMap = new Map();
let pointToCountryId = new Map();

function generatePoints(spacing,max){
  const points = [];
  let count=0;
  for(let lat=-90;lat<=90;lat+=spacing){
    for(let lon=-180;lon<=180;lon+=spacing){
      if(count>=max) return points;
      points.push([lon,lat]);
      count++;
    }
  }
  return points;
}

export async function initializeMap(){
  const loading = d3.select('#loading');
  const svg = d3.select('#mapa');
  try{
    const [world,countriesData] = await Promise.all([loadWorldData(), loadCountriesData()]);
    const countries = topojson.feature(world, world.objects.countries);
    const stats = calculateWorldStats(countriesData);
    updateWorldStats({totalPopulation:stats.totalPopulation,countryCount:stats.countryCount,averagePopulation:stats.averagePopulation,largestCountry:stats.largestCountry});

    // Mapear países
    countriesData.forEach(country=>{
      if(country.ccn3){
        const id=String(country.ccn3).padStart(3,'0');
        countryMap.set(id,country);
      }
      if(country.cca3){
        countryMap.set(country.cca3,country);
      }
    });

    loading.text('Dibujando puntos sobre tierra...');
    const projection = d3.geoEqualEarth().fitSize([width,height],{type:'Sphere'});
    const allPoints = generatePoints(spacing,maxPoints);
    const landPoints = [];
    const features = countries.features;
    allPoints.forEach(p=>{
      for(const feature of features){
        if(d3.geoContains(feature,p)){
          const id = feature.id;
          landPoints.push(p);
          pointToCountryId.set(p.join(','), id);
          break;
        }
      }
    });

    // Usamos solo 'click' — en mobile el browser convierte tap en click automáticamente
    // Evitamos touchstart con passive:false que el browser ignora cuando hay scroll
    const circles = svg.selectAll('circle').data(landPoints).enter().append('circle')
      .attr('cx', d=> projection(d)[0])
      .attr('cy', d=> projection(d)[1])
      .attr('r', isMobile() ? 3.5 : 1.8)
      .attr('fill','#0288d1')
      .attr('stroke','#01579b')
      .attr('stroke-width',0.2)
      .attr('opacity',0);

    // Adjuntar click con addEventListener nativo para mayor compatibilidad
    circles.each(function(d){
      this.addEventListener('click', (e)=>{ e.stopPropagation(); showCountryInfoByPoint(d); });
    });

    circles.transition().duration(800).delay((d,i)=>Math.min(i*1.5,2000)).attr('opacity',1);

    loading.style('display','none');
  }catch(e){
    console.error('Error initializing map',e);
    d3.select('#loading').html('⚠️ Error al cargar el mapa. Recargue la página para intentarlo de nuevo.');
  }
}

export function showCountryInfoByPoint(point){
  const id = pointToCountryId.get(point.join(','));
  let country = countryMap.get(id);
  if(!country && id){
    const numericId = String(id).padStart(3,'0');
    country = countryMap.get(numericId);
  }
  showCountryInfo(country);
}
