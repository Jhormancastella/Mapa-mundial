export const fallbackCountries = [
  { ccn3: "032", name: { common: "Argentina" }, region: "Américas", capital: ["Buenos Aires"], languages: { spa: "Spanish" }, population: 45376763, flags: { svg: "https://flagcdn.com/ar.svg" }, timezones: ["UTC-03:00"] },
  { ccn3: "076", name: { common: "Brasil" }, region: "Américas", capital: ["Brasilia"], languages: { por: "Portuguese" }, population: 212559417, flags: { svg: "https://flagcdn.com/br.svg" }, timezones: ["UTC-04:00", "UTC-03:00", "UTC-02:00"] },
  { ccn3: "724", name: { common: "España" }, region: "Europa", capital: ["Madrid"], languages: { spa: "Spanish" }, population: 47351567, flags: { svg: "https://flagcdn.com/es.svg" }, timezones: ["UTC", "UTC+01:00"] },
  { ccn3: "840", name: { common: "Estados Unidos" }, region: "Américas", capital: ["Washington D.C."], languages: { eng: "English" }, population: 329484123, flags: { svg: "https://flagcdn.com/us.svg" }, timezones: ["UTC-12:00", "UTC-11:00", "UTC-10:00", "UTC-09:00", "UTC-08:00", "UTC-07:00", "UTC-06:00", "UTC-05:00", "UTC-04:00", "UTC+10:00", "UTC+12:00"] },
  { ccn3: "156", name: { common: "China" }, region: "Asia", capital: ["Pekín"], languages: { zho: "Chinese" }, population: 1402112000, flags: { svg: "https://flagcdn.com/cn.svg" }, timezones: ["UTC+08:00"] },
  { ccn3: "250", name: { common: "Francia" }, region: "Europa", capital: ["París"], languages: { fra: "French" }, population: 67391582, flags: { svg: "https://flagcdn.com/fr.svg" }, timezones: ["UTC-10:00", "UTC-09:30", "UTC-09:00", "UTC-08:00", "UTC-04:00", "UTC-03:00", "UTC+01:00", "UTC+02:00", "UTC+03:00", "UTC+04:00", "UTC+05:00", "UTC+10:00", "UTC+11:00", "UTC+12:00"] },
  { ccn3: "356", name: { common: "India" }, region: "Asia", capital: ["Nueva Delhi"], languages: { eng: "English", hin: "Hindi" }, population: 1380004385, flags: { svg: "https://flagcdn.com/in.svg" }, timezones: ["UTC+05:30"] },
  { ccn3: "392", name: { common: "Japón" }, region: "Asia", capital: ["Tokio"], languages: { jpn: "Japanese" }, population: 125836021, flags: { svg: "https://flagcdn.com/jp.svg" }, timezones: ["UTC+09:00"] },
  { ccn3: "643", name: { common: "Rusia" }, region: "Europa", capital: ["Moscú"], languages: { rus: "Russian" }, population: 144104080, flags: { svg: "https://flagcdn.com/ru.svg" }, timezones: ["UTC+02:00", "UTC+03:00", "UTC+04:00", "UTC+05:00", "UTC+06:00", "UTC+07:00", "UTC+08:00", "UTC+09:00", "UTC+10:00", "UTC+11:00", "UTC+12:00"] },
  { ccn3: "826", name: { common: "Reino Unido" }, region: "Europa", capital: ["Londres"], languages: { eng: "English" }, population: 67215293, flags: { svg: "https://flagcdn.com/gb.svg" }, timezones: ["UTC-08:00", "UTC-05:00", "UTC-04:00", "UTC-03:00", "UTC-02:00", "UTC", "UTC+01:00", "UTC+02:00", "UTC+06:00"] }
];

export async function loadCountriesData(){
  try{
    const response = await fetch('https://restcountries.com/v3.1/all?fields=name,ccn3,cca3,region,languages,population,flags,capital,timezones');
    if(!response.ok) throw new Error('Error en la respuesta de la API');
    const data = await response.json();
    console.log('Datos de países cargados:',data.length);
    return data;
  }catch(e){
    console.warn('Error al cargar datos de la API, usando fallback',e);
    return fallbackCountries;
  }
}

export async function loadWorldData(){
  try{
    const response = await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json');
    if(!response.ok) throw new Error('Error al cargar el mapa');
    return await response.json();
  }catch(e){
    console.error('Error al cargar world data',e);
    throw e;
  }
}

export function calculateWorldStats(countriesData){
  let totalPopulation = 0;
  let countryCount = 0;
  let largestCountry = {name:'',population:0};
  countriesData.forEach(country=>{
    if(country.population){
      totalPopulation += country.population;
      countryCount++;
      if(country.population>largestCountry.population){
        largestCountry={name:country.name.common,population:country.population};
      }
    }
  });
  const averagePopulation = Math.round(totalPopulation/countryCount);
  return {totalPopulation,countryCount,averagePopulation,largestCountry};
}
