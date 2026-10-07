import { useEffect, useState } from 'react';

function initialIndex(keys) {
  const side = new URLSearchParams(window.location.search).get('side');
  return Math.max(0, keys.indexOf(side));
}

// Roterer gjennom sidene med fast intervall. Et manuelt valg starter intervallet på nytt.
export function useCarousel(keys, intervalMs) {
  const [index, setIndex] = useState(() => initialIndex(keys));
  const [paused, setPaused] = useState(false);
  const [startedAt, setStartedAt] = useState(() => Date.now());
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (paused) return undefined;
    const tick = setInterval(() => {
      const e = Date.now() - startedAt;
      if (e >= intervalMs) {
        setIndex((i) => (i + 1) % keys.length);
        setStartedAt(Date.now());
        setElapsed(0);
      } else {
        setElapsed(e);
      }
    }, 250);
    return () => clearInterval(tick);
  }, [paused, startedAt, intervalMs, keys.length]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set('side', keys[index]);
    window.history.replaceState(null, '', `?${params}`);
  }, [index, keys]);

  const select = (i) => {
    setIndex(i);
    setStartedAt(Date.now());
    setElapsed(0);
  };

  const togglePause = () => {
    if (paused) setStartedAt(Date.now() - elapsed);
    setPaused(!paused);
  };

  return { index, select, paused, togglePause, progress: Math.min(1, elapsed / intervalMs) };
}

// ?intervall=10 gir 10 sekunder per side (for testing), ellers 5 minutter.
export function getIntervalMs() {
  const seconds = Number(new URLSearchParams(window.location.search).get('intervall'));
  return (seconds > 0 ? seconds : 300) * 1000;
}
