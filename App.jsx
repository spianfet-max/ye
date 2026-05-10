import React, { useState, useMemo, useEffect, useRef } from 'react';

// =================================================================
// ARCHIVE DATA - ALL ERAS RESTORED
// =================================================================
const ALBUMS = [
  {
    id: 'tcd', title: 'The College Dropout', short: 'TCD', year: '2004',
    palette: { bg: '#E8DCC4', text: '#3A2817', accent: '#B8860B', glow: 'rgba(184,134,11,0.22)', soft: 'rgba(184,134,11,0.12)' },
    quotes: [
      { text: "I'm doing pretty good as far as geniuses go", year: 2004, source: 'Time magazine profile', context: 'His first major-magazine cover.' },
      { text: 'the wired-jaw album', year: 2003, source: 'October 2002 car crash', context: 'Recorded Through the Wire with a literal wired jaw.' },
      { text: 'chipmunk soul', year: 2004, source: 'production signature', context: 'Sped-up vocal samples that defined the era.' },
      { text: 'the dropout', year: 2002, source: 'Chicago State College', context: 'Left after one semester.' },
      { text: 'Jesus Walks', year: 2004, source: 'Best Rap Song Grammy', context: 'Sold a Christian theme to mainstream radio.' },
    ],
  },
  {
    id: 'lr', title: 'Late Registration', short: 'LR', year: '2005',
    palette: { bg: '#FAF6E8', text: '#0F1B3D', accent: '#C9A961', glow: 'rgba(201,169,97,0.28)', soft: 'rgba(201,169,97,0.14)' },
    quotes: [
      { text: "George Bush doesn't care about black people", year: 2005, source: 'NBC Concert', context: 'Live and off-script during Hurricane Katrina relief.' },
      { text: 'the Jon Brion turn', year: 2005, source: 'Fiona Apple producer', context: 'Brought in strings, horns, and baroque flourishes.' },
      { text: 'Gold Digger', year: 2005, source: 'Ray Charles sample', context: "Number one for ten weeks. Crossover dominance." },
      { text: 'Heard Em Say', year: 2005, source: 'Adam Levine feature', context: "Quiet single that aged into a classic." },
    ],
  },
  {
    id: 'grad', title: 'Graduation', short: 'GRAD', year: '2007',
    palette: { bg: '#FFD9EC', text: '#1B1B5C', accent: '#FFC700', glow: 'rgba(255,199,0,0.36)', soft: 'rgba(255,199,0,0.18)' },
    quotes: [
      { text: "I refuse to accept other people's ideas of happiness", year: 2007, source: 'press cycle', context: 'A core line in his self-mythology.' },
      { text: 'beat 50 Cent on September 11', year: 2007, source: 'release showdown', context: 'Graduation outsold Curtis nearly 2-to-1.' },
      { text: 'shutter shades', year: 2007, source: 'signature style', context: 'Worn everywhere on the Glow in the Dark tour.' },
      { text: 'Stronger', year: 2007, source: 'Daft Punk sample', context: 'Took French house mainstream in America.' },
    ],
  },
  {
    id: '808s', title: '808s & Heartbreak', short: '808s', year: '2008',
    palette: { bg: '#CFD3D8', text: '#0F1417', accent: '#D63333', glow: 'rgba(214,51,51,0.30)', soft: 'rgba(214,51,51,0.14)' },
    quotes: [
      { text: "Beyoncé had one of the best videos", year: 2009, source: 'VMAs', context: "The infamous Taylor Swift interruption." },
      { text: 'auto-tuned grief', year: 2008, source: 'production turn', context: 'The next decade of pop sounded like this.' },
      { text: 'Heartless', year: 2008, source: 'Hype Williams video', context: "Rotoscoped video based on American Pop." },
    ],
  },
  {
    id: 'mbdtf', title: 'My Beautiful Dark Twisted Fantasy', short: 'MBDTF', year: '2010',
    palette: { bg: '#180606', text: '#F2E4D0', accent: '#C0392B', glow: 'rgba(192,57,43,0.50)', soft: 'rgba(192,57,43,0.22)' },
    quotes: [
      { text: 'the Hawaii sessions', year: 2010, source: 'Avex Honolulu', context: 'Studio booked 24/7 with a rotating cast of stars.' },
      { text: 'Runaway', year: 2010, source: 'VMAs', context: '9-minute single, apology and celebration.' },
      { text: 'Pitchfork 10.0', year: 2010, source: 'review', context: 'First perfect score for a major rap album in years.' },
    ],
  },
  {
    id: 'tlop', title: 'The Life of Pablo', short: 'TLOP', year: '2016',
    palette: { bg: '#F26B3A', text: '#0F0A06', accent: '#FFFFFF', glow: 'rgba(255,255,255,0.45)', soft: 'rgba(255,255,255,0.22)' },
    quotes: [
      { text: 'a gospel album with a whole lot of cursing', year: 2016, source: 'Twitter', context: 'Rollout title changed three times.' },
      { text: 'Madison Square Garden listening', year: 2016, source: 'Season 3', context: 'Fashion and music presented together.' },
      { text: 'Ultralight Beam', year: 2016, source: 'Chance the Rapper', context: "The moment that redefined gospel rap." },
    ],
  },
  {
    id: 'ye', title: 'ye', short: 'YE', year: '2018',
    palette: { bg: '#3F5238', text: '#EDE7D3', accent: '#A8B584', glow: 'rgba(168,181,132,0.40)', soft: 'rgba(168,181,132,0.20)' },
    quotes: [
      { text: 'I hate being Bi-Polar its awesome', year: 2018, source: 'iPhone photo', context: 'Shot on his iPhone hours before release.' },
      { text: 'Ghost Town', year: 2018, source: '070 Shake', context: "A generation's anthem of freedom." },
    ],
  },
  {
    id: 'donda', title: 'Donda', short: 'DONDA', year: '2021',
    palette: { bg: '#0A0A0A', text: '#F5F5F5', accent: '#888888', glow: 'rgba(255,255,255,0.28)', soft: 'rgba(255,255,255,0.10)' },
    quotes: [
      { text: 'set himself on fire', year: 2021, source: 'Soldier Field', context: 'The final scene of the third event.' },
      { text: 'named for his mother', year: 2021, source: 'title', context: 'The elegy he had owed her for 14 years.' },
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
        // Z-axis parallax effect
        zIndex: b.depth,
        opacity: isPinned && isPinned.id !== b.id ? 0.05 : 1,
        // Parallax movement tied to CSS variables
        transform: `translate(calc(var(--px) * ${b.depth * 0.1}), calc(var(--py) * ${b.depth * 0.1}))`,
      }}
    >
      <div className="bubble-drift" style={{ '--drift': `${b.drift}s`, '--dx': `${b.driftDx}px`, '--dy': `${b.driftDy}px` }}>
        <span
          className={`bubble ${isLong ? 'long' : ''}`}
          style={{ 
            '--glow': album.palette.glow, 
            '--accent-soft': album.palette.soft,
            fontSize: `${14 + b.depth}px`,
            filter: `blur(${Math.abs(5 - b.depth) * 0.5}px)`
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

  useEffect(() => {
    const container = fieldRef.current;
    if (!container) return;
    const handleMove = (e) => {
      // Parallax variables
      const px = (e.clientX - window.innerWidth / 2) / 50;
      const py = (e.clientY - window.innerHeight / 2) / 50;
      container.style.setProperty('--px', `${px}px`);
      container.style.setProperty('--py', `${py}px`);
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
        depth: Math.floor(Math.random() * 10) + 1, // Depth for parallax
        drift: Math.random() * 8 + 8,
        driftDx: Math.random() * 30 - 15,
        driftDy: Math.random() * 30 - 15,
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
      <div className="grain-overlay" />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@300;400;500&display=swap');
        
        .app-container { 
          min-height: 100vh; transition: background 1s ease, color 1s ease; 
          font-family: "Instrument Serif", serif; position: relative; overflow: hidden; 
        }

        .grain-overlay {
          position: fixed; inset: 0; pointer-events: none; opacity: 0.04; z-index: 50;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }

        .bubble-wrap { position: absolute; will-change: transform; transition: opacity 0.6s ease; }
        .bubble { 
          display: inline-block; padding: 0.6em 1.2em; border-radius: 999px; 
          cursor: pointer; transition: all 0.4s cubic-bezier(0.2, 0, 0.2, 1); 
          background: transparent; color: inherit; white-space: nowrap;
        }

        .bubble:hover { 
          transform: scale(1.3) !important; 
          background-color: var(--accent-soft) !important; 
          box-shadow: 0 15px 35px var(--glow); 
          filter: blur(0px) !important;
          z-index: 100;
        }

        .bubble.long { white-space: normal; max-width: 200px; text-align: center; }

        @keyframes drift { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(var(--dx), var(--dy)); } }
        .bubble-drift { animation: drift var(--drift) ease-in-out infinite; }

        .dim { opacity: 0.02 !important; pointer-events: none; filter: blur(4px); }

        .filter-pill { 
          font-family: 'JetBrains Mono', monospace; font-size: 10px; padding: 6px 14px; 
          border-radius: 999px; border: 1px solid currentColor; background: transparent; 
          cursor: pointer; opacity: 0.4; transition: all 0.3s; margin-right: 8px;
        }
        .filter-pill.active { opacity: 1; background: currentColor; color: var(--bg); }

        .overlay { 
          position: fixed; inset: 0; background: rgba(0,0,0,0.4); 
          backdrop-filter: blur(15px); display: flex; align-items: center; justify-content: center; z-index: 200; 
        }

        .card { 
          background: white; padding: 50px; max-width: 500px; width: 90%; 
          border-radius: 2px; position: relative; box-shadow: 0 40px 100px rgba(0,0,0,0.2); 
        }
      `}</style>

      <header style={{ padding: '50px', position: 'relative', zIndex: 60 }}>
        <h1 style={{ fontSize: 'clamp(3rem, 10vw, 5rem)', margin: 0, letterSpacing: '-0.04em', lineHeight: 0.9 }}>
          ye <span style={{ opacity: 0.2, fontStyle: 'italic' }}>/ archives</span>
        </h1>
        <nav style={{ marginTop: '30px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          <button className={`filter-pill ${!activeAlbumId ? 'active' : ''}`} onClick={() => setActiveAlbumId(null)}>All</button>
          {ALBUMS.map(a => (
            <button key={a.id} className={`filter-pill ${activeAlbumId === a.id ? 'active' : ''}`} onClick={() => setActiveAlbumId(a.id)}>{a.short}</button>
          ))}
        </nav>
      </header>

      <main ref={fieldRef} style={{ height: '70vh', position: 'relative', perspective: '1000px' }}>
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
            <p style={{ fontSize: '11px', opacity: 0.5, textTransform: 'uppercase', marginBottom: '20px', letterSpacing: '0.1em' }}>{pinnedQuote.year} — {pinnedQuote.source}</p>
            <h2 style={{ fontSize: '2.5rem', fontStyle: 'italic', margin: '0 0 25px 0', lineHeight: 1.1 }}>"{pinnedQuote.text}"</h2>
            <p style={{ lineHeight: '1.7', opacity: 0.8, fontSize: '1.1rem' }}>{pinnedQuote.context}</p>
            <button onClick={() => setPinnedQuote(null)} style={{ position: 'absolute', top: 25, right: 25, background: 'none', border: 'none', cursor: 'pointer', fontSize: '28px', color: 'inherit', opacity: 0.5 }}>✕</button>
          </div>
        </div>
      )}
    </div>
  );
}
