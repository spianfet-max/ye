import React, { useState, useMemo, useEffect, useRef } from 'react';

// =================================================================
// THE COMPLETE VAULT - ALL 10 ERAS + QUANT METRICS
// =================================================================
const ALBUMS = [
  {
    id: 'tcd', title: 'The College Dropout', short: 'TCD', year: '2004',
    metrics: { ego: 65, liquidity: 42, volatility: 18, alpha: 'Steady' },
    palette: { bg: '#E8DCC4', text: '#3A2817', accent: '#B8860B', glow: 'rgba(184,134,11,0.22)', soft: 'rgba(184,134,11,0.12)' },
    quotes: [
      { text: "I'm doing pretty good as far as geniuses go", year: 2004, type: 'QUOTE', source: 'Time Magazine', context: 'His first major cover. He spent years proving he was more than just a producer.' },
      { text: 'the wired-jaw album', year: 2003, type: 'HISTORY', source: 'Car Crash', context: 'Recorded "Through the Wire" two weeks after a near-fatal crash.' },
      { text: 'chipmunk soul', year: 2004, type: 'PRODUCTION', source: 'Signature', context: 'High-pitch vocal sampling technique.' },
      { text: 'the dropout bear', year: 2004, type: 'ICON', source: 'Mascot', context: 'The defining symbol of the "outsider" in 2000s rap.' },
      { text: 'Jesus Walks', year: 2004, type: 'CULTURE', source: 'Triple Video', context: 'Funded three videos to ensure the message reached everyone.' },
    ],
  },
  {
    id: 'lr', title: 'Late Registration', short: 'LR', year: '2005',
    metrics: { ego: 70, liquidity: 55, volatility: 25, alpha: 'Stable' },
    palette: { bg: '#FAF6E8', text: '#0F1B3D', accent: '#C9A961', glow: 'rgba(201,169,97,0.28)', soft: 'rgba(201,169,97,0.14)' },
    quotes: [
      { text: "George Bush doesn't care about black people", year: 2005, type: 'EVENT', source: 'NBC Live', context: 'Unscripted moment during Hurricane Katrina relief.' },
      { text: 'the Jon Brion collaboration', year: 2005, type: 'PRODUCTION', source: 'Orchestral', context: 'Brought harps and celestas into hip-hop.' },
      { text: 'Gold Digger dominance', year: 2005, type: 'BUSINESS', source: 'Charts', context: 'Sampled Ray Charles; stayed at #1 for 10 weeks.' },
    ],
  },
  {
    id: 'grad', title: 'Graduation', short: 'GRAD', year: '2007',
    metrics: { ego: 85, liquidity: 72, volatility: 40, alpha: 'Bullish' },
    palette: { bg: '#FFD9EC', text: '#1B1B5C', accent: '#FFC700', glow: 'rgba(255,199,0,0.36)', soft: 'rgba(255,199,0,0.18)' },
    quotes: [
      { text: 'The 50 Cent Showdown', year: 2007, type: 'MARKETING', source: 'Sept 11', context: 'Signaled the end of Gangsta Rap dominance.' },
      { text: 'Murakami Cover', year: 2007, type: 'ART', source: 'Superflat', context: 'Collaborated with Takashi Murakami for the bear\'s rebirth.' },
      { text: 'Stronger / Daft Punk', year: 2007, type: 'PRODUCTION', source: 'French House', context: 'Took French house mainstream in America.' },
    ],
  },
  {
    id: '808s', title: '808s & Heartbreak', short: '808s', year: '2008',
    metrics: { ego: 35, liquidity: 88, volatility: 94, alpha: 'High Risk' },
    palette: { bg: '#CFD3D8', text: '#0F1417', accent: '#D63333', glow: 'rgba(214,51,51,0.30)', soft: 'rgba(214,51,51,0.14)' },
    quotes: [
      { text: 'The VMA Incident', year: 2009, type: 'EVENT', source: 'MTV', context: 'The Taylor Swift interruption that changed his career.' },
      { text: 'Auto-Tune as an instrument', year: 2008, type: 'TECH', source: 'Distortion', context: 'Used to convey brokenness rather than perfection.' },
      { text: 'Sad-Boy Legacy', year: 2008, type: 'INFLUENCE', source: 'Drake', context: 'Birthed the melodic, vulnerable rap genre.' },
    ],
  },
  {
    id: 'mbdtf', title: 'My Beautiful Dark Twisted Fantasy', short: 'MBDTF', year: '2010',
    metrics: { ego: 95, liquidity: 90, volatility: 60, alpha: 'Maximal' },
    palette: { bg: '#180606', text: '#F2E4D0', accent: '#C0392B', glow: 'rgba(192,57,43,0.50)', soft: 'rgba(192,57,43,0.22)' },
    quotes: [
      { text: 'The Hawaii "Rap Camp"', year: 2010, type: 'HISTORY', source: 'Studio', context: 'Artists followed strict rules and a black-tie dress code.' },
      { text: 'Pitchfork 10.0', year: 2010, type: 'RECEPTION', source: 'Review', context: 'First perfect score for a major rap album in years.' },
      { text: 'Runaway Film', year: 2010, type: 'ART', source: 'Cinema', context: 'A 34-minute film metaphor for his fall from grace.' },
    ],
  },
  {
    id: 'yeezus', title: 'Yeezus', short: 'YZ', year: '2013',
    metrics: { ego: 99, liquidity: 20, volatility: 98, alpha: 'Aggressive' },
    palette: { bg: '#F4F4F2', text: '#0A0A0A', accent: '#E11D1D', glow: 'rgba(225,29,29,0.36)', soft: 'rgba(225,29,29,0.16)' },
    quotes: [
      { text: 'I am Warhol. I am Shakespeare.', year: 2013, type: 'QUOTE', source: 'Zane Lowe', context: 'Breaking the glass ceiling of the fashion industry.' },
      { text: 'Industrial Noise', year: 2013, type: 'SOUND', source: 'Daft Punk', context: 'Influenced by Chicago Drill and Acid House.' },
      { text: 'No Cover Art', year: 2013, type: 'DESIGN', source: 'Clear Case', context: 'Minimalism as subtraction, not restraint.' },
    ],
  },
  {
    id: 'tlop', title: 'The Life of Pablo', short: 'TLOP', year: '2016',
    metrics: { ego: 88, liquidity: 75, volatility: 80, alpha: 'Volatile' },
    palette: { bg: '#F26B3A', text: '#0F0A06', accent: '#FFFFFF', glow: 'rgba(255,255,255,0.45)', soft: 'rgba(255,255,255,0.22)' },
    quotes: [
      { text: 'A "Living" Document', year: 2016, type: 'TECH', source: 'Streaming', context: 'Updated the album on Tidal for months after release.' },
      { text: 'The MSG Premiere', year: 2016, type: 'EVENT', source: 'MSG', context: 'Rented out MSG for a fashion/music debut.' },
      { text: 'Which One?', year: 2016, type: 'ICON', source: 'Cover', context: 'References Picasso, Escobar, and Apostle Paul.' },
    ],
  },
  {
    id: 'ye', title: 'ye', short: 'YE', year: '2018',
    metrics: { ego: 50, liquidity: 60, volatility: 70, alpha: 'Muted' },
    palette: { bg: '#3F5238', text: '#EDE7D3', accent: '#A8B584', glow: 'rgba(168,181,132,0.40)', soft: 'rgba(168,181,132,0.20)' },
    quotes: [
      { text: 'I hate being Bi-Polar its awesome', year: 2018, type: 'PERSONAL', source: 'iPhone', context: 'Shot the cover on his phone hours before release.' },
      { text: 'The Wyoming Sessions', year: 2018, type: 'HISTORY', source: 'Jackson Hole', context: 'Produced five 7-track albums in five weeks.' },
      { text: 'Ghost Town', year: 2018, type: 'SOUND', source: '070 Shake', context: 'An anthem about feeling "free" and overcoming numbness.' },
    ],
  },
  {
    id: 'jik', title: 'Jesus Is King', short: 'JIK', year: '2019',
    metrics: { ego: 20, liquidity: 40, volatility: 50, alpha: 'Pivot' },
    palette: { bg: '#4FA3DA', text: '#FFFFFF', accent: '#FFFFFF', glow: 'rgba(255,255,255,0.65)', soft: 'rgba(255,255,255,0.30)' },
    quotes: [
      { text: 'Sunday Service', year: 2019, type: 'CULTURE', source: 'Choir', context: 'A weekly worship service re-imagining his hits.' },
      { text: 'No More Secular Music', year: 2019, type: 'PERSONAL', source: 'Faith', context: 'Declared he would only make Christian music.' },
    ],
  },
  {
    id: 'donda', title: 'Donda', short: 'DONDA', year: '2021',
    metrics: { ego: 40, liquidity: 95, volatility: 85, alpha: 'Scale' },
    palette: { bg: '#0A0A0A', text: '#F5F5F5', accent: '#888888', glow: 'rgba(255,255,255,0.28)', soft: 'rgba(255,255,255,0.10)' },
    quotes: [
      { text: 'Living at the Stadium', year: 2021, type: 'HISTORY', source: 'Atlanta', context: 'Moved into a locker room for weeks to finish.' },
      { text: 'The Soldier Field Fire', year: 2021, type: 'EVENT', source: 'Performance', context: 'Set himself on fire inside a replica of his home.' },
      { text: 'The Stem Player', year: 2021, type: 'TECH', source: 'Hardware', context: 'Device allowing users to remix stems in real-time.' },
    ],
  }
];

