import React, { useState, useMemo, useEffect, useRef } from 'react';

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
          style={{ '--glow': album.palette.glow, '--accent-soft': album.palette.soft }}
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
        .app-container { min-height: 100vh; transition: background 0.8s ease; font-family: "Instrument Serif", serif; position: relative; overflow: hidden; }
        .bubble-wrap { position: absolute; will-change: transform; transition: opacity 0.4s ease; }
        .bubble { display: inline-block; padding: 0.5em 1em; border-radius: 999px; cursor: pointer; transition: transform 0.2s ease-out; }
        .bubble:hover { transform: scale(1.2); background: var(--accent-soft); box-shadow: 0 10px 20px var(--glow); }
        .bubble.long { white-space: normal; max-width: 150px; text-align: center; }
        @keyframes drift { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(var(--dx), var(--dy)); } }
        .bubble-drift { animation: drift var(--drift) ease-in-out infinite; }
        .dim { opacity: 0.05 !important; pointer-events: none; filter: blur(2px); }
        .filter-pill { font-family: 'JetBrains Mono', monospace; font-size: 10px; padding: 4px 10px; border-radius: 20px; border: 1px solid currentColor; background: transparent; cursor: pointer; opacity: 0.4; margin-right: 5px; }
        .filter-pill.active { opacity: 1; background: currentColor; color: white; }
        .overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.2); backdrop-filter: blur(5px); display: flex; align-items: center; justify-content: center; z-index: 100; }
        .card { background: white; padding: 30px; max-width: 400px; border-radius: 4px; position: relative; }
      `}</style>

      <header style={{ padding: '30px' }}>
        <h1 style={{ fontSize: '3rem', margin: 0 }}>ye / archives</h1>
        <nav style={{ marginTop: '15px' }}>
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
            <h2 style={{ fontStyle: 'italic' }}>"{pinnedQuote.text}"</h2>
            <p>{pinnedQuote.context}</p>
            <button onClick={() => setPinnedQuote(null)} style={{ position: 'absolute', top: 10, right: 10, background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}>✕</button>
          </div>
        </div>
      )}
    </div>
  );
}