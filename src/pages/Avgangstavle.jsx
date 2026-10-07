import React from 'react';
import {
  BusIcon,
  TrainIcon,
  TramIcon,
  MetroIcon,
  FerryIcon,
  SnowCoachIcon,
  WalkIcon,
  ValidationExclamationCircleFilledIcon,
} from '@entur/icons';
import EnturLogo from '../components/EnturLogo';
import Snowfall from '../components/Snowfall';
import { getStops, formatDate, formatClock } from '../lib/christmas';
import { getDailyAvvik } from '../lib/avvik';
import Countdown from '../components/Countdown';
import './Avgangstavle.css';

const ICONS = { bus: BusIcon, train: TrainIcon, tram: TramIcon, metro: MetroIcon, ferry: FerryIcon, snowcoach: SnowCoachIcon, flytog: TrainIcon };

function departuresFor(year) {
  const byId = Object.fromEntries(getStops(year).map((s) => [s.id, s.date]));
  return [
    { line: 'A1', mode: 'bus', to: '1. søndag i advent', emoji: '🕯️', date: byId.advent1, platform: 'A' },
    { line: 'K1', mode: 'metro', to: 'Luke 1', emoji: '🎁', date: byId.luke1, platform: '2' },
    { line: 'R2', mode: 'train', to: '2. søndag i advent', emoji: '🕯️', date: byId.advent2, platform: '2' },
    { line: 'R3', mode: 'train', to: '3. søndag i advent', emoji: '🕯️', date: byId.advent3, platform: '3' },
    { line: 'L13', mode: 'tram', to: 'Luciadagen', emoji: '👑', date: byId.lucia, platform: '1' },
    { line: 'R4', mode: 'train', to: '4. søndag i advent', emoji: '🕯️', date: byId.advent4, platform: '4' },
    { line: 'P1', mode: 'bus', to: 'Pepperkakebyen', emoji: '🍪', date: new Date(year, 11, 20, 15, 0), platform: 'B', deviation: 'Innstilt – bussen er spist opp' },
    { line: 'RE23', mode: 'train', to: 'Lillejulaften', emoji: '🍚', date: byId.lillejul, platform: '3', deviation: 'Mandel i sporet ved Grøtås' },
    { line: 'J24', mode: 'train', to: 'Julaften', emoji: '🎄', date: byId.julaften, platform: '24' },
    { line: 'FLY1', mode: 'flytog', to: 'Nordpolen', emoji: '🎅', date: new Date(year, 11, 24, 23, 0), platform: '3', deviation: 'Reinsdyr på avveie' },
    { line: 'F25', mode: 'ferry', to: '1. juledag', emoji: '⭐', date: new Date(year, 11, 25), platform: 'Kai 3' },
  ].sort((a, b) => a.date - b.date);
}

// Tavla viser «Nå», minutter, klokkeslett samme dag og dato lenger fram.
function departureLabel(date, now) {
  const minutes = Math.round((date - now) / 60000);
  if (minutes <= 0) return 'Nå';
  if (minutes < 15) return `${minutes} min`;
  if (date.toDateString() === now.toDateString()) return formatClock(date);
  return formatDate(date);
}

function LineBadge({ mode, line }) {
  const Icon = ICONS[mode];
  return (
    <span className={`tavla__badge tavla__badge--${mode}`}>
      <Icon aria-hidden="true" />
      {line}
    </span>
  );
}

const BULB_COLORS = ['coral', 'canary', 'mint', 'sky', 'lavender'];

function Lights() {
  return (
    <div className="tavla__lights" aria-hidden="true">
      {Array.from({ length: 28 }, (_, i) => (
        <span key={i} className={`tavla__bulb tavla__bulb--${BULB_COLORS[i % BULB_COLORS.length]}`} style={{ animationDelay: `${(i % 4) * 0.4}s` }} />
      ))}
    </div>
  );
}

function Avgangstavle({ now, season }) {
  const departures = departuresFor(season.year).filter((d) => d.date > now || d.date.toDateString() === now.toDateString());
  const avvik = getDailyAvvik(now);
  const deviations = departures.filter((d) => d.deviation);

  return (
    <div className="tavla">
      <Snowfall count={60} />
      <div className="tavla__inner">
        <header className="tavla__header">
          <EnturLogo suffix="Juletavla" />
          <span className="tavla__clock">{formatClock(now)}</span>
        </header>

        <Lights />
        <section className="tavla__countdown" aria-label="Nedtelling">
          {season.target ? (
            <>
              <div className="tavla__countdown-text">
                <span className="tavla__countdown-kicker">Neste avgang</span>
                <h2>{season.phase === 'before-advent' ? '🕯️ 1. søndag i advent' : '🎄 Julaften'}</h2>
              </div>
              <Countdown target={season.target} now={now} className="countdown--tavla" />
            </>
          ) : (
            <h2>🎄 Polarekspressen har ankommet Julaften. God jul!</h2>
          )}
        </section>

        <section className="tavla__tile">
          <div className="tavla__tile-head">
            <h1>Kontoret, Julebyen</h1>
            <span className="tavla__walk"><WalkIcon inline /> 3 min</span>
          </div>

          <p className="tavla__situation">
            <span>↪</span> <strong>{avvik.title}:</strong> {avvik.text}
          </p>

          <table className="tavla__table">
            <thead>
              <tr>
                <th className="tavla__col-icon" aria-label="Avvik" />
                <th>Linje</th>
                <th>Destinasjon</th>
                <th className="tavla__col-platform">Spor</th>
                <th className="tavla__col-time">Avgang</th>
              </tr>
            </thead>
            <tbody>
              {departures.map((d) => (
                <tr key={d.line}>
                  <td className="tavla__col-icon">
                    {d.deviation && <ValidationExclamationCircleFilledIcon className="tavla__warn" aria-label="Avvik" />}
                  </td>
                  <td><LineBadge mode={d.mode} line={d.line} /></td>
                  <td className="tavla__dest">{d.to} <span aria-hidden="true">{d.emoji}</span></td>
                  <td className="tavla__col-platform">{d.platform}</td>
                  <td className="tavla__col-time">{departureLabel(d.date, now)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="tavla__deviations">
            {deviations.map((d) => (
              <p key={d.line}>
                <ValidationExclamationCircleFilledIcon className="tavla__warn" aria-hidden="true" />
                <span><strong>{d.mode === 'bus' ? 'Buss' : 'Tog'} {d.line}:</strong> {d.deviation}</span>
              </p>
            ))}
          </div>
          <span className="tavla__page">1 / 1</span>
        </section>
      </div>
    </div>
  );
}

export default Avgangstavle;
