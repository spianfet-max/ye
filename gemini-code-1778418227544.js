import React, { useState, useMemo, useEffect, useRef } from 'react';

// =================================================================
// ARCHIVE DATA
// =================================================================
const ALBUMS = [
  {
    id: 'tcd', title: 'The College Dropout', short: 'TCD', year: '2004',
    palette: { bg: '#E8DCC4', text: '#3A2817', accent: '#B8860B', glow: 'rgba(184,134,11,0.22)', soft: 'rgba(184,134,11,0.12)' },
    quotes: [
      { text: "I'm doing pretty good as far as geniuses go", year: 2004, type: 'QUOTE', source: 'Time magazine profile', context: 'His first major-magazine cover.' },
      { text: 'the wired-jaw album', year: 2003, type: 'BIOGRAPHY', source: 'October 2002 car crash', context: 'Recorded Through the Wire with a wired jaw.' },
      { text: 'chipmunk soul', year: 2004, type: 'PRODUCTION', source: 'signature sound', context: 'Sped-up vocal samples.' },
      { text: 'the dropout', year: 2002, type: 'BIOGRAPHY', source: 'Chicago State College', context: 'Left after one semester.' },
      { text: 'Jesus Walks', year: 2004, type: 'SINGLE', source: 'Grammy winner', context: 'Sold a Christian theme to mainstream radio.' },
    ],
  },
  {
    id: 'lr', title: 'Late Registration', short: 'LR', year: '2005',
    palette: { bg: '#FAF6E8', text: '#0F1B3D', accent: '#C9A961', glow: 'rgba(201,169,97,0.28)', soft: 'rgba(201,169,97,0.14)' },
    quotes: [
      { text: "George Bush doesn't care about black people", year: 2005, type: 'EVENT', source: 'Hurricane Relief', context: 'Live and off-script on NBC.' },
      { text: 'Gold Digger', year: 2005, type: 'SINGLE', source: 'Ray Charles sample', context: 'Number one for ten weeks.' },
      { text: 'the Jon Brion turn', year: 2005, type: 'PRODUCTION', source: 'Collaboration', context: 'Strings, horns, and baroque flourishes.' },
    ],
  },
  {
    id: 'grad', title: 'Graduation', short: 'GRAD', year: '2007',
    palette: { bg: '#FFD9EC', text: '#1B1B5C', accent: '#FFC700', glow: 'rgba(255,199,0,0.36)', soft: 'rgba(255,199,0,0.18)' },
    quotes: [
      { text: "I refuse to accept other people's ideas of happiness", year: 2007, type: 'QUOTE', source: 'Interviews', context: 'A core line in his self-mythology.' },
      { text: 'beat 50 Cent on September 11', year: 2007, type: 'EVENT', source: 'Sales Showdown', context: 'Marked the shift away from gangsta rap.' },
      { text: 'shutter shades', year: 2007, type: 'FASHION', source: 'Signature style', context: 'Worn everywhere on the Glow in the Dark tour.' },
    ],
  },
  {
    id: '808s', title: '808s & Heartbreak', short: '808s', year: '2008',
    palette: { bg: '#CFD3D8', text: '#0F1417', accent: '#D63333', glow: 'rgba(214,51,51,0.30)', soft: 'rgba(214,51,51,0.14)' },
    quotes: [
      { text: "Beyoncé had one of the best videos of all time", year: 2009, type: 'EVENT', source: 'VMAs', context: "Interrupted Taylor Swift's acceptance." },
      { text: 'auto-tuned grief', year: 2008, type: 'PRODUCTION', source: 'New sound', context: 'Drum machines and Auto-Tune as instruments.' },
    ],
  }
  // ... You can add your remaining albums here following the same structure
];

const DEFAULT_PALETTE = { bg: '#F4F0E8', text: '#1A1A1A', accent: '#888', glow: 'rgba(0,0,0,0.1)', soft: 'rgba(0,0,0,0.05)' };

// Optimized Bubble Component
const Bubble = React.memo(({ b, album, isFilteredOut, isPinned, onPin }) => {
  const isLong = b.text.length > 25;
  return (
    <div
      className={`bubble-wrap ${isFilteredOut ? 'dim' : ''}`}
      style={{
        left: `${b.x}%`,
        top: `${b.y}%`,
        opacity: isPinned && isPinned.id !== b.id ? 0.15 : 1,
      }}
    >
      <div 
        className="bubble-drift" 
        style={{ '--drift': `${b.drift}s`, '--delay': `${b.delay}s`, '--dx': `${b.driftDx}px`, '--dy': `${b.driftDy}px` }}
      >
        <span
          className={`bubble ${isLong ? 'long' : ''}`}
          style={{
            '--glow': album.palette.glow,
            '--accent-soft': album.palette.soft,
            '--text': album.palette.text,
          }}
          onClick={() => onPin(b)}
        >
          {b.text}
        </span>
      </div>
    </div>
  );
});

