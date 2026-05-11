import React, { useState, useMemo, useEffect, useRef } from 'react';

// =================================================================
// THE COMPLETE ARCHIVE - 11 ERAS (INCLUDING BULLY)
// =================================================================
const ALBUMS = [
  {
    id: 'tcd', title: 'The College Dropout', short: 'TCD', year: '2004',
    palette: { bg: '#E8DCC4', text: '#3A2817', accent: '#B8860B', glow: 'rgba(184,134,11,0.22)', soft: 'rgba(184,134,11,0.12)' },
    icon: '🐻', // Representative icon for the "Ghost" background
    quotes: [
      { text: "I'm doing pretty good as far as geniuses go", year: 2004, source: 'Time Magazine', context: 'His first major cover. He spent years proving he was more than just a "producer who raps."' },
      { text: 'the wired-jaw album', year: 2003, source: 'Car Crash', context: 'Recorded "Through the Wire" two weeks after a near-fatal crash, rapping through a jaw wired shut.' },
      { text: 'chipmunk soul', year: 2004, source: 'Production', context: 'The technique of speeding up classic soul vocal samples to a high pitch.' },
      { text: 'the dropout bear', year: 2004, source: 'Mascot', context: 'A random find at a school photoshoot that became a global brand icon.' },
      { text: 'Jesus Walks', year: 2004, source: 'Culture', context: 'Kanye funded three separate music videos to ensure the message reached different audiences.' },
      { text: 'backpack rap crossover', year: 2004, source: 'Fashion', context: 'He broke the gangsta-rap dress code by popularizing pink polos and Louis Vuitton backpacks.' },
    ],
  },
  {
    id: 'lr', title: 'Late Registration', short: 'LR', year: '2005',
    palette: { bg: '#FAF6E8', text: '#0F1B3D', accent: '#C9A961', glow: 'rgba(201,169,97,0.28)', soft: 'rgba(201,169,97,0.14)' },
    icon: '🏛️',
    quotes: [
      { text: "George Bush doesn't care about black people", year: 2005, source: 'NBC Live', context: 'An unscripted moment during a Hurricane Katrina benefit concert.' },
      { text: 'the Jon Brion collaboration', year: 2005, source: 'Orchestral', context: 'Brion brought harps, celestas, and horns into hip-hop beats.' },
      { text: 'Diamonds from Sierra Leone', year: 2005, source: 'Global Issues', context: 'A hit single that tackled the ethics of the diamond trade.' },
      { text: 'Gold Digger', year: 2005, source: 'Charts', context: 'Sampled Ray Charles; it stayed at #1 for ten weeks.' },
      { text: 'Touch the Sky', year: 2005, source: 'Evel Knievel', context: 'The $1M video led to a lawsuit from the real-life daredevil.' },
    ],
  },
  {
    id: 'grad', title: 'Graduation', short: 'GRAD', year: '2007',
    palette: { bg: '#FFD9EC', text: '#1B1B5C', accent: '#FFC700', glow: 'rgba(255,199,0,0.36)', soft: 'rgba(255,199,0,0.18)' },
    icon: '🎓',
    quotes: [
      { text: 'The 50 Cent Showdown', year: 2007, source: 'Sept 11', context: 'A sales battle that signaled the end of Gangsta Rap dominance.' },
      { text: 'Stronger / Daft Punk', year: 2007, source: 'French House', context: 'Took French house mainstream in America.' },
      { text: 'Murakami Cover', year: 2007, source: 'Art', context: 'Collaborated with Takashi Murakami for the bear\'s psychedelic rebirth.' },
      { text: 'Shutter Shades', year: 2007, source: 'Fashion', context: 'The lens-less glasses that defined the "electro-hop" era.' },
      { text: 'Flashing Lights', year: 2007, source: 'Sound', context: 'A pivot from soul samples to arena-sized synthesizers.' },
    ],
  },
  {
    id: '808s', title: '808s & Heartbreak', short: '808s', year: '2008',
    palette: { bg: '#CFD3D8', text: '#0F1417', accent: '#D63333', glow: 'rgba(214,51,51,0.30)', soft: 'rgba(214,51,51,0.14)' },
    icon: '💔',
    quotes: [
      { text: 'The VMA Incident', year: 2009, source: 'MTV', context: 'Interrupted Taylor Swift; the backlash drove him into a Hawaii exile.' },
      { text: 'TR-808 Minimalism', year: 2008, source: 'Production', context: 'Used the machine to create a cold, mechanical, lonely atmosphere.' },
      { text: 'Auto-Tune as an instrument', year: 2008, source: 'Tech', context: 'Used it to convey brokenness rather than pitch-perfection.' },
      { text: 'Sad-Boy Legacy', year: 2008, source: 'Influence', context: 'Credited with birthing the melodic, vulnerable rap genre.' },
    ],
  },
  {
    id: 'mbdtf', title: 'My Beautiful Dark Twisted Fantasy', short: 'MBDTF', year: '2010',
    palette: { bg: '#180606', text: '#F2E4D0', accent: '#C0392B', glow: 'rgba(192,57,43,0.50)', soft: 'rgba(192,57,43,0.22)' },
    icon: '👑',
    quotes: [
      { text: 'The Hawaii "Rap Camp"', year: 2010, source: 'History', context: 'Artists followed strict studio rules and a black-tie dress code.' },
      { text: 'Runaway (The Film)', year: 2010, source: 'Art', context: 'A 34-minute film about a phoenix falling to Earth.' },
      { text: 'Pitchfork 10.0', year: 2010, source: 'Review', context: 'First perfect score for a major rap album in years.' },
      { text: 'The Red Suit', year: 2010, source: 'Fashion', context: 'The iconic performance of Runaway using a solo MPC.' },
    ],
  },
  {
    id: 'yeezus', title: 'Yeezus', short: 'YZ', year: '2013',
    palette: { bg: '#F4F4F2', text: '#0A0A0A', accent: '#E11D1D', glow: 'rgba(225,29,29,0.36)', soft: 'rgba(225,29,29,0.16)' },
    icon: '💿',
    quotes: [
      { text: 'I am Warhol. I am Shakespeare.', year: 2013, source: 'Zane Lowe', context: 'Breaking the glass ceiling of the fashion industry.' },
      { text: 'Industrial Noise', year: 2013, source: 'Sound', context: 'Influenced by Chicago Drill and Acid House.' },
      { text: 'No Cover Art', year: 2013, source: 'Design', context: 'Minimalism as subtraction, not restraint.' },
      { text: 'Maison Margiela Masks', year: 2013, source: 'Fashion', context: 'Performed the entire tour with his face covered.' },
    ],
  },
  {
    id: 'tlop', title: 'The Life of Pablo', short: 'TLOP', year: '2016',
    palette: { bg: '#F26B3A', text: '#0F0A06', accent: '#FFFFFF', glow: 'rgba(255,255,255,0.45)', soft: 'rgba(255,255,255,0.22)' },
    icon: '🧡',
    quotes: [
      { text: 'A "Living" Document', year: 2016, source: 'Tech', context: 'He updated the album on Tidal for months after release.' },
      { text: 'The MSG Premiere', year: 2016, source: 'Event', context: 'Rented out MSG for a fashion/music debut.' },
      { text: 'Which One?', year: 2016, source: 'Iconography', context: 'References Picasso, Escobar, and Apostle Paul.' },
      { text: 'The Floating Stage', year: 2016, source: 'Tour', context: 'The stage hovered over the pit, turning the crowd into the art.' },
    ],
  },
  {
    id: 'ye', title: 'ye', short: 'YE', year: '2018',
    palette: { bg: '#3F5238', text: '#EDE7D3', accent: '#A8B584', glow: 'rgba(168,181,132,0.40)', soft: 'rgba(168,181,132,0.20)' },
    icon: '⛰️',
    quotes: [
      { text: 'I hate being Bi-Polar its awesome', year: 2018, source: 'iPhone', context: 'Shot the cover on his phone hours before release.' },
      { text: 'Ghost Town', year: 2018, source: 'Sound', context: 'An anthem about feeling "free" and overcoming numbness.' },
      { text: 'The Wyoming Sessions', year: 2018, source: 'History', context: 'Produced five 7-track albums in five weeks.' },
    ],
  },
  {
    id: 'donda', title: 'Donda', short: 'DONDA', year: '2021',
    palette: { bg: '#0A0A0A', text: '#F5F5F5', accent: '#888888', glow: 'rgba(255,255,255,0.28)', soft: 'rgba(255,255,255,0.10)' },
    icon: '⬛',
    quotes: [
      { text: 'Living at the Stadium', year: 2021, source: 'Atlanta', context: 'Moved into a locker room for weeks to finish the album.' },
      { text: 'The Soldier Field Fire', year: 2021, source: 'Performance', context: 'Set himself on fire inside a replica of his childhood home.' },
      { text: 'The Stem Player', year: 2021, source: 'Tech', context: 'A device allowing users to remix stems in real-time.' },
    ],
  },
  {
    id: 'vultures', title: 'Vultures', short: 'V', year: '2024',
    palette: { bg: '#1A1A1A', text: '#FFFFFF', accent: '#E1E1E1', glow: 'rgba(255,255,255,0.15)', soft: 'rgba(255,255,255,0.05)' },
    icon: '🦅',
    quotes: [
      { text: 'The Ty Dolla $ign Collaboration', year: 2024, source: 'Collab', context: 'A multi-volume project marking a return to heavy club and trap-soul production.' },
      { text: 'Independent Chart Success', year: 2024, source: 'Business', context: 'Despite being independent, the lead volume reached #1 on the Billboard 200.' },
      { text: 'The Burzum-inspired Art', year: 2024, source: 'Art', context: 'Controversial cover aesthetics referencing dark metal iconography.' },
    ],
  },
  {
    id: 'bully', title: 'Bully', short: 'B', year: '2025',
    palette: { bg: '#2C2C2C', text: '#E5E5E5', accent: '#FF3B30', glow: 'rgba(255,59,48,0.25)', soft: 'rgba(255,59,48,0.1)' },
    icon: '👹',
    quotes: [
      { text: 'The Solo Return', year: 2025, source: 'Project', context: 'Announced as his first major solo project in years, departing from the collab-heavy Vultures era.' },
      { text: 'Self-Produced Era', year: 2025, source: 'Production', context: 'A reported return to hands-on production and the "one man band" philosophy.' },
      { text: 'The "Bully" Persona', year: 2025, source: 'Identity', context: 'An aggressive, confrontational pivot in both aesthetic and lyrical delivery.' },
      { text: 'Beijing Premiere', year: 2024, source: 'Event', context: 'A massive stadium listening party in China that signaled the start of the new solo rollout.' },
    ],
  }
];

