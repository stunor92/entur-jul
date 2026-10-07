import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Polyline, Marker, CircleMarker, Tooltip, useMap, useMapEvents } from 'react-leaflet';
import { CloseIcon, AddIcon, SubtractIcon, CompassNeedleIcon, SnowCoachIcon } from '@entur/icons';
import { ROUTE, getSleighStatus } from '../lib/sleigh';
import { getTimeLeft } from '../lib/christmas';
import 'leaflet/dist/leaflet.css';
import './Kart.css';

const sleighIcon = L.divIcon({
  className: 'sleigh-pin',
  html: '<span class="sleigh-pin__label"><span aria-hidden="true">🛷</span> N1</span><span class="sleigh-pin__dot"></span>',
  iconSize: [84, 64],
  iconAnchor: [42, 58],
});

const routeLine = ROUTE.map((s) => [s.lat, s.lng]);

function clock(minutes) {
  return `${String(Math.floor(minutes / 60) % 24).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;
}

// Følger sleden til brukeren drar i kartet; posisjonsknappen slår følging på igjen.
function MapControls({ position, follow, setFollow }) {
  const map = useMap();

  useMapEvents({ dragstart: () => setFollow(false) });

  const [lat, lng] = position;
  useEffect(() => {
    if (follow) map.panTo([lat, lng], { animate: true });
  }, [map, follow, lat, lng]);

  return (
    <div className="kart__controls">
      <button aria-label="Zoom inn" onClick={() => map.zoomIn()}><AddIcon /></button>
      <button aria-label="Zoom ut" onClick={() => map.zoomOut()}><SubtractIcon /></button>
      <button
        aria-label="Følg sleden"
        className={follow ? 'is-active' : ''}
        onClick={() => {
          setFollow(true);
          map.flyTo(position, Math.max(map.getZoom(), 4));
        }}
      >
        <CompassNeedleIcon />
      </button>
    </div>
  );
}

function Kart({ now, onClose }) {
  const [follow, setFollow] = useState(true);
  const status = getSleighStatus(now);
  const departure = new Date(now.getFullYear(), 11, 24, 16);
  const travelled = status.phase === 'underveis'
    ? [...ROUTE.filter((s) => s.minutes <= (now - new Date(now.getFullYear(), 11, 24)) / 60000).map((s) => [s.lat, s.lng]), status.position]
    : [];
  const { days, hours, minutes, seconds } = getTimeLeft(departure, now);
  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div className="kart">
      <header className="kart__header">
        <h1>Sanntid i kart</h1>
        <button className="kart__close" aria-label="Lukk kartet" onClick={onClose}><CloseIcon /></button>
      </header>

      <div className="kart__map">
        <MapContainer
          center={status.phase === 'underveis' ? status.position : [70, 15]}
          zoom={status.phase === 'underveis' ? 4 : 3}
          minZoom={2}
          maxZoom={12}
          maxBounds={[[-85, -540], [85, 540]]}
          maxBoundsViscosity={1}
          zoomControl={false}
          worldCopyJump
          className="kart__leaflet"
        >
          <TileLayer
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            className="kart__tiles"
          />
          <Polyline positions={routeLine} pathOptions={{ className: 'kart__route', weight: 4, dashArray: '8 8' }} />
          {travelled.length > 1 && (
            <Polyline positions={travelled} pathOptions={{ className: 'kart__route', weight: 4 }} />
          )}
          {ROUTE.slice(1, -1).map((s) => (
            <CircleMarker
              key={s.name}
              center={[s.lat, s.lng]}
              radius={5}
              pathOptions={{ className: 'kart__stop', weight: 2, fillOpacity: 1 }}
            >
              <Tooltip direction="top" offset={[0, -6]}>{s.name} · {clock(s.minutes)}</Tooltip>
            </CircleMarker>
          ))}
          <Marker position={status.position} icon={sleighIcon} zIndexOffset={1000} />
          <MapControls position={status.position} follow={follow} setFollow={setFollow} />
        </MapContainer>

        <div className="kart__card">
          <div className="kart__card-title">
            <SnowCoachIcon className="kart__card-icon" />
            <span>{status.next ? `Nisseslede N1 mot ${status.next}` : 'Nisseslede N1 · Nordpolen'}</span>
          </div>
          <p className="kart__card-status">
            <span className={`kart__dot kart__dot--${status.phase}`} />
            {status.text}
          </p>
          {status.phase === 'verksted' && (
            <p className="kart__card-countdown">
              Avgang om <strong>{days} d {pad(hours)}:{pad(minutes)}:{pad(seconds)}</strong>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Kart;
