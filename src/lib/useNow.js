import { useEffect, useState } from 'react';

// ?dato=2026-12-10 eller ?dato=2026-12-10T16:30 forskyver klokka for testing.
function getOffset() {
  const param = new URLSearchParams(window.location.search).get('dato');
  if (!param) return 0;
  const simulated = new Date(param.includes('T') ? param : `${param}T12:00`);
  return Number.isNaN(simulated.getTime()) ? 0 : simulated.getTime() - Date.now();
}

const offset = getOffset();

export function useNow() {
  const [now, setNow] = useState(() => new Date(Date.now() + offset));

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date(Date.now() + offset)), 1000);
    return () => clearInterval(interval);
  }, []);

  return now;
}
