import React from 'react';
import { getTimeLeft } from '../lib/christmas';
import './Countdown.css';

const UNITS = [
  ['days', 'dager'],
  ['hours', 'timer'],
  ['minutes', 'min'],
  ['seconds', 'sek'],
];

function Countdown({ target, now, className = '' }) {
  const timeLeft = getTimeLeft(target, now);

  return (
    <div className={`countdown ${className}`} role="timer">
      {UNITS.map(([key, label]) => (
        <div key={key} className="countdown__unit">
          <span className="countdown__number">{String(timeLeft[key]).padStart(2, '0')}</span>
          <span className="countdown__label">{label}</span>
        </div>
      ))}
    </div>
  );
}

export default Countdown;
