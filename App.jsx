import React, { useState, useMemo, useEffect, useRef } from 'react';

// =================================================================
// DEEP ARCHIVE DATA - 60+ ENTRIES
// =================================================================
const ALBUMS = [
  {
    id: 'tcd', title: 'The College Dropout', short: 'TCD', year: '2004',
    palette: { bg: '#E8DCC4', text: '#3A2817', accent: '#B8860B', glow: 'rgba(184,134,11,0.22)', soft: 'rgba(184,134,11,0.12)' },
    quotes: [
      { text: "I'm doing pretty good as far as geniuses go", year: 2004, type: 'QUOTE', source: 'Time Magazine', context: 'His first major cover. He spent years trying to prove to Roc-A-Fella he was more than just a "producer who raps."' },
      { text: 'the wired-jaw album', year: 2003, type: 'HISTORY', source: 'Car Crash', context: 'Recorded "Through the Wire" two weeks after a near-fatal crash. He had to rap through a jaw wired shut, creating a unique muffled delivery.' },
      { text: 'chipmunk soul', year: 2004, type: 'PRODUCTION', source: 'Signature Sound', context: 'The technique of speeding up classic soul vocal samples to a high pitch. It defined the early 2000s sonic landscape.' },
      { text: 'the dropout mascot', year: 2004, type: 'ICONOGRAPHY', source: 'Sam Hansen', context: 'The bear suit was found at the school where the photoshoot took place. It became a symbol of the "outsider" in a gangsta-rap dominated era.' },
      { text: 'Jesus Walks', year: 2004, type: 'CULTURE', source: 'Triple Video', context: 'Kanye funded three separate music videos for this track because he felt the message was too important for one visual.' },
      { text: 'backpack rap vs the street', year: 2004, type: 'FASHION', source: 'Polo Ralph Lauren', context: 'He popularized pink polos and backpacks, breaking the "tough" dress code of the hip-hop industry at the time.' },
    ],
  },
  {
    id: 'lr', title: 'Late Registration', short: 'LR', year: '2005',
    palette: { bg: '#FAF6E8', text: '#0F1B3D', accent: '#C9A961', glow: 'rgba(201,169,97,0.28)', soft: 'rgba(201,169,97,0.14)' },
    quotes: [
      { text: "George Bush doesn't care about black people", year: 2005, type: 'EVENT', source: 'NBC Live', context: 'An unscripted moment during a Hurricane Katrina benefit. It remains one of the most famous live TV moments in history.' },
      { text: 'the Jon Brion collaboration', year: 2005, type: 'PRODUCTION', source: 'Studio', context: 'Brion (Fiona Apple, Magnolia) brought orchestral arrangements—celestas, harps, and horns—to hip-hop beats.' },
      { text: 'Diamonds from Sierra Leone', year: 2005, type: 'MESSAGE', source: 'Global Issue', context: 'A rare mainstream hit that tackled the ethics of the diamond trade and blood diamonds in Africa.' },
      { text: 'Gold Digger dominance', year: 2005, type: 'BUSINESS', source: 'Charts', context: 'Sampled Ray Charles. It stayed at #1 for 10 weeks and cemented him as a global pop superstar.' },
      { text: 'Touch the Sky', year: 2005, type: 'VISUAL', source: 'Evel Knievel', context: 'The $1M music video saw Kanye play "Kanye Westel," a daredevil. It led to a lawsuit from the real Evel Knievel.' },
      { text: 'Hey Mama', year: 2005, type: 'PERSONAL', source: 'Donda West', context: 'A heartfelt tribute to his mother. He would later perform a heartbreaking version at the Grammys after her passing.' },
    ],
  },
  {
    id: 'grad', title: 'Graduation', short: 'GRAD', year: '2007',
    palette: { bg: '#FFD9EC', text: '#1B1B5C', accent: '#FFC700', glow: 'rgba(255,199,0,0.36)', soft: 'rgba(255,199,0,0.18)' },
    quotes: [
      { text: 'The 50 Cent Showdown', year: 2007, type: 'MARKETING', source: 'Sept 11 Release', context: 'A sales battle between Graduation and 50 Cent’s "Curtis." Kanye’s win signaled the end of the Gangsta Rap dominance.' },
      { text: 'Stronger / Daft Punk', year: 2007, type: 'PRODUCTION', source: 'French House', context: 'He spent weeks mixing this track, reportedly going through 8 different engineers to get the drum sound right.' },
      { text: 'Takashi Murakami cover', year: 2007, type: 'ART', source: 'Superflat', context: 'Collaborated with the Japanese contemporary artist for the "Dropout Bear" rebirth in a psychedelic, anime-inspired world.' },
      { text: 'Shutter Shades', year: 2007, type: 'FASHION', source: 'Alain Mikli', context: 'The glasses had no lenses, only slats. They became the defining accessory of the "blog-house" and "electro-hop" era.' },
      { text: 'Flashing Lights', year: 2007, type: 'SOUND', source: 'Synths', context: 'A pivot from soul samples to stadium-sized synthesizers, influenced by his time touring with U2.' },
      { text: 'Homecoming', year: 2007, type: 'LYRIC', source: 'Chicago', context: 'A personification of the city of Chicago as a childhood sweetheart. Features Chris Martin of Coldplay.' },
    ],
  },
  {
    id: '808s', title: '808s & Heartbreak', short: '808s', year: '2008',
    palette: { bg: '#CFD3D8', text: '#0F1417', accent: '#D63333', glow: 'rgba(214,51,51,0.30)', soft: 'rgba(214,51,51,0.14)' },
    quotes: [
      { text: 'The VMA Incident', year: 2009, type: 'EVENT', source: 'MTV', context: 'Interrupted Taylor Swift’s win for Beyoncé. The backlash was so severe he went into a self-imposed exile in Hawaii.' },
      { text: 'TR-808 Minimalism', year: 2008, type: 'PRODUCTION', source: 'Roland 808', context: 'Almost the entire album uses the Roland TR-808 drum machine, creating a cold, mechanical, and lonely atmosphere.' },
      { text: 'Auto-Tune as an instrument', year: 2008, type: 'TECH', source: 'Cher Effect', context: 'Unlike T-Pain, Kanye used Auto-Tune to convey brokenness and distortion rather than pitch-perfection.' },
      { text: 'The Deflated Heart', year: 2008, type: 'ART', source: 'KAWS', context: 'The cover art (by KAWS) featured a simple deflated heart balloon. It represented the loss of his mother and his fiancé.' },
      { text: 'Love Lockdown', year: 2008, type: 'CULTURE', source: 'MTV VMAs', context: 'He performed this with only tribal taiko drums and no rapping. It confused audiences but changed the sound of pop.' },
      { text: 'Influence on the 2010s', year: 2008, type: 'LEGACY', source: 'Drake/Weeknd', context: 'This album is widely credited with birthing the "sad-boy" rap genre and the career paths of Drake and Kid Cudi.' },
    ],
  },
  {
    id: 'mbdtf', title: 'My Beautiful Dark Twisted Fantasy', short: 'MBDTF', year: '2010',
    palette: { bg: '#180606', text: '#F2E4D0', accent: '#C0392B', glow: 'rgba(192,57,43,0.50)', soft: 'rgba(192,57,43,0.22)' },
    quotes: [
      { text: 'The Hawaii "Rap Camp"', year: 2010, type: 'HISTORY', source: 'Avex Studios', context: 'Kanye flew out every major artist (Nicki Minaj, Jay-Z, Bon Iver) to Hawaii. No social media or sleep was allowed.' },
      { text: 'Runaway (The Film)', year: 2010, type: 'ART', source: '35mm Film', context: 'A 34-minute short film featuring a phoenix falling to Earth. It was an epic metaphor for his fall from grace.' },
      { text: 'The George Condo Covers', year: 2010, type: 'ART', source: 'Paintings', context: 'Five different covers were commissioned. The "Phoenix" cover was banned in several countries for its graphic nature.' },
      { text: 'Pitchfork 10.0', year: 2010, type: 'RECEPTION', source: 'Review', context: 'One of the few albums in history to receive a perfect 10, cementing his "comeback" after the 2009 controversy.' },
      { text: 'Maximalism', year: 2010, type: 'PRODUCTION', source: 'Wall of Sound', context: 'The song "All of the Lights" features 11 different superstar vocalists, including Elton John and Rihanna.' },
      { text: 'The Red Suit', year: 2010, type: 'FASHION', source: 'VMA Performance', context: 'The bright red suit and the MPC performance of Runaway became the defining image of this era.' },
    ],
  },
  {
    id: 'yeezus', title: 'Yeezus', short: 'YZ', year: '2013',
    palette: { bg: '#F4F4F2', text: '#0A0A0A', accent: '#E11D1D', glow: 'rgba(225,29,29,0.36)', soft: 'rgba(225,29,29,0.16)' },
    quotes: [
      { text: 'I am a God', year: 2013, type: 'QUOTE', source: 'Psalm 82', context: 'A provocative title that explored the relationship between celebrity, religion, and ego.' },
      { text: 'The Rick Rubin Strip-down', year: 2013, type: 'PRODUCTION', source: 'Minimalism', context: 'Days before release, Rick Rubin was brought in to remove almost all the melodic elements, leaving only the "noise."' },
      { text: 'No Cover Art', year: 2013, type: 'DESIGN', source: 'Clear Case', context: 'The CD was sold in a clear case with just a red piece of tape. He wanted the music to be "open" and industrial.' },
      { text: '66 Building Projections', year: 2013, type: 'MARKETING', source: 'New Slaves', context: 'He premiered the video for "New Slaves" by projecting it onto 66 buildings worldwide simultaneously.' },
      { text: 'The Maison Margiela Masks', year: 2013, type: 'FASHION', source: 'Couture', context: 'He performed the entire tour with his face covered by crystal-encrusted Margiela masks.' },
      { text: 'Daft Punk & Hudson Mohawke', year: 2013, type: 'SOUND', source: 'Industrial', context: 'The album features aggressive, distorted electronic production influenced by Chicago Drill and Acid House.' },
    ],
  },
  {
    id: 'tlop', title: 'The Life of Pablo', short: 'TLOP', year: '2016',
    palette: { bg: '#F26B3A', text: '#0F0A06', accent: '#FFFFFF', glow: 'rgba(255,255,255,0.45)', soft: 'rgba(255,255,255,0.22)' },
    quotes: [
      { text: 'A "Living" Document', year: 2016, type: 'TECH', source: 'Streaming', context: 'He kept changing the album (adding verses, fixing mixes) on Tidal for months after it was technically "released."' },
      { text: 'The MSG Premiere', year: 2016, type: 'EVENT', source: 'Yeezy Season 3', context: 'He rented out Madison Square Garden to debut the album and his fashion line to 20 million live-stream viewers.' },
      { text: 'Ultralight Beam', year: 2016, type: 'SOUND', source: 'Gospel', context: 'A return to his soulful roots but through a modern, spiritual lens. It introduced the world to Chance the Rapper.' },
      { text: 'I love you like Kanye loves Kanye', year: 2016, type: 'CULTURE', source: 'Internet Meme', context: 'The album was self-aware about his public persona and the contradictions of being a "celebrity."' },
      { text: 'The Saint Pablo Tour', year: 2016, type: 'TOUR', source: 'Floating Stage', context: 'He performed on a stage that hovered over the audience, turning the crowd into the art piece.' },
      { text: 'Which One?', year: 2016, type: 'ICONOGRAPHY', source: 'Album Cover', context: 'The Peter De Potter-designed cover asked "Which One?"—referencing the three Pablos: Picasso, Escobar, and the Apostle Paul.' },
    ],
  },
  {
    id: 'ye', title: 'ye', short: 'YE', year: '2018',
    palette: { bg: '#3F5238', text: '#EDE7D3', accent: '#A8B584', glow: 'rgba(168,181,132,0.40)', soft: 'rgba(168,181,132,0.20)' },
    quotes: [
      { text: 'The Wyoming Sessions', year: 2018, type: 'HISTORY', source: 'Jackson Hole', context: 'He produced five 7-track albums in five weeks at his ranch in Wyoming, known as the "Surgical Summer."' },
      { text: 'I hate being Bi-Polar its awesome', year: 2018, type: 'PERSONAL', source: 'Album Cover', context: 'He shot the cover on his iPhone hours before the release party. It was a public acknowledgment of his mental health.' },
      { text: 'Seven Tracks', year: 2018, type: 'PRODUCTION', source: 'Format', context: 'He believed that 7 tracks was the perfect length for a modern attention span, influenced by the number 7 in the Bible.' },
      { text: 'The TMZ Interview', year: 2018, type: 'EVENT', source: 'News', context: 'A chaotic interview that led to massive public fallout just weeks before the album dropped.' },
      { text: 'Ghost Town', year: 2018, type: 'SOUND', source: '070 Shake', context: 'The emotional peak of the album. The outro became an anthem for those struggling with numbness and feeling "free."' },
      { text: 'KIDS SEE GHOSTS', year: 2018, type: 'COLLAB', source: 'Kid Cudi', context: 'Released one week after "ye," it focused on the "ghosts" of the past and mental healing.' },
    ],
  },
  {
    id: 'jik', title: 'Jesus Is King', short: 'JIK', year: '2019',
    palette: { bg: '#4FA3DA', text: '#FFFFFF', accent: '#FFFFFF', glow: 'rgba(255,255,255,0.65)', soft: 'rgba(255,255,255,0.30)' },
    quotes: [
      { text: 'The Sunday Service Choir', year: 2019, type: 'CULTURE', source: 'Gospel', context: 'A weekly traveling worship service that re-imagined his hits as gospel songs.' },
      { text: 'No More Secular Music', year: 2019, type: 'PERSONAL', source: 'Declaration', context: 'He announced he would only make Christian music from that point forward, banning "profanity" in the studio.' },
      { text: 'Closed on Sunday', year: 2019, type: 'LYRIC', source: 'Chick-fil-A', context: 'A meme-worthy line that was actually a deep metaphor for family devotion and rest.' },
      { text: 'The IMAX Film', year: 2019, type: 'ART', source: 'James Turrell', context: 'Filmed at the Roden Crater, the movie was an abstract exploration of light and worship.' },
      { text: 'Blue Vinyl', year: 2019, type: 'DESIGN', source: 'Cobalt Blue', context: 'The cover art was simply a blue vinyl record, referencing the purity of the message.' },
      { text: 'Use This Gospel', year: 2019, type: 'COLLAB', source: 'Clipse', context: 'It featured the first reunion of the rap duo Clipse (Pusha T and No Malice) in nearly a decade.' },
    ],
  },
  {
    id: 'donda', title: 'Donda', short: 'DONDA', year: '2021',
    palette: { bg: '#0A0A0A', text: '#F5F5F5', accent: '#888888', glow: 'rgba(255,255,255,0.28)', soft: 'rgba(255,255,255,0.10)' },
    quotes: [
      { text: 'The Living at the Stadium', year: 2021, type: 'HISTORY', source: 'Mercedes-Benz', context: 'He moved into a small, windowless room in the Atlanta stadium for weeks to finish the album.' },
      { text: 'The Soldier Field Fire', year: 2021, type: 'EVENT', source: 'Chicago', context: 'He built a replica of his childhood home in the stadium and set himself on fire during the performance.' },
      { text: 'Blacked Out Cover', year: 2021, type: 'DESIGN', source: 'Pitch Black', context: 'The final cover was a simple black square, representing mourning for his mother, Donda West.' },
      { text: 'The Stem Player', year: 2021, type: 'TECH', source: 'Hardware', context: 'A $200 device that allowed users to remix the album by isolating stems (drums, vocals, bass) in real-time.' },
      { text: 'Jail Pt 2', year: 2021, type: 'CONTROVERSY', source: 'Features', context: 'He brought out Marilyn Manson and DaBaby during the rollout, sparking intense debate about "cancel culture."' },
      { text: 'Hurricane', year: 2021, type: 'SOUND', source: 'The Weeknd', context: 'A track that was teased for 3 years through multiple versions before finally being perfected with Lil Baby and Abel.' },
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
        transform: `translate(calc(var(--px) * ${b.depth * 0.12}), calc(var(--py) * ${b.depth * 0.12}))`,
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

  // Parallax + Grainy Mouse Tracking
  useEffect(() => {
    const container = fieldRef.current;
    if (!container) return;
    const handleMove = (e) => {
      const px = (e.clientX - window.innerWidth / 2) / 45;
      const py = (e.clientY - window.innerHeight / 2) / 45;
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
        
        .app-container { 
          min-height: 100vh; transition: background 1s ease, color 1s ease; 
          font-family: "Instrument Serif", serif; position: relative; overflow: hidden; 
        }

        .grain-overlay {
          position: fixed; inset: 0; pointer-events: none; opacity: 0.045; z-index: 50;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }

        .bubble-wrap { position: absolute; will-change: transform; transition: opacity 0.5s ease; }
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

        .dim { opacity: 0.03 !important; pointer-events: none; filter: blur(5px); }

        .filter-pill { 
          font-family: 'JetBrains Mono', monospace; font-size: 10px; padding: 6px 14px; 
          border-radius: 999px; border: 1px solid currentColor; background: transparent; 
          cursor: pointer; opacity: 0.4; transition: all 0.3s; margin-right: 8px;
        }
        .filter-pill.active { opacity: 1; background: currentColor; color: var(--bg); }

        .overlay { 
          position: fixed; inset: 0; background: rgba(0,0,0,0.5); 
          backdrop-filter: blur(20px); display: flex; align-items: center; justify-content: center; z-index: 200; 
        }

        .card { 
          background: white; padding: 50px; max-width: 520px; width: 90%; 
          border-radius: 2px; position: relative; box-shadow: 0 50px 100px rgba(0,0,0,0.3); 
        }

        .meta-label {
          font-family: 'JetBrains Mono', monospace; font-size: 10px; text-transform: uppercase;
          letter-spacing: 0.12em; opacity: 0.5; margin-bottom: 6px;
        }
      `}</style>

      <header style={{ padding: '50px', position: 'relative', zIndex: 60 }}>
        <h1 style={{ fontSize: 'clamp(3rem, 10vw, 5.5rem)', margin: 0, letterSpacing: '-0.04em', lineHeight: 0.85 }}>
          ye <span style={{ opacity: 0.2, fontStyle: 'italic' }}>/ archives</span>
        </h1>
        <nav style={{ marginTop: '36px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          <button className={`filter-pill ${!activeAlbumId ? 'active' : ''}`} onClick={() => setActiveAlbumId(null)}>All</button>
          {ALBUMS.map(a => (
            <button key={a.id} className={`filter-pill ${activeAlbumId === a.id ? 'active' : ''}`} onClick={() => setActiveAlbumId(a.id)}>{a.short}</button>
          ))}
        </nav>
      </header>

      <main ref={fieldRef} style={{ height: '70vh', position: 'relative', perspective: '1200px' }}>
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
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
               <div>
                 <div className="meta-label">ERA / YEAR</div>
                 <div style={{ fontSize: '14px', fontWeight: 500 }}>{ALBUMS.find(a => a.id === pinnedQuote.albumId).short} · {pinnedQuote.year}</div>
               </div>
               <div>
                 <div className="meta-label">SOURCE TYPE</div>
                 <div style={{ fontSize: '14px', fontWeight: 500 }}>{pinnedQuote.type}</div>
               </div>
            </div>

            <h2 style={{ fontSize: '2.4rem', fontStyle: 'italic', margin: '0 0 24px 0', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              "{pinnedQuote.text}"
            </h2>

            <div>
               <div className="meta-label">DEEP CONTEXT</div>
               <p style={{ lineHeight: '1.7, opacity: 0.9, fontSize: '1.1rem', margin: 0 }}>{pinnedQuote.context}</p>
            </div>
            
            <button onClick={() => setPinnedQuote(null)} style={{ position: 'absolute', top: 25, right: 25, background: 'none', border: 'none', cursor: 'pointer', fontSize: '28px', color: 'inherit', opacity: 0.4 }}>✕</button>
          </div>
        </div>
      )}
    </div>
  );
}
