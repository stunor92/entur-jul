import React from 'react';
import { PlayIcon } from '@entur/icons';
import './TabBar.css';

function TabBar({ tabs, index, onSelect, progress, paused, onTogglePause }) {
  return (
    <div className="tabbar">
      <nav className="tabbar__pill" aria-label="Hovedmeny">
        {tabs.map(({ key, label, Icon, ActiveIcon }, i) => {
          const active = i === index;
          const TabIcon = active ? ActiveIcon : Icon;
          return (
            <button
              key={key}
              className={`tabbar__tab ${active ? 'is-active' : ''}`}
              aria-current={active ? 'page' : undefined}
              onClick={() => onSelect(i)}
            >
              <TabIcon aria-hidden="true" />
              {label}
              {active && !paused && (
                <span className="tabbar__progress" style={{ transform: `scaleX(${progress})` }} />
              )}
            </button>
          );
        })}
      </nav>
      <button
        className="tabbar__pause"
        onClick={onTogglePause}
        aria-label={paused ? 'Start automatisk bytte av side' : 'Pause automatisk bytte av side'}
      >
        {paused ? <PlayIcon aria-hidden="true" /> : <span className="tabbar__pause-icon" aria-hidden="true" />}
      </button>
    </div>
  );
}

export default TabBar;