const TERMINAL_PALETTE = { bg: '#0A0A0B', text: '#00FF41', accent: '#FF5F00', glow: 'rgba(0, 255, 65, 0.2)' };

// =================================================================
// COMPONENTS
// =================================================================

const Bubble = React.memo(({ b, album, isFilteredOut, viewMode, isPinned, onPin }) => {
  const isLong = b.text.length > 25;
  const isDim = (isFilteredOut) || (isPinned && isPinned.id !== b.id);

  return (
    <div
      className={`bubble-wrap ${isDim ? 'dim' : ''}`}
      style={{
        left: `${b.x}%`,
        top: `${b.y}%`,
        zIndex: b.depth,
        transform: `translate(calc(var(--px) * ${b.depth * 0.15}), calc(var(--py) * ${b.depth * 0.15}))`,
      }}
    >
      <div className="bubble-drift" style={{ '--drift': `${b.drift}s`, '--dx': `${b.driftDx}px`, '--dy': `${b.driftDy}px` }}>
        <span
          className={`bubble ${isLong ? 'long' : ''} ${viewMode === 'quant' ? 'quant-style' : ''}`}
          style={{ 
            '--glow': viewMode === 'quant' ? TERMINAL_PALETTE.glow : album.palette.glow, 
            '--bg-hover': viewMode === 'quant' ? 'rgba(0,255,65,0.1)' : album.palette.soft,
            fontSize: viewMode === 'quant' ? '11px' : `${13 + b.depth}px`,
          }}
          onClick={() => onPin(b)}
        >
          {viewMode === 'quant' ? `> [DATA_${album.short}] ${b.text.toUpperCase()}` : b.text}
        </span>
      </div>
    </div>
  );
});

