const DAY = 1000 * 60 * 60 * 24;

// 4. søndag i advent er siste søndag før 1. juledag; 1. søndag i advent er tre uker før.
export function firstAdventSunday(year) {
  const christmasDay = new Date(year, 11, 25);
  const fourthAdvent = 25 - (christmasDay.getDay() || 7);
  return new Date(year, 11, fourthAdvent - 21);
}

export function christmasEve(year) {
  return new Date(year, 11, 24);
}

// Faser: 'before-advent' -> 'advent' -> 'christmas' (24.–26. des), så neste år.
export function getSeason(now) {
  const y = now.getFullYear();
  if (now >= christmasEve(y) && now < new Date(y, 11, 27)) {
    return { phase: 'christmas', year: y, target: null, advent: firstAdventSunday(y), eve: christmasEve(y) };
  }
  const year = now >= christmasEve(y) ? y + 1 : y;
  const advent = firstAdventSunday(year);
  const eve = christmasEve(year);
  if (now < advent) return { phase: 'before-advent', year, target: advent, advent, eve };
  return { phase: 'advent', year, target: eve, advent, eve };
}

export function getTimeLeft(target, now) {
  const diff = Math.max(0, target - now);
  return {
    days: Math.floor(diff / DAY),
    hours: Math.floor((diff % DAY) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

export function getStops(year) {
  const advent = firstAdventSunday(year);
  const sunday = (week) => new Date(year, advent.getMonth(), advent.getDate() + week * 7);
  return [
    { id: 'advent1', name: '1. søndag i advent', date: advent, emoji: '🕯️' },
    { id: 'luke1', name: 'Luke 1', date: new Date(year, 11, 1), emoji: '🎁' },
    { id: 'advent2', name: '2. søndag i advent', date: sunday(1), emoji: '🕯️' },
    { id: 'advent3', name: '3. søndag i advent', date: sunday(2), emoji: '🕯️' },
    { id: 'lucia', name: 'Luciadagen', date: new Date(year, 11, 13), emoji: '👑' },
    { id: 'advent4', name: '4. søndag i advent', date: sunday(3), emoji: '🕯️' },
    { id: 'lillejul', name: 'Lillejulaften', date: new Date(year, 11, 23), emoji: '🍚' },
    { id: 'julaften', name: 'Julaften', date: christmasEve(year), emoji: '🎄' },
  ].sort((a, b) => a.date - b.date);
}

export function formatDate(date, options = { day: 'numeric', month: 'short' }) {
  return date.toLocaleDateString('nb-NO', options);
}

export function formatClock(date) {
  return date.toLocaleTimeString('nb-NO', { hour: '2-digit', minute: '2-digit' });
}
