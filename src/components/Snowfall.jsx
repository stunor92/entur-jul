import React, { useMemo } from 'react';
import './Snowfall.css';

// fall: hvor langt fnuggene faller, tilpasset høyden på flaten de ligger i.
function Snowfall({ count = 40, fall = '110vh' }) {
  const flakes = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 3 + Math.random() * 5,
        duration: 8 + Math.random() * 10,
        delay: -Math.random() * 18,
        drift: (Math.random() - 0.5) * 60,
      })),
    [count]
  );

  return (
    <div className="snowfall" aria-hidden="true" style={{ '--fall': fall }}>
      {flakes.map((f) => (
        <span
          key={f.id}
          className="snowflake"
          style={{
            left: `${f.left}%`,
            width: f.size,
            height: f.size,
            animationDuration: `${f.duration}s`,
            animationDelay: `${f.delay}s`,
            '--drift': `${f.drift}px`,
          }}
        />
      ))}
    </div>
  );
}

export default Snowfall;
