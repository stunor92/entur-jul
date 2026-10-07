import React, { useState } from 'react';
import { Contrast } from '@entur/layout';
import { TravelHeader } from '@entur/travel';
import { Heading1, Heading2, Link } from '@entur/typography';
import { BannerAlertBox, SmallAlertBox } from '@entur/alert';
import { SecondaryButton } from '@entur/button';
import { ActionChip } from '@entur/chip';
import { RadioGroup, RadioPanel } from '@entur/form';
import { Tabs, TabList, Tab } from '@entur/tab';
import {
  BusIcon,
  TrainIcon,
  WalkIcon,
  CalendarIcon,
  ClockIcon,
  LeftArrowIcon,
  RightArrowIcon,
  DestinationIcon,
  UserIcon,
  ExpandIcon,
  CollapsedIcon,
  AddIcon,
  CheckIcon,
  DownArrowIcon,
} from '@entur/icons';
import SiteHeader from '../components/SiteHeader';
import Snowfall from '../components/Snowfall';
import { getStops, formatDate } from '../lib/christmas';
import { getDailyAvvik } from '../lib/avvik';
import './Juleruta.css';

const MODE_ICON = { bus: BusIcon, train: TrainIcon };

function LineBadge({ mode, line }) {
  const Icon = MODE_ICON[mode];
  return (
    <span className={`line-badge line-badge--${mode}`}>
      <Icon inline aria-hidden="true" />
      {line}
    </span>
  );
}

// Én rad i reiseplanen. above/below styrer linjestykket over og under prikken.
function StopRow({ time, name, sub, above, below, dot, children, final }) {
  return (
    <div className="plan__row plan__row--stop">
      <span className="plan__time">{time}</span>
      <span className={`plan__line plan__line--above-${above ?? 'none'} plan__line--below-${below ?? 'none'}`}>
        <span className={`plan__dot plan__dot--${dot}`} />
      </span>
      <div className="plan__content">
        <span className="plan__stop-name">
          {name} {final && <DestinationIcon inline aria-label="Endestasjon" />}
        </span>
        {sub && <span className="plan__sub">{sub}</span>}
        {children}
      </div>
    </div>
  );
}

function LegRow({ pattern, children }) {
  return (
    <div className="plan__row">
      <span />
      <span className={`plan__line plan__line--full-${pattern}`} />
      <div className="plan__content plan__content--leg">{children}</div>
    </div>
  );
}

