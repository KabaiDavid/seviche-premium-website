import { useState } from 'react';
import { BUSINESS, LINKS } from '../data/site';

/** Click-to-load map: no third-party requests until the visitor asks for it. */
export function MapEmbed() {
  const [on, setOn] = useState(false);
  return (
    <div className="map">
      {on ? (
        <iframe
          title={`Map showing Seviche at ${BUSINESS.street}, ${BUSINESS.city}`}
          src={LINKS.mapsEmbed}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <button className="map__placeholder" onClick={() => setOn(true)}>
          <svg viewBox="0 0 400 300" aria-hidden="true" className="map__art" preserveAspectRatio="xMidYMid slice">
            <g fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M-10 210 L420 120" strokeWidth="3" />
              <path d="M60 -10 L150 310" opacity=".5" />
              <path d="M210 -10 L250 310" opacity=".5" />
              <path d="M330 -10 L300 310" opacity=".5" />
              <path d="M-10 70 L420 40" opacity=".35" />
              <path d="M-10 280 L420 230" opacity=".35" />
            </g>
            <text x="300" y="112" fontSize="10" fill="currentColor" opacity=".7" transform="rotate(-12 300 112)" letterSpacing="2">
              BARDSTOWN RD
            </text>
            <circle cx="232" cy="160" r="22" fill="currentColor" opacity=".12" />
            <circle cx="232" cy="160" r="6" fill="var(--terracotta-500)" />
          </svg>
          <span className="map__label">
            <span className="map__title">Show interactive map</span>
            <span className="map__sub">Loads Google Maps</span>
          </span>
        </button>
      )}
    </div>
  );
}
