import React, { useState, useMemo, useEffect, useRef } from 'react';

// =================================================================
// FULL ARCHIVE DATA
// =================================================================
const ALBUMS = [
  {
    id: 'tcd', title: 'The College Dropout', short: 'TCD', year: '2004',
    palette: { bg: '#E8DCC4', text: '#3A2817', accent: '#B8860B', glow: 'rgba(184,134,11,0.22)', soft: 'rgba(184,134,11,0.12)' },
    quotes: [
      { text: "I'm doing pretty good as far as geniuses go", year: 2004, type: 'QUOTE', source: 'Time magazine profile', context: 'His first major-magazine cover.' },
      { text: 'the wired-jaw album', year: 2003, type: 'BIOGRAPHY', source: 'October 2002 car crash', context: 'Recorded Through the Wire with a literal wired jaw.' },
      { text: 'chipmunk soul', year: 2004, type: 'PRODUCTION', source: 'production signature', context: 'Sped-up vocal samples that defined the era.' },
      { text: 'the dropout', year: 2002, type: 'BIOGRAPHY', source: 'Chicago State College', context: 'Left after one semester. His mother Donda was a professor there.' },
      { text: 'produced Izzo for Jay-Z', year: 2001, type: 'PRODUCTION', source: 'The Blueprint', context: "The beat that made Roc-A-Fella sign him as a producer." },
      { text: 'Slow Jamz', year: 2003, type: 'SINGLE', source: 'first #1 single', context: 'Topped the Hot 100 weeks before the album dropped.' },
      { text: 'Jesus Walks', year: 2004, type: 'SINGLE', source: 'Best Rap Song Grammy', context: 'Sold a Christian theme to mainstream radio.' },
      { text: 'walked out at the AMAs', year: 2004, type: 'EVENT', source: 'AMAs, November', context: 'Lost Best New Artist and stormed out.' },
      { text: 'a bear in a varsity sweater', year: 2004, type: 'COVER ART', source: 'cover mascot', context: 'Became the era\'s avatar and a streetwear icon.' },
      { text: 'backpack rap, prep-school fit', year: 2004, type: 'FASHION', source: 'early style', context: 'Polo shirts and blazers; the antithesis of the label.' },
    ],
  },
  {
    id: 'lr', title: 'Late Registration', short: 'LR', year: '2005',
    palette: { bg: '#FAF6E8', text: '#0F1B3D', accent: '#C9A961', glow: 'rgba(201,169,97,0.28)', soft: 'rgba(201,169,97,0.14)' },
    quotes: [
      { text: "George Bush doesn't care about black people", year: 2005, type: 'EVENT', source: 'Hurricane Relief', context: 'Live and off-script on NBC.' },
      { text: 'the Jon Brion turn', year: 2005, type: 'PRODUCTION', source: 'Collaboration', context: 'Strings, horns, and baroque flourishes.' },
      { text: 'Diamonds from Sierra Leone', year: 2005, type: 'SINGLE', source: 'lead single', context: 'Conflict-diamond awareness wrapped in a Bond theme.' },
      { text: 'Gold Digger', year: 2005, type: 'SINGLE', source: 'Ray Charles sample', context: "Number one for ten weeks. Crossover dominance." },
      { text: 'Heard Em Say', year: 2005, type: 'SINGLE', source: 'Adam Levine feature', context: "One of the era's softest classics." },
      { text: 'three Grammys at the 48th', year: 2006, type: 'AWARD', source: 'Grammys', context: 'Best Rap Album, Solo Performance, and Song.' },
      { text: 'Touch the Sky', year: 2005, type: 'SAMPLE', source: 'Curtis Mayfield', context: 'Lupe Fiasco\'s breakout verse.' },
      { text: 'Hey Mama, before he meant it', year: 2005, type: 'BIOGRAPHY', source: 'tribute', context: 'Written while Donda was alive; later became a eulogy.' },
      { text: 'sophomore swing', year: 2005, type: 'RECEPTION', source: 'critical framing', context: 'Avoided the sophomore slump with a masterpiece.' },
      { text: 'a more confident bear', year: 2005, type: 'COVER ART', source: 'cover continuity', context: 'The mascot grew up between albums.' },
    ],
  },
  {
    id: 'grad', title: 'Graduation', short: 'GRAD', year: '2007',
    palette: { bg: '#FFD9EC', text: '#1B1B5C', accent: '#FFC700', glow: 'rgba(255,199,0,0.36)', soft: 'rgba(255,199,0,0.18)' },
    quotes: [
      { text: "I refuse to accept other people's ideas of happiness", year: 2007, type: 'QUOTE', source: 'press cycle', context: 'A core line in his self-mythology.' },
      { text: 'beat 50 Cent on September 11', year: 2007, type: 'EVENT', source: 'release showdown', context: 'Graduation outsold Curtis nearly 2-to-1.' },
      { text: 'a Murakami fever dream', year: 2007, type: 'COVER ART', source: 'Takashi Murakami', context: 'Pop art crossed fully into hip-hop.' },
      { text: 'shutter shades', year: 2007, type: 'FASHION', source: 'signature accessory', context: 'A meme before the word existed.' },
      { text: 'Stronger', year: 2007, type: 'SAMPLE', source: 'Daft Punk', context: 'Took French house mainstream in America.' },
      { text: 'Flashing Lights', year: 2007, type: 'SINGLE', source: 'Dwele hook', context: 'The synth signature for stadium hip-hop.' },
      { text: 'Homecoming with Chris Martin', year: 2007, type: 'FEATURE', source: 'Coldplay collab', context: 'A hip-hop / Britpop crossover.' },
      { text: 'Glow in the Dark Tour', year: 2008, type: 'TOUR', source: 'stadium run', context: 'Lost-in-space narrative concept tour.' },
      { text: 'Good Morning', year: 2007, type: 'SAMPLE', source: 'Elton John interpolation', context: "The first sound on the album was a Sir Elton blessing." },
      { text: 'the synth turn', year: 2007, type: 'PRODUCTION', source: 'production pivot', context: 'Stopped soul samples for arena synth lines.' },
    ],
  },
  {
    id: '808s', title: '808s & Heartbreak', short: '808s', year: '2008',
    palette: { bg: '#CFD3D8', text: '#0F1417', accent: '#D63333', glow: 'rgba(214,51,51,0.30)', soft: 'rgba(214,51,51,0.14)' },
    quotes: [
      { text: "Imma let you finish, but Beyoncé had one of the best videos", year: 2009, type: 'EVENT', source: 'VMAs', context: "The Taylor Swift interruption that changed his career." },
      { text: 'after his mother', year: 2007, type: 'BIOGRAPHY', source: 'Nov 10, 2007', context: 'Donda West died from surgery complications.' },
      { text: 'and after Alexis', year: 2008, type: 'BIOGRAPHY', source: 'broken engagement', context: 'Engagement to Alexis Phifer ended.' },
      { text: 'auto-tuned grief', year: 2008, type: 'PRODUCTION', source: 'production turn', context: 'The next decade of pop sounded like this.' },
      { text: 'three weeks at Avex Honolulu', year: 2008, type: 'EVENT', source: 'Hawaii recording', context: 'Cut almost entirely in three weeks.' },
      { text: 'a heart drawn in red', year: 2008, type: 'COVER ART', source: 'KAWS', context: 'A single deflated heart balloon on chrome.' },
      { text: 'Heartless', year: 2008, type: 'SINGLE', source: 'Hype Williams video', context: "Rotoscoped video based on American Pop." },
      { text: 'Love Lockdown', year: 2008, type: 'SINGLE', source: 'TR-808 + tribal drums', context: 'Audiences initially booed the new direction.' },
      { text: 'Pinocchio Story, live in Singapore', year: 2008, type: 'EVENT', source: 'live recording', context: 'A freestyle closing track never re-recorded.' },
      { text: 'the album that built the 2010s', year: 2008, type: 'INFLUENCE', source: 'cultural reception', context: 'Drake, Weeknd, and Frank Ocean built on this.' },
    ],
  },
  {
    id: 'mbdtf', title: 'My Beautiful Dark Twisted Fantasy', short: 'MBDTF', year: '2010',
    palette: { bg: '#180606', text: '#F2E4D0', accent: '#C0392B', glow: 'rgba(192,57,43,0.50)', soft: 'rgba(192,57,43,0.22)' },
    quotes: [
      { text: 'My greatest pain is that I will never see myself perform live', year: 2010, type: 'QUOTE', source: 'press cycle', context: 'The album was an attempt to be his own audience.' },
      { text: 'the Hawaii sessions', year: 2010, type: 'EVENT', source: 'Avex Honolulu', context: 'Studio booked 24/7 with a rotating cast of stars.' },
      { text: 'phoenix in flames', year: 2010, type: 'COVER ART', source: 'George Condo', context: 'Condo painted four covers; one was banned.' },
      { text: 'GOOD Fridays', year: 2010, type: 'RELEASE', source: 'weekly drop', context: 'Reset what an album rollout could be.' },
      { text: 'Runaway, the film', year: 2010, type: 'FILM', source: '34-minute short', context: 'A phoenix love story aired on all MTV channels.' },
      { text: 'Pitchfork 10.0', year: 2010, type: 'RECEPTION', source: 'Review', context: 'First perfect score for a major rap album in years.' },
      { text: 'Power', year: 2010, type: 'SAMPLE', source: 'King Crimson', context: 'The video was a single still frame in motion.' },
      { text: 'All of the Lights', year: 2010, type: 'PRODUCTION', source: '14 vocalists', context: 'Maximalism as a moral stance.' },
      { text: 'Runaway, the song', year: 2010, type: 'SINGLE', source: '9-minute take', context: 'Apology and celebration of self.' },
      { text: 'Lost in the World', year: 2010, type: 'FEATURE', source: 'Bon Iver', context: "Built on Justin Vernon's 'Woods'." },
    ],
  },
  {
    id: 'yeezus', title: 'Yeezus', short: 'YZ', year: '2013',
    palette: { bg: '#F4F4F2', text: '#0A0A0A', accent: '#E11D1D', glow: 'rgba(225,29,29,0.36)', soft: 'rgba(225,29,29,0.16)' },
    quotes: [
      { text: 'I am Warhol. I am Shakespeare in the flesh.', year: 2013, type: 'QUOTE', source: 'Zane Lowe Interview', context: 'The defining Kanye interview of the decade.' },
      { text: "Steve Jobs ain't got nothing on me", year: 2013, type: 'QUOTE', source: 'Zane Lowe Interview', context: 'Framing himself as a designer, not just a rapper.' },
      { text: 'no cover, just red tape', year: 2013, type: 'COVER ART', source: 'packaging', context: 'Minimalism as subtraction, not restraint.' },
      { text: 'Rick Rubin in the final two weeks', year: 2013, type: 'PRODUCTION', source: 'final cut', context: 'Brought Rubin in to strip the album down.' },
      { text: 'New Slaves on 66 buildings', year: 2013, type: 'EVENT', source: 'guerrilla projection', context: 'Projected the video globally on one night.' },
      { text: 'Black Skinhead on SNL', year: 2013, type: 'EVENT', source: 'SNL', context: 'First-ever performance of unreleased tracks.' },
      { text: 'Daft Punk on On Sight', year: 2013, type: 'PRODUCTION', source: 'opener', context: 'Industrial dance underneath rage.' },
      { text: 'Bound 2', year: 2013, type: 'VIDEO', source: 'Brenda Lee sample', context: "Topless on a motorcycle; viral parody followed." },
      { text: 'birth of North', year: 2013, type: 'BIOGRAPHY', source: 'June 15', context: 'Born one day after the album release.' },
      { text: 'industrial scream', year: 2013, type: 'PRODUCTION', source: 'sound design', context: '808s through heavy distortion.' },
    ],
  },
  {
    id: 'tlop', title: 'The Life of Pablo', short: 'TLOP', year: '2016',
    palette: { bg: '#F26B3A', text: '#0F0A06', accent: '#FFFFFF', glow: 'rgba(255,255,255,0.45)', soft: 'rgba(255,255,255,0.22)' },
    quotes: [
      { text: 'a gospel album with a whole lot of cursing', year: 2016, type: 'QUOTE', source: 'Twitter', context: 'How he described it during the chaotic rollout.' },
      { text: 'I am 53 million dollars in personal debt', year: 2016, type: 'QUOTE', source: 'Twitter', context: 'Requested Zuckerberg invest $1B in his ideas.' },
      { text: 'Madison Square Garden listening', year: 2016, type: 'EVENT', source: 'Yeezy Season 3', context: 'Presented fashion and music simultaneously.' },
      { text: 'living document', year: 2016, type: 'RELEASE', source: 'streaming', context: 'Edited the album live for weeks after release.' },
      { text: 'Tidal exclusive, then everywhere', year: 2016, type: 'RELEASE', source: 'rollout', context: 'The bet that ended the era of exclusives.' },
      { text: 'Famous, the song', year: 2016, type: 'SAMPLE', source: 'Sister Nancy', context: 'Re-opened a feud that never closed.' },
      { text: 'Famous, the video', year: 2016, type: 'VIDEO', source: 'wax tableau', context: 'Wax figures of Trump, Taylor, and others.' },
      { text: 'Ultralight Beam', year: 2016, type: 'FEATURE', source: 'Chance the Rapper', context: "Chance's verse made him a star." },
      { text: 'No More Parties in LA', year: 2016, type: 'FEATURE', source: 'Kendrick Lamar', context: 'Kendrick\'s only feature on the album.' },
      { text: 'I love this album so much', year: 2016, type: 'QUOTE', source: 'Twitter', context: 'Tweeted minutes after release.' },
    ],
  },
  {
    id: 'ye', title: 'ye', short: 'YE', year: '2018',
    palette: { bg: '#3F5238', text: '#EDE7D3', accent: '#A8B584', glow: 'rgba(168,181,132,0.40)', soft: 'rgba(168,181,132,0.20)' },
    quotes: [
      { text: 'I hate being Bi-Polar its awesome', year: 2018, type: 'COVER ART', source: 'iPhone photo', context: 'Shot on his iPhone hours before the event.' },
      { text: 'five albums in five weeks', year: 2018, type: 'PRODUCTION', source: 'Wyoming', context: 'Produced five 7-track albums back-to-back.' },
      { text: 'TMZ, slavery as a choice', year: 2018, type: 'EVENT', source: 'TMZ Live', context: 'On-camera, off-script moment.' },
      { text: 'the Oval Office visit', year: 2018, type: 'EVENT', source: 'White House', context: 'Ten-minute monologue with President Trump.' },
      { text: 'Ghost Town', year: 2018, type: 'FEATURE', source: '070 Shake', context: "The moment a generation felt 'free'." },
      { text: 'KIDS SEE GHOSTS', year: 2018, type: 'RELEASE', source: 'Cudi reunion', context: 'The era\'s emotional ceiling.' },
      { text: 'seven tracks', year: 2018, type: 'PRODUCTION', source: 'format', context: 'A self-imposed rule for the Wyoming era.' },
      { text: 'ye, just ye', year: 2018, type: 'BIOGRAPHY', source: 'title', context: 'Named after the nickname fans used.' },
    ],
  },
  {
    id: 'jik', title: 'Jesus Is King', short: 'JIK', year: '2019',
    palette: { bg: '#4FA3DA', text: '#FFFFFF', accent: '#FFFFFF', glow: 'rgba(255,255,255,0.65)', soft: 'rgba(255,255,255,0.30)' },
    quotes: [
      { text: 'Sunday Service', year: 2019, type: 'EVENT', source: 'choir sessions', context: 'A private session that became a movement.' },
      { text: 'Coachella sunrise set', year: 2019, type: 'EVENT', source: 'Easter Sunday', context: 'Sunday Service at sunrise in the desert.' },
      { text: 'no more secular music', year: 2019, type: 'QUOTE', source: 'declaration', context: 'Announced he would only make Christian music.' },
      { text: 'a cobalt circle', year: 2019, type: 'COVER ART', source: 'minimalist', context: 'Sky-blue square, white circle.' },
      { text: 'Closed on Sunday', year: 2019, type: 'SINGLE', source: 'Chick-fil-A', context: 'Devotional metaphor turned meme.' },
      { text: 'Use This Gospel', year: 2019, type: 'FEATURE', source: 'Clipse reunion', context: 'Reunited the brothers Thornton.' },
    ],
  },
  {
    id: 'donda', title: 'Donda', short: 'DONDA', year: '2021',
    palette: { bg: '#0A0A0A', text: '#F5F5F5', accent: '#888888', glow: 'rgba(255,255,255,0.28)', soft: 'rgba(255,255,255,0.10)' },
    quotes: [
      { text: 'three stadium listening parties', year: 2021, type: 'EVENT', source: 'stadium run', context: 'Lived inside the stadium between events.' },
      { text: 'set himself on fire', year: 2021, type: 'EVENT', source: 'Soldier Field', context: 'Final scene of the third event.' },
      { text: 'named for his mother', year: 2021, type: 'BIOGRAPHY', source: 'title', context: 'The elegy he had owed her for 14 years.' },
      { text: 'a black square', year: 2021, type: 'COVER ART', source: 'pure black', context: 'A Malevich for streaming services.' },
      { text: 'longest album of his career', year: 2021, type: 'RELEASE', source: '27 tracks', context: 'Maximalist length as a final stance.' },
      { text: 'Jail, the Jay-Z reunion', year: 2021, type: 'FEATURE', source: 'Jay-Z verse', context: "First Jay verse on a Kanye album in years." },
    ],
  }
];

const DEFAULT_PALETTE = { bg: '#F4F0E8', text: '#1A1A1A', accent: '#888', glow: 'rgba(0,0,0,0.1)', soft: 'rgba(0,0,0,0.05)' };

// Memoized Bubble for Performance
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
        .app-container { min-height: 100vh; transition: background 0.8s ease, color 0.8s ease; font-family: "Instrument Serif", serif; position: relative; overflow: hidden; }
        .bubble-wrap { position: absolute; will-change: transform; transition: opacity 0.4s ease; }
        .bubble { display: inline-block; padding: 0.5em 1em; border-radius: 999px; cursor: pointer; transition: transform 0.2s ease-out; background: transparent; color: inherit; white-space: nowrap; }
        .bubble:hover { transform: scale(1.2); background: var(--accent-soft); box-shadow: 0 10px 20px var(--glow); }
        .bubble.long { white-space: normal; max-width: 160px; text-align: center; }
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
