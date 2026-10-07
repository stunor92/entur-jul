import React, { useMemo, useState } from 'react';
import {
  ClockIcon,
  RightArrowIcon,
  DownArrowIcon,
  CopyIcon,
  VerticalDotsIcon,
  ValidationInfoIcon,
  BusIcon,
  TrainIcon,
  SnowCoachIcon,
} from '@entur/icons';
import Snowfall from '../components/Snowfall';
import { BannerAlertBox } from '@entur/alert';
import { getTimeLeft, formatDate } from '../lib/christmas';
import { getDailyAvvik } from '../lib/avvik';
import './Billett.css';

// Deterministisk «QR-kode»: 25x25 ruter med faste hjørnemarkører.
const QR_SIZE = 25;

function useQrCells(seed) {
  return useMemo(() => {
    let x = seed;
    const rand = () => ((x = (x * 9301 + 49297) % 233280) / 233280);
    const far = QR_SIZE - 7;
    return Array.from({ length: QR_SIZE * QR_SIZE }, (_, i) => {
      const r = Math.floor(i / QR_SIZE);
      const c = i % QR_SIZE;
      const corner = [[0, 0], [0, far], [far, 0]].find(([fr, fc]) => r >= fr && r <= fr + 6 && c >= fc && c <= fc + 6);
      if (!corner) return rand() > 0.5;
      const dr = r - corner[0];
      const dc = c - corner[1];
      return dr === 0 || dr === 6 || dc === 0 || dc === 6 || (dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4);
    });
  }, [seed]);
}

// Kontrollbildet bytter farge hver dag, som i appen.
const FRAME_COLORS = ['#5ac39a', '#ff5959', '#aeb7e2', '#ffca28', '#64b3e7', '#ffbf9e'];

function ticketState(season, now) {
  if (season.phase === 'before-advent') {
    const { days, hours } = getTimeLeft(season.advent, now);
    return { active: false, status: `Aktiveres om ${days} dager ${hours} timer`, progress: 0 };
  }
  if (season.phase === 'advent') {
    const { days, hours } = getTimeLeft(season.eve, now);
    return {
      active: true,
      status: `${days} dager ${hours} timer igjen`,
      progress: (now - season.advent) / (season.eve - season.advent),
    };
  }
  return { active: false, status: 'Brukt – god jul!', progress: 1 };
}

const REPEAT = [
  { icon: BusIcon, title: 'Adventsbillett (Nissen & Co)', sub: 'Sone A, 1 Voksen' },
  { icon: TrainIcon, title: 'Julaften (Polarekspressen)', sub: 'Julebillett, 1 Voksen + 1 Nisse' },
  { icon: SnowCoachIcon, title: 'Nordpolen (Sledeekspressen)', sub: 'Enkeltbillett, 9 Reinsdyr' },
];

function TicketDetail({ season, now, state, onClose }) {
  const qr = useQrCells(season.year);
  const frame = FRAME_COLORS[now.getDate() % FRAME_COLORS.length];

  return (
    <div className="app__sheet" role="dialog" aria-label="Julebillett">
      <div className="app__sheet-card">
        <div className={`app__ticket-head ${state.active ? '' : 'is-inactive'}`}>
          <h2>Julaften</h2>
          <p className="app__ticket-type">Julebillett 24 dager</p>
          <p className="app__ticket-label">Reisende</p>
          <p className="app__ticket-travellers">1 Voksen, 1 Nisse</p>
          <div className="app__ticket-meta">
            <span>Gyldig til {formatDate(season.eve, { day: 'numeric', month: 'short' })} 00:00</span>
            <span className="app__ticket-code"><CopyIcon inline /> JUL{season.year % 100}24NS</span>
          </div>
        </div>
        <div className="app__ticket-progress">
          <span style={{ width: `${state.progress * 100}%` }} />
        </div>
        <div className="app__ticket-body">
          <div className="app__qr" aria-hidden="true">
            {qr.map((on, i) => <span key={i} className={on ? 'on' : ''} />)}
          </div>
          <div className="app__validation" style={{ background: frame }} aria-hidden="true">
            <div className="app__validation-scene">
              <Snowfall count={14} fall="180px" />
              <span className="app__validation-tree">🎄</span>
              <span className="app__validation-train">🚂</span>
            </div>
          </div>
        </div>
      </div>
      <div className="app__sheet-actions">
        <button className="app__btn app__btn--primary" onClick={onClose}>Lukk</button>
        <button className="app__btn app__btn--secondary"><VerticalDotsIcon inline /> Valg</button>
      </div>
    </div>
  );
}

function Billett({ now, season }) {
  const [open, setOpen] = useState(false);
  const state = ticketState(season, now);
  const avvik = getDailyAvvik(now);

  return (
    <div className="app">
      <div className="app__frame">
        <div className="app__screen">
          <button className="app__info" aria-label="Informasjon"><ValidationInfoIcon /></button>
          <h1 className="app__title">Billetter</h1>

          <BannerAlertBox variant={avvik.variant} title={avvik.title} className="app__avvik">
            {avvik.text}
          </BannerAlertBox>

          <button className={`app__ticket ${state.active ? '' : 'is-inactive'}`} onClick={() => setOpen(true)}>
            <span className="app__ticket-main">
              <strong>Julaften</strong>
              <span>Julebillett 24 dager</span>
              <span>1 voksen, 1 nisse</span>
            </span>
            <span className="app__ticket-foot">
              <ClockIcon /> {state.status}
              <RightArrowIcon className="app__ticket-arrow" />
            </span>
          </button>

          <button className="app__btn app__btn--secondary app__btn--wide">Kjøp ny billett</button>

          <h2 className="app__section">Gjenta kjøp</h2>
          <ul className="app__list">
            {REPEAT.map(({ icon: Icon, title, sub }) => (
              <li key={title}>
                <Icon className="app__list-icon" />
                <span>
                  <strong>{title}</strong>
                  <span>{sub}</span>
                </span>
                <RightArrowIcon className="app__list-chevron" />
              </li>
            ))}
          </ul>
          <span className="app__more">Flere forslag <DownArrowIcon inline /></span>
        </div>

        {open && <TicketDetail season={season} now={now} state={state} onClose={() => setOpen(false)} />}
      </div>
    </div>
  );
}

export default Billett;
