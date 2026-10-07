import React from 'react';
import './EnturLogo.css';

function EnturLogo({ suffix }) {
  return (
    <span className="entur-logo" aria-label={suffix ? `Entur ${suffix}` : 'Entur'}>
      <span className="entur-logo__en">EN</span>
      <span>TUR</span>
      {suffix && <span className="entur-logo__suffix">{suffix}</span>}
    </span>
  );
}

export default EnturLogo;
