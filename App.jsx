import React, { useState, useMemo, useEffect, useRef } from 'react';

// =================================================================
// FULL ARCHIVE DATA - RESTORED
// =================================================================
const ALBUMS = [
  {
    id: 'tcd', title: 'The College Dropout', short: 'TCD', year: '2004',
    palette: { bg: '#E8DCC4', text: '#3A2817', accent: '#B8860B', glow: 'rgba(184,134,11,0.22)', soft: 'rgba(184,134,11,0.12)' },
    quotes: [
      { text: "I'm doing pretty good as far as geniuses go", year: 2004, source: 'Time magazine profile', context: 'His first major-magazine cover.' },
      { text: 'the wired-jaw album', year: 2003, source: 'October 2002 car crash', context: 'Recorded Through the Wire two weeks after a head-on collision.' },
      { text: 'chipmunk soul', year: 2004, source: 'production signature', context: 'Sped-up vocal samples that defined the TCD sound.' },
      { text: 'the dropout', year: 2002, source: 'Chicago State College', context: 'Left after one semester. His mother Donda was a professor there.' },
      { text: 'produced Izzo for Jay-Z', year: 2001, source: 'The Blueprint', context: "The beat that made Roc-A-Fella sign him as a producer." },
      { text: 'Slow Jamz', year: 2003, source: 'first #1 single', context: 'Topped the Hot 100 in February 2004.' },
      { text: 'Jesus Walks', year: 2004, source: 'Best Rap Song Grammy', context: 'Sold a Christian theme to mainstream radio.' },
      { text: 'walked out at the AMAs', year: 2004, source: 'AMAs, November', context: 'Lost Best New Artist and stormed out.' },
      { text: 'a bear in a varsity sweater', year: 2004, source: 'cover mascot', context: 'Became the era\'s avatar and a streetwear icon.' },
      { text: 'backpack rap, prep-school fit', year: 2004, source: 'early style', context: 'Polo shirts and blazers; the antithesis of label-mates.' },
    ],
  },
  {
    id: 'lr', title: 'Late Registration', short: 'LR', year: '2005',
    palette: { bg: '#FAF6E8', text: '#0F1B3D', accent: '#C9A961', glow: 'rgba(201,169,97,0.28)', soft: 'rgba(201,169,97,0.14)' },
    quotes: [
      { text: "George Bush doesn't care about black people", year: 2005, source: 'NBC Concert', context: 'Live and off-script during Hurricane Katrina relief.' },
      { text: 'the Jon Brion turn', year: 2005, source: 'Fiona Apple producer', context: 'Brought in Brion for strings, horns, and baroque flourishes.' },
      { text: 'Diamonds from Sierra Leone', year: 2005, source: 'lead single', context: 'Conflict-diamond awareness wrapped in a Bond theme.' },
      { text: 'Gold Digger', year: 2005, source: 'Ray Charles sample', context: "Number one for ten weeks. Crossover dominance." },
      { text: 'Heard Em Say', year: 2005, source: 'Adam Levine feature', context: "Quiet single that aged into a classic." },
      { text: 'three Grammys at the 48th', year: 2006, source: 'Grammy Awards', context: 'Best Rap Album, Best Rap Solo, Best Rap Song.' },
      { text: 'Touch the Sky', year: 2005, source: 'Curtis Mayfield sample', context: 'Lupe Fiasco\'s breakout verse.' },
      { text: 'Hey Mama, before he meant it', year: 2005, source: 'tribute', context: 'Written while Donda was alive; later became a eulogy.' },
      { text: 'sophomore swing', year: 2005, source: 'critical framing', context: 'Critics expected a slump; he delivered a masterpiece.' },
      { text: 'a more confident bear', year: 2005, source: 'cover art', context: 'The mascot grew up between albums.' },
    ],
  },
  {
    id: 'grad', title: 'Graduation', short: 'GRAD', year: '2007',
    palette: { bg: '#FFD9EC', text: '#1B1B5C', accent: '#FFC700', glow: 'rgba(255,199,0,0.36)', soft: 'rgba(255,199,0,0.18)' },
    quotes: [
      { text: "I refuse to accept other people's ideas of happiness", year: 2007, source: 'press cycle', context: 'A core line in his self-mythology.' },
      { text: 'beat 50 Cent on September 11', year: 2007, source: 'release showdown', context: 'Graduation outsold Curtis nearly 2-to-1.' },
      { text: 'a Murakami fever dream', year: 2007, source: 'Takashi Murakami', context: 'Pop art crossed fully into hip-hop.' },
      { text: 'shutter shades', year: 2007, source: 'signature style', context: 'Worn everywhere on the Glow in the Dark tour.' },
      { text: 'Stronger', year: 2007, source: 'Daft Punk sample', context: 'Took French house mainstream in America.' },
      { text: 'Flashing Lights', year: 2007, source: 'Dwele hook', context: 'The synth signature for stadium hip-hop.' },
      { text: 'Homecoming with Chris Martin', year: 2007, source: 'Coldplay collab', context: 'A hip-hop / Britpop crossover.' },
      { text: 'Glow in the Dark Tour', year: 2008, source: 'stadium run', context: 'Lost-in-space narrative concept tour.' },
      { text: 'Good Morning', year: 2007, source: 'Elton John sample', context: "The first sound on the album was an Elton blessing." },
      { text: 'the synth turn', year: 2007, source: 'production pivot', context: 'Stopped soul samples for arena synth lines.' },
    ],
  },
  {
    id: '808s', title: '808s & Heartbreak', short: '808s', year: '2008',
    palette: { bg: '#CFD3D8', text: '#0F1417', accent: '#D63333', glow: 'rgba(214,51,51,0.30)', soft: 'rgba(214,51,51,0.14)' },
    quotes: [
      { text: "Imma let you finish, but Beyoncé had one of the best videos", year: 2009, source: 'VMAs', context: "Interrupted Taylor Swift; went into exile after." },
      { text: 'after his mother', year: 2007, source: 'Nov 10, 2007', context: 'Donda West died from complications of surgery.' },
      { text: 'and after Alexis', year: 2008, source: 'broken engagement', context: 'Engagement to Alexis Phifer ended in early 2008.' },
      { text: 'auto-tuned grief', year: 2008, source: 'production turn', context: 'The next decade of pop sounded like this.' },
      { text: 'three weeks at Avex Honolulu', year: 2008, source: 'Hawaii sessions', context: 'Cut almost entirely in three weeks.' },
      { text: 'a heart drawn in red', year: 2008, source: 'KAWS cover', context: 'A single deflated heart balloon on chrome.' },
      { text: 'Heartless', year: 2008, source: 'Hype Williams video', context: "Rotoscoped video reached #2 on the Hot 100." },
      { text: 'Love Lockdown', year: 2008, source: 'VMAs performance', context: 'Audiences initially booed the tribal drum direction.' },
      { text: 'Pinocchio Story, live in Singapore', year: 2008, source: 'live recording', context: 'A freestyle closing track never re-recorded.' },
      { text: 'the album that built the 2010s', year: 2008, source: 'influence', context: 'Drake and The Weeknd built careers on this template.' },
    ],
  },
  {
    id: 'mbdtf', title: 'My Beautiful Dark Twisted Fantasy', short: 'MBDTF', year: '2010',
    palette: { bg: '#180606', text: '#F2E4D0', accent: '#C0392B', glow: 'rgba(192,57,43,0.50)', soft: 'rgba(192,57,43,0.22)' },
    quotes: [
      { text: 'My greatest pain is that I will never see myself perform live', year: 2010, source: 'interviews', context: 'The album was an attempt to be his own audience.' },
      { text: 'the Hawaii sessions', year: 2010, source: 'Avex Honolulu', context: 'Studio booked 24/7 with a rotating cast of artists.' },
      { text: 'phoenix in flames', year: 2010, source: 'George Condo', context: 'Condo painted four covers; the banned one is iconic.' },
      { text: 'GOOD Fridays', year: 2010, source: 'weekly drop', context: 'Reset what an album rollout could be.' },
      { text: 'Runaway, the film', year: 2010, source: '34-minute short', context: 'Phoenix love story aired simultaneously on MTV.' },
      { text: 'Pitchfork 10.0', year: 2010, source: 'review', context: 'First perfect score for a major rap album in years.' },
      { text: 'Power', year: 2010, source: 'King Crimson sample', context: 'Video was a single still frame brought to life.' },
      { text: 'All of the Lights', year: 2010, source: '14 vocalists', context: 'Rihanna, Elton John, Alicia Keys all uncredited.' },
      { text: 'Runaway, the song', year: 2010, source: 'VMAs', context: 'Solo performance in a red suit; 9 minutes long.' },
      { text: 'Lost in the World', year: 2010, source: 'Bon Iver', context: "The Wisconsin folk falsetto crashed into hip-hop." },
    ],
  },
  {
    id: 'yeezus', title: 'Yeezus', short: 'YZ', year: '2013',
    palette: { bg: '#F4F4F2', text: '#0A0A0A', accent: '#E11D1D', glow: 'rgba(225,29,29,0.36)', soft: 'rgba(225,29,29,0.16)' },
    quotes: [
      { text: 'I am Warhol. I am Shakespeare in the flesh.', year: 2013, source: 'BBC Radio 1', context: 'The defining Kanye interview of the decade.' },
      { text: "Steve Jobs ain't got nothing on me", year: 2013, source: 'Zane Lowe', context: 'Framing himself as a brand-builder.' },
      { text: 'no cover, just red tape', year: 2013, source: 'packaging', context: 'Minimalism as subtraction, not restraint.' },
      { text: 'Rick Rubin in the final two weeks', year: 2013, source: 'mastering', context: 'Rubin stripped the abrasive album down even further.' },
      { text: 'New Slaves on 66 buildings', year: 2013, source: 'guerrilla projection', context: 'Projected the music video globally on 66 buildings.' },
      { text: 'Black Skinhead on SNL', year: 2013, source: 'May 18', context: 'First-ever performance of unreleased Yeezus tracks.' },
      { text: 'Daft Punk on On Sight', year: 2013, source: 'production', context: 'Industrial dance produced by the robots.' },
      { text: 'Bound 2', year: 2013, source: 'video', context: "Viral video featured Kim Kardashian." },
      { text: 'birth of North', year: 2013, source: 'June 15', context: 'Born one day after the album release.' },
      { text: 'industrial scream', year: 2013, source: 'sound design', context: 'TR-808s through heavy distortion.' },
    ],
  },
  {
    id: 'tlop', title: 'The Life of Pablo', short: 'TLOP', year: '2016',
    palette: { bg: '#F26B3A', text: '#0F0A06', accent: '#FFFFFF', glow: 'rgba(255,255,255,0.45)', soft: 'rgba(255,255,255,0.22)' },
    quotes: [
      { text: 'a gospel album with a whole lot of cursing', year: 2016, source: 'Twitter', context: 'Title changed three times in the final week.' },
      { text: 'I am 53 million dollars in personal debt', year: 2016, source: 'Twitter', context: 'Requested Mark Zuckerberg invest $1B in his ideas.' },
      { text: 'Madison Square Garden listening', year: 2016, source: 'Yeezy Season 3', context: 'Presented fashion and music simultaneously.' },
      { text: 'living document', year: 2016, source: 'streaming', context: 'Edited the album live on services for weeks after.' },
      { text: 'Tidal exclusive, then everywhere', year: 2016, source: 'rollout', context: 'The bet that ended the era of exclusives.' },
      { text: 'Famous, the song', year: 2016, source: 'Sister Nancy sample', context: 'Re-opened a feud that never closed.' },
      { text: 'Famous, the video', year: 2016, type: 'VIDEO', source: 'wax figures', context: 'Wax figures of celebrities naked in one bed.' },
      { text: 'Ultralight Beam', year: 2016, source: 'Chance the Rapper', context: "The opening track that redefined gospel rap." },
      { text: 'No More Parties in LA', year: 2016, source: 'Kendrick Lamar', context: 'Kendrick\'s only feature on a Madlib beat.' },
      { text: 'I love this album so much', year: 2016, source: 'Twitter', context: 'Tweeted minutes after the chaotic release.' },
    ],
  },
  {
    id: 'ye', title: 'ye', short: 'YE', year: '2018',
    palette: { bg: '#3F5238', text: '#EDE7D3', accent: '#A8B584', glow: 'rgba(168,181,132,0.40)', soft: 'rgba(168,181,132,0.20)' },
    quotes: [
      { text: 'I hate being Bi-Polar its awesome', year: 2018, source: 'iPhone photo', context: 'Shot on his iPhone hours before the event.' },
      { text: 'five albums in five weeks', year: 2018, source: 'Wyoming', context: 'Produced five 7-track albums back-to-back.' },
      { text: 'TMZ, slavery as a choice', year: 2018, source: 'TMZ Live', context: 'On-camera moment that defined the era\'s press.' },
      { text: 'the Oval Office visit', year: 2018, source: 'White House', context: 'Ten-minute monologue with President Trump.' },
      { text: 'Ghost Town', year: 2018, source: '070 Shake', context: "The moment a generation felt free." },
      { text: 'KIDS SEE GHOSTS', year: 2018, source: 'Cudi reunion', context: 'Released one week after ye.' },
      { text: 'seven tracks', year: 2018, source: 'Wyoming rule', context: 'A self-imposed constraint for all releases.' },
      { text: 'ye, just ye', year: 2018, source: 'biography', context: 'Named after the nickname used by fans.' },
    ],
  },
  {
    id: 'jik', title: 'Jesus Is King', short: 'JIK', year: '2019',
    palette: { bg: '#4FA3DA', text: '#FFFFFF', accent: '#FFFFFF', glow: 'rgba(255,255,255,0.65)', soft: 'rgba(255,255,255,0.30)' },
    quotes: [
      { text: 'Sunday Service', year: 2019, source: 'choir sessions', context: 'Started in private; became a global movement.' },
      { text: 'Coachella sunrise set', year: 2019, source: 'Easter Sunday', context: 'Performed at sunrise in the desert.' },
      { text: 'no more secular music', year: 2019, source: 'declaration', context: 'Announced he would only make Christian music.' },
      { text: 'a cobalt circle', year: 2019, source: 'minimalist cover', context: 'Sky-blue square, white circle.' },
      { text: 'Closed on Sunday', year: 2019, source: 'Chick-fil-A', context: 'Devotional metaphor turned meme.' },
      { text: 'Use This Gospel', year: 2019, source: 'Clipse reunion', context: 'Reunited Pusha T and No Malice.' },
    ],
  },
  {
    id: 'donda', title: 'Donda', short: 'DONDA', year: '2021',
    palette: { bg: '#0A0A0A', text: '#F5F5F5', accent: '#888888', glow: 'rgba(255,255,255,0.28)', soft: 'rgba(255,255,255,0.10)' },
    quotes: [
      { text: 'three stadium listening parties', year: 2021, source: 'stadium run', context: 'Lived inside the stadium between events.' },
      { text: 'set himself on fire', year: 2021, source: 'Soldier Field', context: 'Final scene of the third event.' },
      { text: 'named for his mother', year: 2021, source: 'title', context: 'The elegy he had owed her for 14 years.' },
      { text: 'a black square', year: 2021, source: 'pure black cover', context: 'No name, no title, no image.' },
      { text: 'longest album of his career', year: 2021, source: 'release', context: 'Maximalist length as a final stance.' },
      { text: 'Jail, the Jay-Z reunion', year: 2021, source: 'Jay-Z verse', context: "First Jay verse on a Kanye album in years." },
    ],
  }
];