export default function App() {
  const [viewMode, setViewMode] = useState('archive'); // 'archive' or 'quant'
  const [activeAlbumId, setActiveAlbumId] = useState(null);
  const [pinnedQuote, setPinnedQuote] = useState(null);
  const fieldRef = useRef(null);

  // Parallax + High Performance Cursor Tracking
  useEffect(() => {
    const container = fieldRef.current;
    if (!container) return;
    const handleMove = (e) => {
      container.style.setProperty('--px', `${(e.clientX - window.innerWidth / 2) / 40}px`);
      container.style.setProperty('--py', `${(e.clientY - window.innerHeight / 2) / 40}px`);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  const allBubbles = useMemo(() => {
    const items = [];
    ALBUMS.forEach(a => a.quotes.forEach((q, i) =>
      items.push({ 
        id: `${a.id}-${i}`, albumId: a.id, 
        x: Math.random() * 80 + 10, y: Math.random() * 80 + 10,
        depth: Math.floor(Math.random() * 10) + 1,
        drift: Math.random() * 8 + 8, driftDx: Math.random() * 30 - 15, driftDy: Math.random() * 30 - 15,
        ...q 
      })
    ));
    return items;
  }, []);

  const paletteSource = pinnedQuote ? ALBUMS.find(a => a.id === pinnedQuote.albumId) : 
                        activeAlbumId ? ALBUMS.find(a => a.id === activeAlbumId) : null;
  const palette = viewMode === 'quant' ? TERMINAL_PALETTE : (paletteSource?.palette || { bg: '#F4F0E8', text: '#1A1A1A' });

  return (
    <div className={`app-container view-${viewMode}`} style={{ background: palette.bg, color: palette.text }}>
      <div className="grain" />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@300;400;500&display=swap');
        
        .app-container { min-height: 100vh; transition: all 0.8s cubic-bezier(0.2, 0, 0.2, 1); position: relative; overflow: hidden; }
        .grain { position: fixed; inset: 0; pointer-events: none; opacity: 0.04; z-index: 50; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }
        
        .mode-switch {
          position: fixed; top: 40px; right: 40px; z-index: 1000;
          font-family: 'JetBrains Mono', monospace; font-size: 10px;
          padding: 8px 16px; border: 1px solid currentColor; cursor: pointer;
          background: transparent; color: inherit; letter-spacing: 0.1em;
          transition: all 0.3s ease;
        }
        .mode-switch:hover { background: currentColor; color: ${palette.bg}; }

        .bubble-wrap { position: absolute; will-change: transform; transition: opacity 0.5s ease; }
        .bubble { 
          display: inline-block; padding: 0.6em 1.2em; border-radius: 999px; 
          font-family: "Instrument Serif", serif; font-style: italic;
          cursor: pointer; transition: all 0.4s ease; 
        }
        .bubble:hover { transform: scale(1.2); background: var(--bg-hover); box-shadow: 0 10px 30px var(--glow); }
        .bubble.long { white-space: normal; max-width: 180px; text-align: center; }

        .quant-style { font-family: 'JetBrains Mono', monospace !important; font-style: normal !important; border-radius: 2px !important; border: 1px solid rgba(0,255,65,0.2); font-weight: 400; }

        @keyframes drift { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(var(--dx), var(--dy)); } }
        .bubble-drift { animation: drift var(--drift) ease-in-out infinite; }

        .dim { opacity: 0.03 !important; filter: blur(4px); pointer-events: none; }

        .filter-pill { 
          font-family: 'JetBrains Mono', monospace; font-size: 10px; padding: 6px 14px; 
          border-radius: 999px; border: 1px solid currentColor; background: transparent; 
          cursor: pointer; opacity: 0.4; margin-right: 8px; transition: all 0.3s;
        }
        .filter-pill.active { opacity: 1; background: currentColor; color: ${palette.bg}; }

        .overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); backdrop-filter: blur(15px); display: flex; align-items: center; justify-content: center; z-index: 200; }
        .card { background: white; padding: 50px; max-width: 500px; width: 90%; border-radius: 2px; position: relative; }
        
        .ticker {
          position: fixed; bottom: 0; width: 100%; font-family: 'JetBrains Mono', monospace;
          font-size: 10px; padding: 8px; border-top: 1px solid currentColor;
          background: rgba(0,0,0,0.05); white-space: nowrap; overflow: hidden;
          display: ${viewMode === 'quant' ? 'block' : 'none'};
        }
      `}</style>

      <button className="mode-switch" onClick={() => {
        setViewMode(viewMode === 'archive' ? 'quant' : 'archive');
        setPinnedQuote(null);
      }}>
        {viewMode === 'archive' ? '[ ACCESS TERMINAL ]' : '[ EXIT TO ARCHIVE ]'}
      </button>

      <header style={{ padding: '50px', position: 'relative', zIndex: 60 }}>
        <h1 style={{ 
          fontSize: 'clamp(2.5rem, 8vw, 5rem)', margin: 0, 
          fontFamily: viewMode === 'quant' ? 'JetBrains Mono' : 'Instrument Serif',
          letterSpacing: viewMode === 'quant' ? '0.05em' : '-0.03em'
        }}>
          {viewMode === 'quant' ? '> SYS.ARCHIVE.YE' : 'ye / archives'}
        </h1>
        <nav style={{ marginTop: '24px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          <button className={`filter-pill ${!activeAlbumId ? 'active' : ''}`} onClick={() => setActiveAlbumId(null)}>All</button>
          {ALBUMS.map(a => (
            <button key={a.id} className={`filter-pill ${activeAlbumId === a.id ? 'active' : ''}`} onClick={() => setActiveAlbumId(a.id)}>{a.short}</button>
          ))}
        </nav>
      </header>

      <main ref={fieldRef} style={{ height: '70vh', position: 'relative', perspective: '1000px' }}>
        {allBubbles.map(b => (
          <Bubble 
            key={b.id} b={b} viewMode={viewMode} album={ALBUMS.find(a => a.id === b.albumId)}
            isFilteredOut={activeAlbumId && activeAlbumId !== b.albumId}
            isPinned={pinnedQuote} onPin={setPinnedQuote}
          />
        ))}
      </main>

      {pinnedQuote && (
        <div className="overlay" onClick={() => setPinnedQuote(null)}>
          <div className="card" style={{ background: palette.bg, color: palette.text }} onClick={e => e.stopPropagation()}>
            <p style={{ fontSize: '10px', fontFamily: 'JetBrains Mono', opacity: 0.5, marginBottom: '20px' }}>
              {viewMode === 'quant' ? `REF_ID: ${pinnedQuote.id} // ` : ''}{pinnedQuote.year} · {pinnedQuote.source}
            </p>
            <h2 style={{ 
              fontSize: '2.2rem', fontStyle: viewMode === 'quant' ? 'normal' : 'italic', 
              fontFamily: viewMode === 'quant' ? 'JetBrains Mono' : 'Instrument Serif',
              margin: '0 0 20px 0', lineHeight: 1.1 
            }}>
              "{pinnedQuote.text}"
            </h2>
            <p style={{ lineHeight: '1.6', opacity: 0.8 }}>{pinnedQuote.context}</p>
            {viewMode === 'quant' && ALBUMS.find(a => a.id === pinnedQuote.albumId).metrics && (
               <div style={{ marginTop: '30px', borderTop: '1px solid currentColor', paddingTop: '20px', fontFamily: 'JetBrains Mono', fontSize: '11px' }}>
                  METRICS: EGO_{ALBUMS.find(a => a.id === pinnedQuote.albumId).metrics.ego}% // 
                  VOL_{ALBUMS.find(a => a.id === pinnedQuote.albumId).metrics.volatility}% // 
                  LIQ_{ALBUMS.find(a => a.id === pinnedQuote.albumId).metrics.liquidity}%
               </div>
            )}
            <button onClick={() => setPinnedQuote(null)} style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}>✕</button>
          </div>
        </div>
      )}

      <div className="ticker">
        ALPHA_SIGNAL: {activeAlbumId || 'SYSTEM_STABLE'} // RUNTIME: 2004-2021 // DATA_POINTS: {allBubbles.length} // SECTOR: {viewMode.toUpperCase()} // STATUS: ONLINE
      </div>
    </div>
  );
}
