import React, { useState, useMemo, useEffect, useRef } from 'react';

// =================================================================
// DEEP ARCHIVE DATA - ALL ERAS & 60+ ENTRIES
// =================================================================
const ALBUMS = [
  {
    id: 'tcd', title: 'The College Dropout', short: 'TCD', year: '2004',
    palette: { bg: '#E8DCC4', text: '#3A2817', accent: '#B8860B', glow: 'rgba(184,134,11,0.22)', soft: 'rgba(184,134,11,0.12)' },
    quotes: [
      { text: "I'm doing pretty good as far as geniuses go", year: 2004, type: 'QUOTE', source: 'Time Magazine', context: 'His first major cover. He spent years proving he was more than just a "producer who raps."' },
      { text: 'the wired-jaw album', year: 2003, type: 'HISTORY', source: 'Car Crash', context: 'Recorded "Through the Wire" two weeks after a near-fatal crash, rapping through a jaw wired shut.' },
      { text: 'chipmunk soul', year: 2004, type: 'PRODUCTION', source: 'Signature Sound', context: 'The technique of speeding up classic soul vocal samples to a high pitch.' },
      { text: 'the dropout bear', year: 2004, type: 'ICONOGRAPHY', source: 'Sam Hansen', context: 'The bear suit was a random find at a school photoshoot; it became a global icon.' },
      { text: 'Jesus Walks', year: 2004, type: 'CULTURE', source: 'Triple Video', context: 'Kanye funded three separate music videos to ensure the message reached different audiences.' },
      { text: 'backpack rap crossover', year: 2004, type: 'FASHION', source: 'Polo Ralph Lauren', context: 'He broke the gangsta-rap dress code by popularized pink polos and backpacks.' },
    ],
  },
  {
    id: 'lr', title: 'Late Registration', short: 'LR', year: '2005',
    palette: { bg: '#FAF6E8', text: '#0F1B3D', accent: '#C9A961', glow: 'rgba(201,169,97,0.28)', soft: 'rgba(201,169,97,0.14)' },
    quotes: [
      { text: "George Bush doesn't care about black people", year: 2005, type: 'EVENT', source: 'NBC Live', context: 'An unscripted moment during a Hurricane Katrina benefit concert.' },
      { text: 'the Jon Brion collaboration', year: 2005, type: 'PRODUCTION', source: 'Orchestral', context: 'Brion brought harps, celestas, and horns into hip-hop beats.' },
      { text: 'Diamonds from Sierra Leone', year: 2005, type: 'MESSAGE', source: 'Global Issues', context: 'A hit single that tackled the ethics of the diamond trade.' },
      { text: 'Gold Digger', year: 2005, type: 'BUSINESS', source: 'Charts', context: 'Sampled Ray Charles; it stayed at #1 for ten weeks.' },
      { text: 'Touch the Sky', year: 2005, type: 'VISUAL', source: 'Evel Knievel', context: 'The $1M video led to a lawsuit from the real-life daredevil.' },
      { text: 'Hey Mama', year: 2005, type: 'PERSONAL', source: 'Donda West', context: 'A tribute written while his mother was alive.' },
    ],
  },
  {
    id: 'grad', title: 'Graduation', short: 'GRAD', year: '2007',
    palette: { bg: '#FFD9EC', text: '#1B1B5C', accent: '#FFC700', glow: 'rgba(255,199,0,0.36)', soft: 'rgba(255,199,0,0.18)' },
    quotes: [
      { text: 'The 50 Cent Showdown', year: 2007, type: 'MARKETING', source: 'Sept 11', context: 'A sales battle that signaled the end of Gangsta Rap dominance.' },
      { text: 'Stronger / Daft Punk', year: 2007, type: 'PRODUCTION', source: 'French House', context: 'Reportedly went through 8 different engineers to get the drum mix right.' },
      { text: 'Murakami Cover', year: 2007, type: 'ART', source: 'Superflat', context: 'Collaborated with Takashi Murakami for the bear\'s psychedelic rebirth.' },
      { text: 'Shutter Shades', year: 2007, type: 'FASHION', source: 'Alain Mikli', context: 'The lens-less glasses that defined the "electro-hop" era.' },
      { text: 'Flashing Lights', year: 2007, type: 'SOUND', source: 'Stadium Synth', context: 'A pivot from soul samples to arena-sized synthesizers.' },
      { text: 'Homecoming', year: 2007, type: 'LYRIC', source: 'Chris Martin', context: 'A personification of Chicago as a childhood sweetheart.' },
    ],
  },
  {
    id: '808s', title: '808s & Heartbreak', short: '808s', year: '2008',
    palette: { bg: '#CFD3D8', text: '#0F1417', accent: '#D63333', glow: 'rgba(214,51,51,0.30)', soft: 'rgba(214,51,51,0.14)' },
    quotes: [
      { text: 'The VMA Incident', year: 2009, type: 'EVENT', source: 'MTV', context: 'Interrupted Taylor Swift; the backlash drove him into a Hawaii exile.' },
      { text: 'TR-808 Minimalism', year: 2008, type: 'PRODUCTION', source: 'Roland 808', context: 'Used the machine to create a cold, mechanical, lonely atmosphere.' },
      { text: 'Auto-Tune as an instrument', year: 2008, type: 'TECH', source: 'Distortion', context: 'Used it to convey brokenness rather than pitch-perfection.' },
      { text: 'The Deflated Heart', year: 2008, type: 'ART', source: 'KAWS', context: 'The cover art represented the loss of his mother and his fiancé.' },
      { text: 'Love Lockdown', year: 2008, type: 'CULTURE', source: 'Tribal Drums', context: 'Performed with taiko drums and no rapping; changed pop sound.' },
      { text: 'Sad-Boy Legacy', year: 2008, type: 'INFLUENCE', source: 'Drake/Weeknd', context: 'Credited with birthing the melodic, vulnerable rap genre.' },
    ],
  },
  {
    id: 'mbdtf', title: 'My Beautiful Dark Twisted Fantasy', short: 'MBDTF', year: '2010',
    palette: { bg: '#180606', text: '#F2E4D0', accent: '#C0392B', glow: 'rgba(192,57,43,0.50)', soft: 'rgba(192,57,43,0.22)' },
    quotes: [
      { text: 'The Hawaii "Rap Camp"', year: 2010, type: 'HISTORY', source: 'Avex Studios', context: 'Artists were required to wear suits and follow strict studio rules.' },
      { text: 'Runaway (The Film)', year: 2010, type: 'ART', source: '35mm Film', context: 'A 34-minute film about a phoenix falling to Earth.' },
      { text: 'George Condo Paintings', year: 2010, type: 'ART', source: 'Covers', context: 'Five covers were commissioned; one was banned globally.' },
      { text: 'Pitchfork 10.0', year: 2010, type: 'RECEPTION', source: 'Perfect Score', context: 'Cemented his comeback as a critical darling.' },
      { text: 'Maximalism', year: 2010, type: 'PRODUCTION', source: 'Wall of Sound', context: '"All of the Lights" features 11 superstar vocalists uncredited.' },
      { text: 'The Red Suit', year: 2010, type: 'FASHION', source: 'VMAs', context: 'The iconic performance of Runaway using a solo MPC.' },
    ],
  },
  {
    id: 'yeezus', title: 'Yeezus', short: 'YZ', year: '2013',
    palette: { bg: '#F4F4F2', text: '#0A0A0A', accent: '#E11D1D', glow: 'rgba(225,29,29,0.36)', soft: 'rgba(225,29,29,0.16)' },
    quotes: [
      { text: 'I am a God', year: 2013, type: 'QUOTE', source: 'Ego', context: 'A provocative title exploring celebrity and religion.' },
      { text: 'The Rick Rubin Strip-down', year: 2013, type: 'PRODUCTION', source: 'Minimalism', context: 'Rubin was brought in days before release to "de-clutter" the sound.' },
      { text: 'No Cover Art', year: 2013, type: 'DESIGN', source: 'Clear Case', context: 'Sold in a clear case with just a piece of red tape.' },
      { text: 'Building Projections', year: 2013, type: 'MARKETING', source: 'New Slaves', context: 'Premiered the video on 66 buildings worldwide.' },
      { text: 'Maison Margiela Masks', year: 2013, type: 'FASHION', source: 'Tour', context: 'Performed the entire tour with his face covered.' },
      { text: 'Industrial Noise', year: 2013, type: 'SOUND', source: 'Daft Punk', context: 'Influenced by Chicago Drill and Acid House.' },
    ],
  },
  {
    id: 'tlop', title: 'The Life of Pablo', short: 'TLOP', year: '2016',
    palette: { bg: '#F26B3A', text: '#0F0A06', accent: '#FFFFFF', glow: 'rgba(255,255,255,0.45)', soft: 'rgba(255,255,255,0.22)' },
    quotes: [
      { text: 'A "Living" Document', year: 2016, type: 'TECH', source: 'Streaming', context: 'He updated the album on Tidal for months after release.' },
      { text: 'The MSG Premiere', year: 2016, type: 'EVENT', source: 'Yeezy Season 3', context: 'Rented out MSG for a fashion/music debut.' },
      { text: 'Ultralight Beam', year: 2016, type: 'SOUND', source: 'Gospel', context: 'A spiritual return that introduced Chance the Rapper.' },
      { text: 'Which One?', year: 2016, type: 'ICONOGRAPHY', source: 'Cover', context: 'References Picasso, Escobar, and Apostle Paul.' },
      { text: 'The Floating Stage', year: 2016, type: 'TOUR', source: 'Saint Pablo', context: 'The stage hovered over the pit, turning the crowd into the art.' },
      { text: 'I love you like Kanye loves Kanye', year: 2016, type: 'CULTURE', source: 'Meme', context: 'A self-aware exploration of his own public persona.' },
    ],
  },
  {
    id: 'ye', title: 'ye', short: 'YE', year: '2018',
    palette: { bg: '#3F5238', text: '#EDE7D3', accent: '#A8B584', glow: 'rgba(168,181,132,0.40)', soft: 'rgba(168,181,132,0.20)' },
    quotes: [
      { text: 'The Wyoming Sessions', year: 2018, type: 'HISTORY', source: 'Jackson Hole', context: 'Produced five 7-track albums in five weeks.' },
      { text: 'I hate being Bi-Polar its awesome', year: 2018, type: 'PERSONAL', source: 'iPhone', context: 'Shot the cover on his phone hours before release.' },
      { text: 'Seven Tracks', year: 2018, type: 'PRODUCTION', source: 'Format', context: 'Believed 7 tracks was the perfect length for attention.' },
      { text: 'Ghost Town', year: 2018, type: 'SOUND', source: '070 Shake', context: 'An anthem about feeling "free" and overcoming numbness.' },
    ],
  },
  {
    id: 'jik', title: 'Jesus Is King', short: 'JIK', year: '2019',
    palette: { bg: '#4FA3DA', text: '#FFFFFF', accent: '#FFFFFF', glow: 'rgba(255,255,255,0.65)', soft: 'rgba(255,255,255,0.30)' },
    quotes: [
      { text: 'Sunday Service', year: 2019, type: 'CULTURE', source: 'Choir', context: 'A weekly worship service re-imagining his hits.' },
      { text: 'No More Secular Music', year: 2019, type: 'PERSONAL', source: 'Faith', context: 'Declared he would only make Christian music.' },
      { text: 'Closed on Sunday', year: 2019, type: 'LYRIC', source: 'Chick-fil-A', context: 'A metaphor for family devotion and rest.' },
      { text: 'Use This Gospel', year: 2019, type: 'COLLAB', source: 'Clipse', context: 'The first reunion of No Malice and Pusha T in a decade.' },
    ],
  },
  {
    id: 'donda', title: 'Donda', short: 'DONDA', year: '2021',
    palette: { bg: '#0A0A0A', text: '#F5F5F5', accent: '#888888', glow: 'rgba(255,255,255,0.28)', soft: 'rgba(255,255,255,0.10)' },
    quotes: [
      { text: 'Living at the Stadium', year: 2021, type: 'HISTORY', source: 'Atlanta', context: 'Moved into a locker room for weeks to finish the album.' },
      { text: 'The Soldier Field Fire', year: 2021, type: 'EVENT', source: 'Performance', context: 'Set himself on fire inside a replica of his childhood home.' },
      { text: 'The Stem Player', year: 2021, type: 'TECH', source: 'Hardware', context: 'A device allowing users to remix stems in real-time.' },
      { text: 'Hurricane', year: 2021, type: 'SOUND', source: 'Weeknd', context: 'Teased for 3 years before being perfected.' },
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
        zIndex: b.depth,
        opacity: isPinned && isPinned.id !== b.id ? 0.05 : 1,
        transform: `translate(calc(var(--px) * ${b.depth * 0.15}), calc(var(--py) * ${b.depth * 0.15}))`,
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

  useEffect(() => {
    const container = fieldRef.current;
    if (!container) return;
    const handleMove = (e) => {
      const px = (e.clientX - window.innerWidth / 2) / 40;
      const py = (e.clientY - window.innerHeight / 2) / 40;
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
        x: Math.random() * 85 + 7.5,
        y: Math.random() * 85 + 7.5,
        depth: Math.floor(Math.random() * 10) + 1,
        drift: Math.random() * 8 + 8,
        delay: Math.random() * -15,
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
      <div className="grain-overlay" />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@300;400;500&display=swap');
        .app-container { min-height: 100vh; transition: background 1s ease, color 1s ease; font-family: "Instrument Serif", serif; position: relative; overflow: hidden; }
        .grain-overlay { position: fixed; inset: 0; pointer-events: none; opacity: 0.04; z-index: 50; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E"); }
        .bubble-wrap { position: absolute; will-change: transform; transition: opacity 0.5s ease; }
        .bubble { display: inline-block; padding: 0.6em 1.2em; border-radius: 999px; cursor: pointer; transition: all 0.4s ease; background: transparent; color: inherit; white-space: nowrap; }
        .bubble:hover { transform: scale(1.3) !important; background-color: var(--accent-soft) !important; box-shadow: 0 15px 35px var(--glow); filter: blur(0px) !important; z-index: 100; }
        .bubble.long { white-space: normal; max-width: 180px; text-align: center; }
        @keyframes drift { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(var(--dx), var(--dy)); } }
        .bubble-drift { animation: drift var(--drift) ease-in-out infinite; }
        .dim { opacity: 0.03 !important; pointer-events: none; filter: blur(5px); }
        .filter-pill { font-family: 'JetBrains Mono', monospace; font-size: 10px; padding: 6px 14px; border-radius: 999px; border: 1px solid currentColor; background: transparent; cursor: pointer; opacity: 0.4; transition: all 0.3s; margin-right: 8px; }
        .filter-pill.active { opacity: 1; background: currentColor; color: var(--bg); }
        .overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); backdrop-filter: blur(15px); display: flex; align-items: center; justify-content: center; z-index: 200; }
        .card { background: white; padding: 50px; max-width: 520px; width: 90%; border-radius: 2px; position: relative; box-shadow: 0 50px 100px rgba(0,0,0,0.3); }
        .meta-label { font-family: 'JetBrains Mono', monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.5; margin-bottom: 5px; }
      `}</style>

      <header style={{ padding: '50px', position: 'relative', zIndex: 60 }}>
        <h1 style={{ fontSize: 'clamp(3rem, 10vw, 5.5rem)', margin: 0, letterSpacing: '-0.03em', lineHeight: 0.85 }}>ye <span style={{ opacity: 0.2, fontStyle: 'italic' }}>/ archives</span></h1>
        <nav style={{ marginTop: '30px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          <button className={`filter-pill ${!activeAlbumId ? 'active' : ''}`} onClick={() => setActiveAlbumId(null)}>All</button>
          {ALBUMS.map(a => (
            <button key={a.id} className={`filter-pill ${activeAlbumId === a.id ? 'active' : ''}`} onClick={() => setActiveAlbumId(a.id)}>{a.short}</button>
          ))}
        </nav>
      </header>

      <main ref={fieldRef} style={{ height: '70vh', position: 'relative', perspective: '1200px' }}>
        {allBubbles.map(b => (
          <Bubble key={b.id} b={b} album={ALBUMS.find(a => a.id === b.albumId)} isFilteredOut={activeAlbumId && activeAlbumId !== b.albumId} isPinned={pinnedQuote} onPin={setPinnedQuote} />
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
                 <div className="meta-label">TYPE</div>
                 <div style={{ fontSize: '13px', fontWeight: 500 }}>{pinnedQuote.type}</div>
               </div>
            </div>
            <h2 style={{ fontSize: '2.4rem', fontStyle: 'italic', margin: '0 0 25px 0', lineHeight: 1.1, letterSpacing: '-0.02em' }}>"{pinnedQuote.text}"</h2>
            <div>
               <div className="meta-label">CONTEXT</div>
               <p style={{ lineHeight: '1.6', opacity: 0.9, fontSize: '1.1rem', margin: 0 }}>{pinnedQuote.context}</p>
            </div>
            <button onClick={() => setPinnedQuote(null)} style={{ position: 'absolute', top: 25, right: 25, background: 'none', border: 'none', cursor: 'pointer', fontSize: '28px', color: 'inherit', opacity: 0.5 }}>✕</button>
          </div>
        </div>
      )}
    </div>
  );
}