export default function App() {
  const [activeAlbumId, setActiveAlbumId] = useState(null);
  const [pinnedQuote, setPinnedQuote] = useState(null);
  const fieldRef = useRef(null);

  // High Performance Mouse Tracking via CSS Variables
  useEffect(() => {
    const container = fieldRef.current;
    if (!container) return;
    const handleMove = (e) => {
      const rect = container.getBoundingClientRect();
      container.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      container.style.setProperty('--my', `${e.clientY - rect.top}px`);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  // Close card on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setPinnedQuote(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Memoized positions to prevent re-calculations
  const allBubbles = useMemo(() => {
    const items = [];
    ALBUMS.forEach(a => a.quotes.forEach((q, i) =>
      items.push({ 
        id: `${a.id}-${i}`, 
        albumId: a.id, 
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10,
        drift: Math.random() * 10 + 10,
        delay: Math.random() * -20,
        driftDx: Math.random() * 40 - 20,
        driftDy: Math.random() * 40 - 20,
        ...q 
      })
    ));
    return items;
  }, []);

  const paletteSource = pinnedQuote ? ALBUMS.find(a => a.id === pinnedQuote.albumId) : 
                        activeAlbumId ? ALBUMS.find(a => a.id === activeAlbumId) : null;
  const palette = paletteSource ? paletteSource.palette : DEFAULT_PALETTE;

  return (
    <div className="app-container" style={{ background: palette.bg, color: palette.text }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@300;400;500&display=swap');
        
        .app-container {
          min-height: 100vh;
          transition: background-color 1s ease, color 1s ease;
          font-family: "Instrument Serif", serif;
          position: relative;
          overflow: hidden;
        }

        .bubble-wrap {
          position: absolute;
          will-change: transform;
          transition: opacity 0.6s ease;
          z-index: 2;
        }

        .bubble {
          display: inline-block;
          padding: 0.6em 1.2em;
          border-radius: 999px;
          font-style: italic;
          cursor: pointer;
          white-space: nowrap;
          transition: transform 0.3s cubic-bezier(0.2, 0, 0.2, 1), background-color 0.4s ease;
          background: transparent;
          color: inherit;
        }

        .bubble.long { white-space: normal; max-width: 200px; text-align: center; }

        .bubble:hover {
          transform: scale(1.25);
          background-color: var(--accent-soft) !important;
          box-shadow: 0 10px 30px var(--glow);
        }

        @keyframes drift {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(var(--dx), var(--dy)); }
        }

        .bubble-drift {
          animation: drift var(--drift) ease-in-out infinite;
          animation-delay: var(--delay);
        }

        .dim { opacity: 0.05 !important; pointer-events: none; filter: blur(2px); }

        .filter-pill {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          padding: 6px 14px;
          border-radius: 999px;
          border: 1px solid currentColor;
          background: transparent;
          color: inherit;
          cursor: pointer;
          opacity: 0.4;
          transition: all 0.3s ease;
        }

        .filter-pill.active { opacity: 1; background: currentColor; color: var(--bg); }

        .card-overlay {
          position: fixed; inset: 0; z-index: 100;
          background: rgba(0,0,0,0.2);
          backdrop-filter: blur(10px);
          display: flex; align-items: center; justify-content: center;
        }

        .card {
          background: white; padding: 40px; border-radius: 8px;
          max-width: 500px; width: 90%; position: relative;
          box-shadow: 0 30px 60px rgba(0,0,0,0.1);
        }
      `}</style>

      <header style={{ padding: '40px', position: 'relative', zIndex: 10 }}>
        <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', margin: 0, letterSpacing: '-0.02em' }}>
          ye <span style={{ opacity: 0.4, fontStyle: 'italic' }}>/ archives</span>
        </h1>
        <nav style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '24px' }}>
          <button className={`filter-pill ${!activeAlbumId ? 'active' : ''}`} onClick={() => setActiveAlbumId(null)}>All</button>
          {ALBUMS.map(a => (
            <button 
              key={a.id} 
              className={`filter-pill ${activeAlbumId === a.id ? 'active' : ''}`} 
              onClick={() => setActiveAlbumId(a.id)}
            >
              {a.short}
            </button>
          ))}
        </nav>
      </header>

      <main ref={fieldRef} style={{ height: '70vh', width: '100vw', position: 'relative' }}>
        {allBubbles.map(b => (
          <Bubble 
            key={b.id} 
            b={b} 
            album={ALBUMS.find(a => a.id === b.albumId)}
            isFilteredOut={activeAlbumId && activeAlbumId !== b.albumId}
            isPinned={pinnedQuote}
            onPin={setPinnedQuote}
          />
        ))}
      </main>

      {pinnedQuote && (
        <div className="card-overlay" onClick={() => setPinnedQuote(null)}>
          <div className="card" style={{ background: palette.bg, color: palette.text }} onClick={e => e.stopPropagation()}>
            <p style={{ fontSize: '12px', opacity: 0.5, textTransform: 'uppercase', marginBottom: '20px' }}>{pinnedQuote.year} — {pinnedQuote.source}</p>
            <h2 style={{ fontSize: '2rem', fontStyle: 'italic', margin: '0 0 20px 0' }}>"{pinnedQuote.text}"</h2>
            <p style={{ lineHeight: '1.6', opacity: 0.8 }}>{pinnedQuote.context}</p>
            <button 
               onClick={() => setPinnedQuote(null)}
               style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'absolute', top: '20px', right: '20px', fontSize: '20px', color: 'inherit' }}
            >✕</button>
          </div>
        </div>
      )}
    </div>
  );
}