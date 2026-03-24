export const offsetMap = {
  'UTC-12:00': 'Etc/GMT+12',
  'UTC-11:00': 'Pacific/Midway',
  'UTC-10:00': 'Pacific/Honolulu',
  'UTC-09:00': 'America/Anchorage',
  'UTC-08:00': 'America/Los_Angeles',
  'UTC-07:00': 'America/Denver',
  'UTC-06:00': 'America/Chicago',
  'UTC-05:00': 'America/New_York',
  'UTC-04:00': 'America/Caracas',
  'UTC-03:00': 'America/Argentina/Buenos_Aires',
  'UTC-02:00': 'America/Noronha',
  'UTC-01:00': 'Atlantic/Azores',
  'UTC': 'UTC',
  'UTC+00:00': 'UTC',
  'UTC+01:00': 'Europe/Berlin',
  'UTC+02:00': 'Europe/Athens',
  'UTC+03:00': 'Europe/Moscow',
  'UTC+04:00': 'Asia/Dubai',
  'UTC+05:00': 'Asia/Karachi',
  'UTC+05:30': 'Asia/Kolkata',
  'UTC+06:00': 'Asia/Dhaka',
  'UTC+07:00': 'Asia/Bangkok',
  'UTC+08:00': 'Asia/Shanghai',
  'UTC+09:00': 'Asia/Tokyo',
  'UTC+10:00': 'Australia/Sydney',
  'UTC+11:00': 'Pacific/Guadalcanal',
  'UTC+12:00': 'Pacific/Auckland'
};

export function getApproximateTimezone(utcOffset){
  return offsetMap[utcOffset] || 'UTC';
}

export function getLocalTime(timezone){
  try{
    if(!timezone) return '—';
    let tz = timezone;
    if(!timezone.includes('/')) tz = getApproximateTimezone(timezone);
    const now = new Date();
    return now.toLocaleTimeString('es-ES',{timeZone:tz,hour12:false,hour:'2-digit',minute:'2-digit'});
  }catch(e){
    console.warn('Error al calcular hora para timezone:',timezone,e);
    return '—';
  }
}

export function isDayTime(timezone){
  try{
    let tz = timezone;
    if(!timezone.includes('/')) tz = getApproximateTimezone(timezone);
    const now = new Date();
    const hour = now.toLocaleString('en-US',{timeZone:tz,hour:'numeric',hour12:false});
    return hour >= 6 && hour < 18;
  }catch(e){
    console.warn('Error determinar día/noche',e);
    return true;
  }
}