const DEFAULT_PALETTE = { bg: '#F4F0E8', text: '#1A1A1A', accent: '#888', glow: 'rgba(0,0,0,0.1)', soft: 'rgba(0,0,0,0.05)' };

// Memoized Bubble for High Performance
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
      <div 
        className="bubble-drift" 
        style={{ '--drift': `${b.drift}s`, '--delay': `${b.delay}s`, '--dx': `${b.driftDx}px`, '--dy': `${b.driftDy}px` }}
      >
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

  // CPU-optimized mouse tracking via CSS variables
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
        x: Math.random() * 85 + 7.5,
        y: Math.random() * 85 + 7.5,
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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@300;400;500&display=swap');
        
        .app-container { 
          min-height: 100vh; 
          transition: background 0.8s ease, color 0.8s ease; 
          font-family: "Instrument Serif", serif; 
          position: relative; 
          overflow: hidden; 
        }

        .bubble-wrap { 
          position: absolute; 
          will-change: transform; 
          transition: opacity 0.5s ease; 
        }

        .bubble { 
          display: inline-block; 
          padding: 0.6em 1.2em; 
          border-radius: 999px; 
          font-style: italic; 
          cursor: pointer; 
          transition: transform 0.2s ease-out, background-color 0.4s ease; 
          background: transparent; 
          color: inherit; 
          white-space: nowrap;
        }

        .bubble.long { white-space: normal; max-width: 180px; text-align: center; }

        .bubble:hover { 
          transform: scale(1.2); 
          background-color: var(--accent-soft) !important; 
          box-shadow: 0 12px 30px var(--glow); 
        }

        @keyframes drift { 
          0%, 100% { transform: translate(0, 0); } 
          50% { transform: translate(var(--dx), var(--dy)); } 
        }

        .bubble-drift { 
          animation: drift var(--drift) ease-in-out infinite; 
          animation-delay: var(--delay); 
        }

        .dim { opacity: 0.05 !important; pointer-events: none; filter: blur(2.5px); }

        .filter-pill { 
          font-family: 'JetBrains Mono', monospace; 
          font-size: 10px; 
          padding: 6px 14px; 
          border-radius: 999px; 
          border: 1px solid currentColor; 
          background: transparent; 
          cursor: pointer; 
          opacity: 0.4; 
          margin-right: 8px; 
          transition: all 0.3s; 
        }

        .filter-pill.active { opacity: 1; background: currentColor; color: var(--bg); }

        .overlay { 
          position: fixed; inset: 0; 
          background: rgba(0,0,0,0.3); 
          backdrop-filter: blur(10px); 
          display: flex; align-items: center; justify-content: center; 
          z-index: 100; 
        }

        .card { 
          background: white; 
          padding: 40px; 
          max-width: 480px; 
          width: 90%; 
          border-radius: 4px; 
          position: relative; 
          box-shadow: 0 30px 60px rgba(0,0,0,0.1); 
        }
      `}</style>

      <header style={{ padding: '40px', position: 'relative', zIndex: 10 }}>
        <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', margin: 0, letterSpacing: '-0.03em' }}>ye <span style={{ opacity: 0.3, fontStyle: 'italic' }}>/ archives</span></h1>
        <nav style={{ marginTop: '24px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
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
            <p style={{ fontSize: '11px', opacity: 0.5, textTransform: 'uppercase', marginBottom: '18px' }}>{pinnedQuote.year} — {pinnedQuote.source}</p>
            <h2 style={{ fontSize: '2.4rem', fontStyle: 'italic', margin: '0 0 24px 0', lineHeight: 1.1 }}>"{pinnedQuote.text}"</h2>
            <p style={{ lineHeight: '1.6', opacity: 0.8, fontSize: '1.1rem' }}>{pinnedQuote.context}</p>
            <button onClick={() => setPinnedQuote(null)} style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', cursor: 'pointer', fontSize: '24px', color: 'inherit' }}>✕</button>
          </div>
        </div>
      )}
    </div>
  );
}
