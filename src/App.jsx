import React from 'react';
import {
  SearchIcon,
  SearchFilledIcon,
  ClockIcon,
  ClockFilledIcon,
  ValidTicketIcon,
  ValidTicketFilledIcon,
  MapIcon,
  MapFilledIcon,
  UserIcon,
} from '@entur/icons';
import UserFilledIcon from './components/UserFilledIcon';
import Juleruta from './pages/Juleruta';
import Avgangstavle from './pages/Avgangstavle';
import Billett from './pages/Billett';
import Kart from './pages/Kart';
import Profil from './pages/Profil';
import TabBar from './components/TabBar';
import { useNow } from './lib/useNow';
import { useCarousel, getIntervalMs } from './lib/useCarousel';
import { getSeason } from './lib/christmas';
import './App.css';

// Rekkefølgen her er også rekkefølgen sidene roterer i (?side=<key> velger startside).
const TABS = [
  { key: 'forside', label: 'Forside', Icon: SearchIcon, ActiveIcon: SearchFilledIcon, Page: Juleruta },
  { key: 'avganger', label: 'Avganger', Icon: ClockIcon, ActiveIcon: ClockFilledIcon, Page: Avgangstavle },
  { key: 'billetter', label: 'Billetter', Icon: ValidTicketIcon, ActiveIcon: ValidTicketFilledIcon, Page: Billett },
  { key: 'kart', label: 'Kart', Icon: MapIcon, ActiveIcon: MapFilledIcon, Page: Kart },
  { key: 'profil', label: 'Profil', Icon: UserIcon, ActiveIcon: UserFilledIcon, Page: Profil },
];
const KEYS = TABS.map((t) => t.key);
const INTERVAL_MS = getIntervalMs();

function App() {
  const now = useNow();
  const season = getSeason(now);
  const { index, select, paused, togglePause, progress } = useCarousel(KEYS, INTERVAL_MS);
  const { Page } = TABS[index];

  return (
    <>
      <Page now={now} season={season} onClose={() => select(0)} />
      <TabBar
        tabs={TABS}
        index={index}
        onSelect={select}
        progress={progress}
        paused={paused}
        onTogglePause={togglePause}
      />
    </>
  );
}

export default App;
