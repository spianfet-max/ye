import React, { useState, useMemo, useEffect, useRef } from 'react';

// =================================================================
// THE DUAL-CORE DATA (Archive + Quant Metrics)
// =================================================================
const ALBUMS = [
  {
    id: 'tcd', title: 'The College Dropout', short: 'TCD', year: '2004',
    metrics: { ego: 65, liquidity: 40, volatility: 22, alpha: 'High' },
    palette: { bg: '#E8DCC4', text: '#3A2817', accent: '#B8860B', glow: 'rgba(184,134,11,0.22)', soft: 'rgba(184,134,11,0.12)' },
    quotes: [
      { text: "I'm doing pretty good as far as geniuses go", year: 2004, type: 'QUOTE', source: 'Time Magazine', context: 'His first major cover. Spent years proving he was more than just a producer.' },
      { text: 'the wired-jaw album', year: 2003, type: 'HISTORY', source: 'Car Crash', context: 'Recorded "Through the Wire" with a jaw wired shut.' },
      { text: 'chipmunk soul', year: 2004, type: 'PRODUCTION', source: 'Signature', context: 'High-pitch vocal sampling technique.' },
      { text: 'the dropout bear', year: 2004, type: 'ICON', source: 'Mascot', context: 'The defining symbol of the "outsider" in 2000s rap.' },
    ],
  },
  {
    id: '808s', title: '808s & Heartbreak', short: '808s', year: '2008',
    metrics: { ego: 30, liquidity: 85, volatility: 92, alpha: 'Extreme' },
    palette: { bg: '#CFD3D8', text: '#0F1417', accent: '#D63333', glow: 'rgba(214,51,51,0.30)', soft: 'rgba(214,51,51,0.14)' },
    quotes: [
      { text: 'Auto-Tune as an instrument', year: 2008, type: 'TECH', source: 'Distortion', context: 'Used it to convey brokenness rather than pitch-perfection.' },
      { text: 'Sad-Boy Legacy', year: 2008, type: 'INFLUENCE', source: 'Drake/Weeknd', context: 'Birthed the melodic, vulnerable rap genre.' },
    ],
  },
  {
    id: 'yeezus', title: 'Yeezus', short: 'YZ', year: '2013',
    metrics: { ego: 98, liquidity: 12, volatility: 88, alpha: 'Aggressive' },
    palette: { bg: '#F4F4F2', text: '#0A0A0A', accent: '#E11D1D', glow: 'rgba(225,29,29,0.36)', soft: 'rgba(225,29,29,0.16)' },
    quotes: [
      { text: 'I am Warhol. I am Shakespeare.', year: 2013, type: 'QUOTE', source: 'Zane Lowe', context: 'The era of breaking the glass ceiling of fashion.' },
      { text: 'Industrial Noise', year: 2013, type: 'SOUND', source: 'Daft Punk', context: 'Influenced by Chicago Drill and Acid House.' },
    ],
  }
  // ... (Full data list continues)
];

const TERMINAL_PALETTE = { bg: '#0A0A0B', text: '#00FF41', accent: '#FF5F00', glow: 'rgba(0, 255, 65, 0.2)' };

// =================================================================
// COMPONENTS
// =================================================================

