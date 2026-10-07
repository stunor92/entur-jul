import React from 'react';
import { LanguageIcon, ValidTicketIcon, UserIcon, MenuIcon } from '@entur/icons';
import EnturLogo from './EnturLogo';
import Snowfall from './Snowfall';
import './SiteHeader.css';

function SiteHeader() {
  return (
    <header className="site-header">
      <Snowfall count={30} fall="120px" />
      <div className="site-header__bar">
        <EnturLogo />
        <nav className="site-header__nav" aria-label="Hovedmeny">
          <span className="site-header__item site-header__item--wide">
            <LanguageIcon inline /> Bokmål
          </span>
          <span className="site-header__item site-header__item--wide">
            Kjøp julebillett <ValidTicketIcon inline />
          </span>
          <span className="site-header__item">
            <UserIcon inline /> Logg inn
          </span>
          <span className="site-header__item">
            Meny <MenuIcon inline />
          </span>
        </nav>
      </div>
    </header>
  );
}

export default SiteHeader;
