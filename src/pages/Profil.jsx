import React from 'react';
import {
  UserIcon,
  CardIcon,
  ValidTicketIcon,
  ShoppingCartIcon,
  RebateTicketIcon,
  MapPinIcon,
  FilterIcon,
  StarredIcon,
  BellIcon,
  RightArrowIcon,
} from '@entur/icons';
import { getSleighStatus } from '../lib/sleigh';
import './Profil.css';

const SECTIONS = [
  {
    title: 'Betaling',
    items: [
      { Icon: CardIcon, label: 'Kort og betaling', sub: 'Pepperkaker · utløper aldri' },
      { Icon: ValidTicketIcon, label: 'Billettkategori', sub: 'Julenisse' },
      { Icon: ShoppingCartIcon, label: 'Kjøp og kvitteringer', sub: '2 milliarder gaver levert' },
      { Icon: RebateTicketIcon, label: 'Rabatter', sub: 'Reinsdyrrabatt 100 %' },
    ],
  },
  {
    title: 'Reisesøk',
    items: [
      { Icon: MapPinIcon, label: 'Snarveier i reisesøk', sub: 'Verkstedet, Pipa' },
      { Icon: FilterIcon, label: 'Filter', sub: 'Kun slede' },
      { Icon: StarredIcon, label: 'Favoritter', sub: 'Nordpolen, Pepperkakebyen' },
    ],
  },
  {
    title: 'Innstillinger',
    items: [{ Icon: BellIcon, label: 'Varslinger', sub: 'Snille barn: på · Slemme barn: på' }],
  },
];

function ListItem({ Icon, label, sub }) {
  return (
    <li>
      <Icon className="profil__icon" aria-hidden="true" />
      <span className="profil__text">
        <span>{label}</span>
        {sub && <span className="profil__sub">{sub}</span>}
      </span>
      <RightArrowIcon className="profil__chevron" aria-hidden="true" />
    </li>
  );
}

function Profil({ now }) {
  const sleigh = getSleighStatus(now);

  return (
    <div className="profil">
      <div className="profil__screen">
        <h1 className="profil__title">Min profil</h1>

        <ul className="profil__list">
          <ListItem Icon={UserIcon} label="julenissen@nordpolen.no" sub="24122412" />
        </ul>

        <section className="profil__hero" aria-label="Julenissen">
          <span className="profil__avatar" aria-hidden="true">🎅</span>
          <div>
            <strong>Julenissen</strong>
            <span>Medlem siden år 270 · Nordpolen</span>
            <span className={`profil__status profil__status--${sleigh.phase}`}>{sleigh.text}</span>
          </div>
        </section>

        <h2 className="profil__section">Reisestatistikk {now.getFullYear()}</h2>
        <div className="profil__stats">
          <div><strong>1</strong><span>natt på jobb</span></div>
          <div><strong>9</strong><span>reinsdyr</span></div>
          <div><strong>0</strong><span>forsinkelser*</span></div>
        </div>
        <p className="profil__footnote">*Rudolf er uenig.</p>

        {SECTIONS.map((section) => (
          <section key={section.title}>
            <h2 className="profil__section">{section.title}</h2>
            <ul className="profil__list">
              {section.items.map((item) => <ListItem key={item.label} {...item} />)}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

export default Profil;
