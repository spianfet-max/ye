import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';

// =================================================================
// ARCHIVE DATA (Truncated for brevity, keep your original ALBUMS array here)
// =================================================================
const ALBUMS = [ /* Keep your full ALBUMS array from the original file here */ ];

const DEFAULT_PALETTE = { bg: '#F4F0E8', text: '#1A1A1A', accent: '#888', glow: 'rgba(0,0,0,0.1)', soft: 'rgba(0,0,0,0.05)' };

// Performance optimization: Memoized individual bubble
const Bubble = React.memo(({ b, album, isFilteredOut, isPinned, onPin }) => {
  const isLong = b.text.length > 28;
  const baseSize = isLong ? 18 : b.text.length < 14 ? 26 : 22;

  return (
    <div
      className={`bubble-wrap ${isFilteredOut ? 'dim' : ''}`}
      style={{
        left: `${b.x}%`,
        top: `${b.y}%`,
        opacity: isPinned && isPinned.id !== b.id ? 0.15 : 1,
        zIndex: isPinned && isPinned.id === b.id ? 10 : 2,
      }}
    >
      <div 
        className="bubble-drift" 
        style={{ '--drift': `${b.drift}s`, '--delay': `${b.delay}s`, '--dx': `${b.driftDx}px`, '--dy': `${b.driftDy}px` }}
      >
        <span
          className={`bubble ${isLong ? 'long' : ''}`}
          style={{
            fontSize: baseSize,
            background: 'transparent',
            color: 'inherit',
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

  // Mouse Tracking using CSS Variables (High Performance)
  useEffect(() => {
    const container = fieldRef.current;
    if (!container) return;

    const handleMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      container.style.setProperty('--mx', `${x}px`);
      container.style.setProperty('--my', `${y}px`);
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  // Bubble Distribution Logic (Same as your original, but memoized)
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
        
        :root { --mx: -1000px; --my: -1000px; }
        
        .app-container {
          min-height: 100vh;
          transition: background-color 800ms ease, color 800ms ease;
          font-family: "Instrument Serif", serif;
          position: relative;
          overflow: hidden;
        }

        .bubble-wrap {
          position: absolute;
          will-change: transform;
          transition: opacity 500ms ease;
        }

        /* Magnetism via CSS Variables */
        .bubble {
          display: inline-block;
          padding: 0.5em 0.95em;
          border-radius: 999px;
          font-style: italic;
          cursor: pointer;
          transition: transform 0.2s ease-out, background-color 0.4s ease;
        }

        .bubble:hover {
          transform: scale(1.2);
          background-color: var(--accent-soft) !important;
        }

        @keyframes drift {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(var(--dx), var(--dy)); }
        }

        .bubble-drift {
          animation: drift var(--drift) ease-in-out infinite;
          animation-delay: var(--delay);
        }

        .filter-pill {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          padding: 6px 12px;
          border-radius: 999px;
          border: 1px solid currentColor;
          background: transparent;
          cursor: pointer;
          opacity: 0.5;
          transition: all 0.3s ease;
        }

        .filter-pill.active { opacity: 1; background: currentColor; color: var(--bg); }
      `}</style>

      <header style={{ padding: '40px' }}>
        <h1 style={{ fontSize: '3rem', margin: 0 }}>ye / across eras</h1>
        <nav style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
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

      <main ref={fieldRef} style={{ height: '70vh', position: 'relative' }}>
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
    </div>
  );
}