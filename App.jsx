import React, { useState, useMemo, useEffect, useRef } from 'react';

// =================================================================
// ARCHIVE DATA
// =================================================================
const ALBUMS = [
  {
    id: 'tcd', title: 'The College Dropout', short: 'TCD', year: '2004',
    palette: { bg: '#E8DCC4', text: '#3A2817', accent: '#B8860B', glow: 'rgba(184,134,11,0.22)', soft: 'rgba(184,134,11,0.12)' },
    quotes: [
      { text: "I'm doing pretty good as far as geniuses go", year: 2004, source: 'Time magazine', context: 'His first major cover.' },
      { text: 'the wired-jaw album', year: 2003, source: 'Car crash', context: 'Recorded through a literal wired jaw.' },
      { text: 'chipmunk soul', year: 2004, source: 'Production signature', context: 'Sped-up vocal samples.' }
    ],
  },
  {
    id: 'lr', title: 'Late Registration', short: 'LR', year: '2005',
    palette: { bg: '#FAF6E8', text: '#0F1B3D', accent: '#C9A961', glow: 'rgba(201,169,97,0.28)', soft: 'rgba(201,169,97,0.14)' },
    quotes: [
      { text: "George Bush doesn't care about black people", year: 2005, source: 'NBC Concert', context: 'Live and off-script.' },
      { text: 'Gold Digger', year: 2005, source: 'Ray Charles sample', context: 'Number one for ten weeks.' }
    ],
  },
  {
    id: 'grad', title: 'Graduation', short: 'GRAD', year: '2007',
    palette: { bg: '#FFD9EC', text: '#1B1B5C', accent: '#FFC700', glow: 'rgba(255,199,0,0.36)', soft: 'rgba(255,199,0,0.18)' },
    quotes: [
      { text: "I refuse to accept other people's ideas of happiness", year: 2007, source: 'Press cycle', context: 'A core line in his self-mythology.' },
      { text: 'shutter shades', year: 2007, source: 'Fashion signature', context: 'Streetwear icon.' }
    ],
  },
  {
    id: '808s', title: '808s & Heartbreak', short: '808s', year: '2008',
    palette: { bg: '#CFD3D8', text: '#0F1417', accent: '#D63333', glow: 'rgba(214,51,51,0.30)', soft: 'rgba(214,51,51,0.14)' },
    quotes: [
      { text: "Beyoncé had one of the best videos of all time", year: 2009, source: 'VMAs', context: "The infamous Taylor Swift interruption." },
      { text: 'auto-tuned grief', year: 2008, source: 'Production turn', context: 'Minimalist drum machines and vocal distortion.' }
    ],
  },
  {
    id: 'mbdtf', title: 'My Beautiful Dark Twisted Fantasy', short: 'MBDTF', year: '2010',
    palette: { bg: '#180606', text: '#F2E4D0', accent: '#C0392B', glow: 'rgba(192,57,43,0.50)', soft: 'rgba(192,57,43,0.22)' },
    quotes: [
      { text: 'My greatest pain is that I will never see myself perform live', year: 2010, source: 'Interviews', context: 'The era of maximalism.' },
      { text: 'Runaway', year: 2010, source: 'Short Film', context: 'A 34-minute cinematic experience.' }
    ],
  }
];

const DEFAULT_PALETTE = { bg: '#F4F0E8', text: '#1A1A1A', accent: '#888', glow: 'rgba(0,0,0,0.1)', soft: 'rgba(0,0,0,0.05)' };