function Juleruta({ now, season }) {
  const [showStops, setShowStops] = useState(true);
  const [flex, setFlex] = useState(1);
  const [busTicket, setBusTicket] = useState('advent');
  const [trainTicket, setTrainTicket] = useState('standard');

  const stops = getStops(season.year);
  const trainStops = stops.filter((s) => s.date > season.advent && s.id !== 'julaften');
  const nextStop = stops.find((s) => s.date > now);
  const busDays = Math.max(1, Math.round((season.advent - now) / 86400000));
  const today = formatDate(now, { weekday: 'long', day: 'numeric', month: 'long' });
  const avvik = getDailyAvvik(now);

  return (
    <div className="detaljer">
      <SiteHeader />

      <div className="detaljer__layout">
        <main className="detaljer__main">
          <Link href="#" className="detaljer__back">
            <LeftArrowIcon inline /> Tilbake til reisesøk
          </Link>
          <Heading1 margin="bottom">Detaljer om reisen</Heading1>

          <div className="detaljer__meta">
            <div>
              <span><CalendarIcon inline /> {today.charAt(0).toUpperCase() + today.slice(1)}</span>
              <span><ClockIcon inline /> Reisetid: hele adventstiden</span>
            </div>
            <Link href="#">
              Neste jul <RightArrowIcon inline />
            </Link>
          </div>

          {season.phase === 'christmas' && (
            <SmallAlertBox variant="success" className="detaljer__arrived">
              Du har ankommet Julaften. God jul! 🎄
            </SmallAlertBox>
          )}

          <div className="detaljer__columns">
            <section className="plan" aria-label="Reiseplan">
              <StopRow time="I dag" name="Kontoret" sub="Ved kaffemaskinen" dot="start" below="walk" />
              <LegRow pattern="walk">
                <span className="plan__walk"><WalkIcon inline /> Gå 3 min (246 m)</span>
              </LegRow>

              <StopRow time="I dag" name="Kontoret bussterminal" sub="Plattform A" dot="bus" above="walk" below="bus" />
              <LegRow pattern="bus">
                <span className="plan__operator">Buss med Nissen &amp; Co</span>
                <span className="plan__line-info">
                  <LineBadge mode="bus" line="A1" /> 1. søndag i advent
                </span>
                <span className="plan__count">
                  <CollapsedIcon inline /> {season.phase === 'before-advent' ? `${busDays} dager igjen` : 'Ankommet'}
                </span>
                <SecondaryButton size="small" className="plan__btn">
                  <DownArrowIcon inline /> Tidligere avganger
                </SecondaryButton>
                <SmallAlertBox variant="information" className="plan__alert">
                  Ankommer ofte 2 minutter etter rutetid. Reinsdyrene tar seg god tid i svingene.
                </SmallAlertBox>
              </LegRow>

              <StopRow
                time={formatDate(season.advent)}
                name="1. søndag i advent"
                sub="Plattform 1"
                dot={season.advent <= now ? 'bus-passed' : 'bus'}
                above="bus"
                below="walk"
              />
              <LegRow pattern="walk">
                <span className="plan__walk"><WalkIcon inline /> Gå 1 min (40 m) · Vent 0 minutter</span>
              </LegRow>

              <StopRow
                time={formatDate(season.advent)}
                name="1. søndag i advent"
                sub="Spor 24"
                dot={season.advent <= now ? 'train-passed' : 'train'}
                above="walk"
                below="train"
              />
              <LegRow pattern="train">
                <span className="plan__operator">Tog med Polarekspressen</span>
                <span className="plan__line-info">
                  <LineBadge mode="train" line="J24" /> Julaften
                </span>
                <button className="plan__count plan__count--toggle" onClick={() => setShowStops((v) => !v)}>
                  {showStops ? <ExpandIcon inline /> : <CollapsedIcon inline />} {trainStops.length} stopp
                </button>
                {showStops && (
                  <ol className="plan__mini-stops">
                    {trainStops.map((s) => {
                      const passed = s.date <= now;
                      const isNext = s === nextStop;
                      return (
                        <li key={s.id} className={passed ? 'is-passed' : ''}>
                          <span className="plan__mini-date">{formatDate(s.date)}</span>
                          <span>{s.emoji} {s.name}</span>
                          {passed && <CheckIcon inline className="plan__mini-check" aria-label="Passert" />}
                          {isNext && season.phase === 'advent' && <span className="plan__next">Neste stopp</span>}
                        </li>
                      );
                    })}
                  </ol>
                )}
                <SecondaryButton size="small" className="plan__btn">
                  <DownArrowIcon inline /> Senere avganger
                </SecondaryButton>
                <SmallAlertBox variant="warning" className="plan__alert">
                  Lillejulaften: Mandel i sporet. Toget kan bli stående i grøten et par minutter.
                </SmallAlertBox>
              </LegRow>

              <StopRow time={formatDate(season.eve)} name="Julaften" sub="Spor 24" dot="train" above="train" final />
            </section>

            <aside className="detaljer__side" aria-label="Dagens avvik">
              <BannerAlertBox variant={avvik.variant} title={avvik.title}>
                {avvik.text}
              </BannerAlertBox>
            </aside>
          </div>
        </main>

        <Contrast as="aside" className="billetter" aria-label="Billetter">
          <Snowfall count={30} />
          <div className="billetter__inner">
            <Heading2 margin="bottom">Billetter</Heading2>

            <div className="billetter__travellers">
              <span><UserIcon inline /> 1 voksen · 🎅 1 nisse</span>
              <span className="billetter__edit">Endre</span>
            </div>

            <div className="billetter__leg">
              <TravelHeader size="medium" from="Kontoret" to="1. søndag i advent" />
              <p className="billetter__valid">Gyldig fra {formatDate(now, { weekday: 'short', day: 'numeric', month: 'short' })}</p>
              <RadioGroup name="bus-ticket" value={busTicket} onChange={(e) => setBusTicket(e.target.value)}>
                <RadioPanel value="advent" title="Adventsbillett sone A" secondaryLabel="0 kr" size="large">
                  <span className="billetter__type">Enkeltbillett</span>
                  <span className="billetter__operator">Nissen &amp; Co</span>
                </RadioPanel>
              </RadioGroup>
            </div>

            <hr className="billetter__divider" />

            <div className="billetter__leg">
              <TravelHeader size="medium" from="1. søndag i advent" to="Julaften" />
              <p className="billetter__valid">
                Avreise {formatDate(season.advent, { weekday: 'short', day: 'numeric', month: 'short' })}
              </p>
              <Tabs index={flex} onChange={setFlex} className="billetter__tabs">
                <TabList>
                  <Tab>Delvis fleksibel</Tab>
                  <Tab>Fleksibel</Tab>
                </TabList>
              </Tabs>
              <RadioGroup name="train-ticket" value={trainTicket} onChange={(e) => setTrainTicket(e.target.value)}>
                <div className="billetter__options">
                  <RadioPanel value="standard" title="Standard" secondaryLabel="0 kr" size="large">
                    <span className="billetter__type">{flex ? 'Flex' : 'Delvis flex'} · Julestemning inkludert</span>
                  </RadioPanel>
                  <RadioPanel value="premium" title="Premium" secondaryLabel="1 klem" size="large">
                    <span className="billetter__type">Pluss risengrynsgrøt</span>
                  </RadioPanel>
                  <RadioPanel value="kupe" title="Kupé" secondaryLabel="3 pepperkaker" size="large">
                    <span className="billetter__type">Egen kupé med peis</span>
                  </RadioPanel>
                </div>
              </RadioGroup>
            </div>

            <ActionChip size="small" className="billetter__discount">
              <AddIcon inline /> Legg til rabattkode
            </ActionChip>

            <div className="billetter__total">
              <span>Totalt: {trainTicket === 'premium' ? '1 klem' : trainTicket === 'kupe' ? '3 pepperkaker' : '0 kr'}</span>
              <span>Neste <RightArrowIcon inline /></span>
            </div>
            <Link href="#" className="billetter__report">Noe som ikke stemmer?</Link>
          </div>
        </Contrast>
      </div>
    </div>
  );
}

export default Juleruta;