const Bubble = React.memo(({ b, album, isFilteredOut, viewMode, onPin }) => {
  const isLong = b.text.length > 25;
  return (
    <div
      className={`bubble-wrap ${isFilteredOut ? 'dim' : ''} view-${viewMode}`}
      style={{
        left: `${b.x}%`,
        top: `${b.y}%`,
        zIndex: b.depth,
        transform: `translate(calc(var(--px) * ${b.depth * 0.1}), calc(var(--py) * ${b.depth * 0.1}))`,
      }}
    >
      <div className="bubble-drift" style={{ '--drift': `${b.drift}s`, '--dx': `${b.driftDx}px`, '--dy': `${b.driftDy}px` }}>
        <span
          className={`bubble ${isLong ? 'long' : ''}`}
          style={{ 
            '--glow': viewMode === 'quant' ? TERMINAL_PALETTE.glow : album.palette.glow, 
            '--bg-hover': viewMode === 'quant' ? 'rgba(0,255,65,0.1)' : album.palette.soft 
          }}
          onClick={() => onPin(b)}
        >
          {viewMode === 'quant' ? `[TRD_${album.short.toUpperCase()}] ${b.text}` : b.text}
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

  useEffect(() => {
    const container = fieldRef.current;
    const onMove = (e) => {
      container.style.setProperty('--mx', `${e.clientX}px`);
      container.style.setProperty('--my', `${e.clientY}px`);
      container.style.setProperty('--px', `${(e.clientX - window.innerWidth/2)/50}px`);
      container.style.setProperty('--py', `${(e.clientY - window.innerHeight/2)/50}px`);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const bubbles = useMemo(() => {
    const items = [];
    ALBUMS.forEach(a => a.quotes.forEach((q, i) => items.push({
      id: `${a.id}-${i}`, albumId: a.id, x: Math.random()*80+10, y: Math.random()*80+10,
      depth: Math.floor(Math.random()*10)+1, drift: Math.random()*5+10,
      driftDx: Math.random()*30-15, driftDy: Math.random()*30-15, ...q
    })));
    return items;
  }, []);

  const album = ALBUMS.find(a => a.id === (pinnedQuote?.albumId || activeAlbumId));
  const currentPalette = viewMode === 'quant' ? TERMINAL_PALETTE : (album?.palette || { bg: '#F4F0E8', text: '#1A1A1A' });

  return (
    <div className={`app-root mode-${viewMode}`} style={{ background: currentPalette.bg, color: currentPalette.text }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@300;400;500&display=swap');
        
        .app-root { min-height: 100vh; transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1); overflow: hidden; position: relative; }
        
        /* MODE TOGGLE */
        .mode-switcher {
          position: fixed; top: 40px; right: 40px; z-index: 1000;
          font-family: 'JetBrains Mono', monospace; font-size: 10px;
          padding: 8px 16px; border: 1px solid currentColor; border-radius: 2px;
          cursor: pointer; background: transparent; color: inherit;
        }

        .mode-quant .bubble { font-family: 'JetBrains Mono', monospace; font-style: normal; border-radius: 0; border: 1px solid rgba(0,255,65,0.3); font-size: 11px !important; }
        .mode-quant .app-root { background: #0A0A0B !important; color: #00FF41 !important; }
        
        .bubble-wrap { position: absolute; will-change: transform; transition: opacity 0.5s ease; }
        .bubble { display: inline-block; padding: 8px 16px; cursor: pointer; transition: all 0.3s ease; }
        .bubble:hover { transform: scale(1.2); background: var(--bg-hover); box-shadow: 0 10px 30px var(--glow); }
        
        @keyframes drift { 0%, 100% { transform: translate(0,0); } 50% { transform: translate(var(--dx), var(--dy)); } }
        .bubble-drift { animation: drift var(--drift) ease-in-out infinite; }
        .dim { opacity: 0.05 !important; filter: blur(4px); pointer-events: none; }

        .ticker-wrap {
          position: fixed; bottom: 0; width: 100%; background: rgba(0,255,65,0.1);
          font-family: 'JetBrains Mono', monospace; font-size: 10px; padding: 5px;
          white-space: nowrap; overflow: hidden; border-top: 1px solid #00FF41;
          display: ${viewMode === 'quant' ? 'block' : 'none'};
        }
      `}</style>

      <button className="mode-switcher" onClick={() => setViewMode(viewMode === 'archive' ? 'quant' : 'archive')}>
        {viewMode === 'archive' ? 'SWITCH TO QUANT TERMINAL' : 'EXIT TO ARCHIVE'}
      </button>

      <header style={{ padding: '40px', position: 'relative', zIndex: 10 }}>
        <h1 style={{ fontSize: viewMode === 'quant' ? '2rem' : '4rem', margin: 0 }}>
          {viewMode === 'quant' ? '> TERMINAL_YE_PROTOCL' : 'ye / archives'}
        </h1>
      </header>

      <main ref={fieldRef} style={{ height: '70vh', position: 'relative' }}>
        {bubbles.map(b => (
          <Bubble 
            key={b.id} b={b} viewMode={viewMode}
            album={ALBUMS.find(a => a.id === b.albumId)}
            isFilteredOut={activeAlbumId && activeAlbumId !== b.albumId}
            onPin={setPinnedQuote}
          />
        ))}
      </main>

      <div className="ticker-wrap">
        EGO_INDEX: STABLE // VOLATILITY_YZ: +88% // ALPHA_808s: EXTREME_LIQUIDITY // BRAND_DEBT: 53.0M_RESOLVED //
      </div>
    </div>
  );
}