const Bubble = React.memo(({ b, album, isFilteredOut, isPinned, onPin }) => {
  const isLong = b.text.length > 25;
  return (
    <div
      className={`bubble-wrap ${isFilteredOut ? 'dim' : ''}`}
      style={{
        left: `${b.x}%`,
        top: `${b.y}%`,
        opacity: isPinned && isPinned.id !== b.id ? 0.1 : 1,
      }}
    >
      <div className="bubble-drift" style={{ '--drift': `${b.drift}s`, '--dx': `${b.driftDx}px`, '--dy': `${b.driftDy}px` }}>
        <span
          className={`bubble ${isLong ? 'long' : ''}`}
          style={{ 
            '--glow': album.palette.glow, 
            '--accent-soft': album.palette.soft 
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

  // CPU-optimized mouse tracking
  useEffect(() => {
    const container = fieldRef.current;
    if (!container) return;
    const handleMove = (e) => {
      container.style.setProperty('--mx', `${e.clientX}px`);
      container.style.setProperty('--my', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  const allBubbles = useMemo(() => {
    const items = [];
    ALBUMS.forEach(a => a.quotes.forEach((q, i) =>
      items.push({ 
        id: `${a.id}-${i}`, 
        albumId: a.id, 
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10,
        drift: Math.random() * 6 + 10,
        driftDx: Math.random() * 20 - 10,
        driftDy: Math.random() * 20 - 10,
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
        .app-container { min-height: 100vh; transition: background 0.8s ease, color 0.8s ease; font-family: "Instrument Serif", serif; position: relative; overflow: hidden; }
        .bubble-wrap { position: absolute; will-change: transform; transition: opacity 0.4s ease; }
        .bubble { display: inline-block; padding: 0.5em 1em; border-radius: 999px; cursor: pointer; transition: transform 0.2s ease-out; background: transparent; color: inherit; }
        .bubble:hover { transform: scale(1.2); background: var(--accent-soft); box-shadow: 0 10px 20px var(--glow); }
        .bubble.long { white-space: normal; max-width: 150px; text-align: center; }
        @keyframes drift { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(var(--dx), var(--dy)); } }
        .bubble-drift { animation: drift var(--drift) ease-in-out infinite; }
        .dim { opacity: 0.05 !important; pointer-events: none; filter: blur(2px); }
        .filter-pill { font-family: 'JetBrains Mono', monospace; font-size: 10px; padding: 4px 10px; border-radius: 20px; border: 1px solid currentColor; background: transparent; cursor: pointer; opacity: 0.4; margin-right: 8px; transition: all 0.3s; }
        .filter-pill.active { opacity: 1; background: currentColor; color: var(--bg); }
        .overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.3); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; z-index: 100; }
        .card { background: white; padding: 40px; max-width: 450px; border-radius: 4px; position: relative; box-shadow: 0 20px 50px rgba(0,0,0,0.1); }
      `}</style>

      <header style={{ padding: '40px', position: 'relative', zIndex: 10 }}>
        <h1 style={{ fontSize: '3.5rem', margin: 0, letterSpacing: '-0.03em' }}>ye <span style={{ opacity: 0.3, fontStyle: 'italic' }}>/ archives</span></h1>
        <nav style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          <button className={`filter-pill ${!activeAlbumId ? 'active' : ''}`} onClick={() => setActiveAlbumId(null)}>All</button>
          {ALBUMS.map(a => (
            <button key={a.id} className={`filter-pill ${activeAlbumId === a.id ? 'active' : ''}`} onClick={() => setActiveAlbumId(a.id)}>{a.short}</button>
          ))}
        </nav>
      </header>

      <main ref={fieldRef} style={{ height: '70vh', position: 'relative' }}>
        {allBubbles.map(b => (
          <Bubble 
            key={b.id} b={b} 
            album={ALBUMS.find(a => a.id === b.albumId)}
            isFilteredOut={activeAlbumId && activeAlbumId !== b.albumId}
            isPinned={pinnedQuote} onPin={setPinnedQuote}
          />
        ))}
      </main>

      {pinnedQuote && (
        <div className="overlay" onClick={() => setPinnedQuote(null)}>
          <div className="card" style={{ background: palette.bg, color: palette.text }} onClick={e => e.stopPropagation()}>
            <p style={{ fontSize: '11px', opacity: 0.5, textTransform: 'uppercase', marginBottom: '15px' }}>{pinnedQuote.year} — {pinnedQuote.source}</p>
            <h2 style={{ fontSize: '2.2rem', fontStyle: 'italic', margin: '0 0 20px 0', lineHeight: 1.1 }}>"{pinnedQuote.text}"</h2>
            <p style={{ lineHeight: '1.5', opacity: 0.8 }}>{pinnedQuote.context}</p>
            <button onClick={() => setPinnedQuote(null)} style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', color: 'inherit' }}>✕</button>
          </div>
        </div>
      )}
    </div>
  );
}