const DEFAULT_PALETTE = { bg: '#F4F0E8', text: '#1A1A1A', accent: '#888', glow: 'rgba(0,0,0,0.1)', soft: 'rgba(0,0,0,0.05)' };

// =================================================================
// COMPONENTS
// =================================================================

const Bubble = React.memo(({ b, album, isFilteredOut, isPinned, onPin }) => {
  const isLong = b.text.length > 25;
  return (
    <div
      className={`bubble-wrap ${isFilteredOut ? 'dim' : ''}`}
      style={{
        left: `${b.x}%`,
        top: `${b.y}%`,
        zIndex: b.depth,
        opacity: isPinned && isPinned.id !== b.id ? 0.05 : 1,
        transform: `translate(calc(var(--px) * ${b.depth * 0.15}), calc(var(--py) * ${b.depth * 0.15}))`,
      }}
    >
      <div className="bubble-drift" style={{ '--drift': `${b.drift}s`, '--delay': `${b.delay}s`, '--dx': `${b.driftDx}px`, '--dy': `${b.driftDy}px` }}>
        <span
          className={`bubble ${isLong ? 'long' : ''}`}
          style={{ 
            '--glow': album.palette.glow, 
            '--accent-soft': album.palette.soft,
            fontSize: `${13 + b.depth}px`,
            filter: `blur(${Math.abs(5 - b.depth) * 0.4}px)`
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

  // Parallax tracking
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

  const album = ALBUMS.find(a => a.id === (pinnedQuote?.albumId || activeAlbumId));
  const palette = album?.palette || DEFAULT_PALETTE;

  return (
    <div className="app-container" style={{ background: palette.bg, color: palette.text }}>
      <div className="grain" />
      
      {/* Background "Ghost" Illustration */}
      <div 
        className="ghost-icon" 
        style={{ 
          opacity: activeAlbumId || pinnedQuote ? 0.08 : 0,
          transform: `translate(-50%, -50%) scale(${activeAlbumId ? 1.5 : 1})`,
        }}
      >
        {album?.icon}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@300;400;500&display=swap');
        
        .app-container { min-height: 100vh; transition: background 0.8s ease, color 0.8s ease; font-family: "Instrument Serif", serif; position: relative; overflow: hidden; }
        .grain { position: fixed; inset: 0; pointer-events: none; opacity: 0.04; z-index: 50; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }
        
        .ghost-icon {
          position: fixed; top: 55%; left: 50%;
          font-size: 40vw; z-index: 1; pointer-events: none;
          transition: all 1.2s cubic-bezier(0.2, 0, 0.2, 1);
          filter: blur(10px);
        }

        .bubble-wrap { position: absolute; will-change: transform; transition: opacity 0.5s ease; }
        .bubble { display: inline-block; padding: 0.6em 1.2em; border-radius: 999px; font-style: italic; cursor: pointer; transition: all 0.4s ease; background: transparent; color: inherit; white-space: nowrap; }
        .bubble:hover { transform: scale(1.3) !important; background-color: var(--accent-soft) !important; box-shadow: 0 15px 35px var(--glow); filter: blur(0px) !important; z-index: 100; }
        .bubble.long { white-space: normal; max-width: 180px; text-align: center; }

        @keyframes drift { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(var(--dx), var(--dy)); } }
        .bubble-drift { animation: drift var(--drift) ease-in-out infinite; }

        .dim { opacity: 0.03 !important; filter: blur(5px); pointer-events: none; }

        .filter-pill { font-family: 'JetBrains Mono', monospace; font-size: 10px; padding: 6px 14px; border-radius: 999px; border: 1px solid currentColor; background: transparent; cursor: pointer; opacity: 0.4; transition: all 0.3s; margin-right: 8px; }
        .filter-pill.active { opacity: 1; background: currentColor; color: ${palette.bg}; }

        .overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); backdrop-filter: blur(15px); display: flex; align-items: center; justify-content: center; z-index: 200; }
        .card { background: white; padding: 50px; max-width: 520px; width: 90%; border-radius: 2px; position: relative; box-shadow: 0 50px 100px rgba(0,0,0,0.3); }
        .meta-label { font-family: 'JetBrains Mono', monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.5; margin-bottom: 5px; }
      `}</style>

      <header style={{ padding: '50px', position: 'relative', zIndex: 60 }}>
        <h1 style={{ fontSize: 'clamp(3rem, 10vw, 5.5rem)', margin: 0, letterSpacing: '-0.04em', lineHeight: 0.85 }}>ye <span style={{ opacity: 0.2, fontStyle: 'italic' }}>/ archives</span></h1>
        <nav style={{ marginTop: '30px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          <button className={`filter-pill ${!activeAlbumId ? 'active' : ''}`} onClick={() => setActiveAlbumId(null)}>All</button>
          {ALBUMS.map(a => (
            <button key={a.id} className={`filter-pill ${activeAlbumId === a.id ? 'active' : ''}`} onClick={() => setActiveAlbumId(a.id)}>{a.short}</button>
          ))}
        </nav>
      </header>

      <main ref={fieldRef} style={{ height: '70vh', position: 'relative', perspective: '1200px' }}>
        {allBubbles.map(b => (
          <Bubble 
            key={b.id} b={b} album={ALBUMS.find(a => a.id === b.albumId)}
            isFilteredOut={activeAlbumId && activeAlbumId !== b.albumId}
            isPinned={pinnedQuote} onPin={setPinnedQuote}
          />
        ))}
      </main>

      {pinnedQuote && (
        <div className="overlay" onClick={() => setPinnedQuote(null)}>
          <div className="card" style={{ background: palette.bg, color: palette.text }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
               <div>
                 <div className="meta-label">ERA / YEAR</div>
                 <div style={{ fontSize: '13px', fontWeight: 500 }}>{ALBUMS.find(a => a.id === pinnedQuote.albumId).short} · {pinnedQuote.year}</div>
               </div>
               <div>
                 <div className="meta-label">SOURCE</div>
                 <div style={{ fontSize: '13px', fontWeight: 500 }}>{pinnedQuote.source}</div>
               </div>
            </div>
            <h2 style={{ fontSize: '2.4rem', fontStyle: 'italic', margin: '0 0 25px 0', lineHeight: 1.1, letterSpacing: '-0.02em' }}>"{pinnedQuote.text}"</h2>
            <p style={{ lineHeight: '1.6', opacity: 0.9, fontSize: '1.1rem', margin: 0 }}>{pinnedQuote.context}</p>
            <button onClick={() => setPinnedQuote(null)} style={{ position: 'absolute', top: 25, right: 25, background: 'none', border: 'none', cursor: 'pointer', fontSize: '28px', color: 'inherit', opacity: 0.5 }}>✕</button>
          </div>
        </div>
      )}
    </div>
  );
}
