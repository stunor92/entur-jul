// Nissens rute julaften, med minutter etter 24. des. kl. 00:00 (norsk tid).
// Kartprojeksjonen kan ikke vise selve polpunktet, så Nordpolen ligger på 80°N (nord for Svalbard).
export const ROUTE = [
  { name: 'Nordpolen', lat: 80, lng: 15, minutes: 16 * 60 },
  { name: 'Tromsø', lat: 69.65, lng: 18.96, minutes: 16 * 60 + 30 },
  { name: 'Bergen', lat: 60.39, lng: 5.32, minutes: 17 * 60 },
  { name: 'Oslo', lat: 59.91, lng: 10.75, minutes: 17 * 60 + 15 },
  { name: 'København', lat: 55.68, lng: 12.57, minutes: 17 * 60 + 45 },
  { name: 'Berlin', lat: 52.52, lng: 13.4, minutes: 18 * 60 + 15 },
  { name: 'London', lat: 51.51, lng: -0.13, minutes: 19 * 60 },
  { name: 'Reykjavík', lat: 64.15, lng: -21.94, minutes: 20 * 60 },
  { name: 'New York', lat: 40.71, lng: -74.01, minutes: 23 * 60 },
  { name: 'Rio de Janeiro', lat: -22.91, lng: -43.17, minutes: 25 * 60 },
  { name: 'Mexico by', lat: 19.43, lng: -99.13, minutes: 27 * 60 },
  { name: 'Los Angeles', lat: 34.05, lng: -118.24, minutes: 29 * 60 },
  { name: 'Anchorage', lat: 61.22, lng: -149.9, minutes: 31 * 60 },
  { name: 'Nordpolen', lat: 80, lng: 15, minutes: 33 * 60 },
];

const HOME = ROUTE[0];

function clock(minutes) {
  const m = ((minutes % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
}

export function getSleighStatus(now) {
  const eve = new Date(now.getFullYear(), 11, 24);
  const t = (now - eve) / 60000;
  const last = ROUTE[ROUTE.length - 1];

  if (t < HOME.minutes) {
    return {
      phase: 'verksted',
      position: [HOME.lat, HOME.lng],
      text: `Lastes i verkstedet · Avgang julaften kl. ${clock(HOME.minutes)}`,
      next: ROUTE[1].name,
    };
  }

  if (t >= last.minutes) {
    return { phase: 'hjemme', position: [HOME.lat, HOME.lng], text: 'Hjemme på Nordpolen · Takk for i år!', next: null };
  }

  const i = ROUTE.findIndex((stop, idx) => t >= stop.minutes && t < ROUTE[idx + 1].minutes);
  const from = ROUTE[i];
  const to = ROUTE[i + 1];
  const f = (t - from.minutes) / (to.minutes - from.minutes);

  return {
    phase: 'underveis',
    position: [from.lat + (to.lat - from.lat) * f, from.lng + (to.lng - from.lng) * f],
    text: `I rute · Leverte pakker i ${from.name} kl. ${clock(from.minutes)}`,
    next: to.name,
  };
}
