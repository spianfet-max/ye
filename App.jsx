import React, { useState, useMemo, useEffect, useRef } from 'react';

// =================================================================
// ARCHIVE DATA
// Each quote = an archive entry. Bubble shows text; click reveals
// year / source / context. All entries are public statements,
// documented moments, or factual era markers — no song lyrics.
// =================================================================
const ALBUMS = [
  {
    id: 'tcd', title: 'The College Dropout', short: 'TCD', year: '2004',
    palette: { bg: '#E8DCC4', text: '#3A2817', accent: '#B8860B', glow: 'rgba(184,134,11,0.22)', soft: 'rgba(184,134,11,0.12)' },
    quotes: [
      { text: "I'm doing pretty good as far as geniuses go", year: 2004, type: 'QUOTE', source: 'Time magazine profile', context: 'His first major-magazine cover, after Through the Wire made him impossible to ignore.' },
      { text: 'the wired-jaw album', year: 2003, type: 'BIOGRAPHY', source: 'October 2002 car crash aftermath', context: 'Recorded Through the Wire two weeks after a head-on collision in LA. Vocals through a literal wired jaw.' },
      { text: 'chipmunk soul', year: 2004, type: 'PRODUCTION', source: 'production signature', context: 'Sped-up vocal samples that defined the TCD sound and got copied through the rest of the decade.' },
      { text: 'the dropout', year: 2002, type: 'BIOGRAPHY', source: 'Chicago State College', context: 'Left after one semester. His mother Donda was an English professor there. The album title was the joke and the thesis.' },
      { text: 'produced Izzo for Jay-Z', year: 2001, type: 'PRODUCTION', source: 'The Blueprint', context: "Flipped the Jackson 5's 'I Want You Back'. The beat that made Roc-A-Fella sign him as a producer." },
      { text: 'Slow Jamz', year: 2003, type: 'SINGLE', source: 'first #1 single, with Twista', context: 'Topped the Hot 100 in February 2004, weeks before the album dropped. The wedge that opened the door for him as a rapper.' },
      { text: 'Jesus Walks', year: 2004, type: 'SINGLE', source: 'lead single, Best Rap Song Grammy', context: 'Three different music videos commissioned simultaneously. Sold a Christian theme to mainstream radio.' },
      { text: 'walked out at the AMAs', year: 2004, type: 'EVENT', source: 'American Music Awards, November', context: 'Lost Best New Artist to Gretchen Wilson and stormed out. The first famous outburst — five years before Taylor Swift.' },
      { text: 'a bear in a varsity sweater', year: 2004, type: 'COVER ART', source: 'cover mascot, designed with Bape', context: 'Returned for Late Registration and Graduation. Became the era\'s avatar and a streetwear icon.' },
      { text: 'backpack rap, prep-school fit', year: 2004, type: 'FASHION', source: 'early style', context: 'Polo shirts, blazers, actual backpacks. He looked like the antithesis of every rapper on the label.' },
    ],
  },
  {
    id: 'lr', title: 'Late Registration', short: 'LR', year: '2005',
    palette: { bg: '#FAF6E8', text: '#0F1B3D', accent: '#C9A961', glow: 'rgba(201,169,97,0.28)', soft: 'rgba(201,169,97,0.14)' },
    quotes: [
      { text: "George Bush doesn't care about black people", year: 2005, type: 'EVENT', source: 'NBC Concert for Hurricane Relief, Sept 2', context: 'Live and off-script, with a stunned Mike Myers beside him. NBC cut to commercial. Bush later called it the worst moment of his presidency.' },
      { text: 'the Jon Brion turn', year: 2005, type: 'PRODUCTION', source: 'Fiona Apple, Magnolia composer', context: 'Brought in Brion to co-produce. Strings, horns, density, baroque flourishes: hip-hop as cinema.' },
      { text: 'Diamonds from Sierra Leone', year: 2005, type: 'SINGLE', source: 'lead single, Shirley Bassey sample', context: 'Conflict-diamond awareness wrapped around the Bond theme from Diamonds Are Forever. Topical hip-hop, fully scaled.' },
      { text: 'Gold Digger', year: 2005, type: 'SINGLE', source: 'Ray Charles sample, Jamie Foxx hook', context: "Built on 'I Got a Woman.' Number one for ten weeks. The crossover moment that made him radio-permanent." },
      { text: 'Heard Em Say', year: 2005, type: 'SINGLE', source: 'Adam Levine feature', context: "Natalie Cole sample, Levine on the chorus. Quiet single that aged into one of the era's softest classics." },
      { text: 'three Grammys at the 48th', year: 2006, type: 'AWARD', source: 'February 2006 ceremony', context: 'Best Rap Album, Best Rap Solo Performance, Best Rap Song. Eight nominations total.' },
      { text: 'Touch the Sky', year: 2005, type: 'SAMPLE', source: 'Curtis Mayfield, Move On Up', context: 'Just Blaze co-produced. The horns are the hook. Lupe Fiasco\'s breakout verse.' },
      { text: 'Hey Mama, before he meant it', year: 2005, type: 'BIOGRAPHY', source: 'tribute to Donda West', context: 'Written and recorded while she was alive. Two years later it became a eulogy he had to perform on tour.' },
      { text: 'sophomore swing', year: 2005, type: 'RECEPTION', source: 'critical framing', context: 'Critics expected the difficult second album to expose him. It did the opposite — every list, every year-end.' },
      { text: 'a more confident bear', year: 2005, type: 'COVER ART', source: 'cover continuity', context: 'Same bear, now hanging back at the gates. The mascot grew up between albums; so did the music.' },
    ],
  },
  {
    id: 'grad', title: 'Graduation', short: 'GRAD', year: '2007',
    palette: { bg: '#FFD9EC', text: '#1B1B5C', accent: '#FFC700', glow: 'rgba(255,199,0,0.36)', soft: 'rgba(255,199,0,0.18)' },
    quotes: [
      { text: "I refuse to accept other people's ideas of happiness for me", year: 2007, type: 'QUOTE', source: 'press cycle interviews', context: 'A core line in his self-mythology, repeated across press for the album.' },
      { text: 'beat 50 Cent on September 11', year: 2007, type: 'EVENT', source: 'release-day showdown', context: 'Graduation outsold Curtis nearly 2-to-1. Many marked it as the day gangsta rap stopped being the center of the genre.' },
      { text: 'a Murakami fever dream', year: 2007, type: 'COVER ART', source: 'Takashi Murakami collaboration', context: 'Murakami designed the cover and animated the Good Morning video. Pop art crossed fully into hip-hop.' },
      { text: 'shutter shades', year: 2007, type: 'FASHION', source: 'signature accessory', context: 'A meme before there was a word for it. Worn everywhere on the Glow in the Dark tour.' },
      { text: 'Stronger', year: 2007, type: 'SAMPLE', source: 'Daft Punk, Harder Better Faster Stronger', context: 'Took French house mainstream in America. The synths bled into pop production for the next five years.' },
      { text: 'Flashing Lights', year: 2007, type: 'SINGLE', source: 'Dwele hook, paparazzi-themed video', context: 'Connie Mitchell hook, paparazzi-themed video. The synth signature for what stadium hip-hop would sound like.' },
      { text: 'Homecoming with Chris Martin', year: 2007, type: 'FEATURE', source: 'Coldplay collaboration', context: 'A hip-hop / Britpop crossover years before they were normal. Chicago anthem with a Coldplay piano.' },
      { text: 'Glow in the Dark Tour', year: 2008, type: 'TOUR', source: 'first stadium headlining run', context: 'Lost-in-space narrative concept tour, 56 dates. Rihanna, Lupe Fiasco, N.E.R.D. opened. Cinema as concert.' },
      { text: 'Good Morning', year: 2007, type: 'SAMPLE', source: 'Elton John interpolation', context: "Built on 'Someone Saved My Life Tonight.' The first sound on the album was a Sir Elton blessing." },
      { text: 'the synth turn', year: 2007, type: 'PRODUCTION', source: 'production pivot', context: 'Stopped sampling soul records and started composing arena synth lines. He had become the headliner he kept describing.' },
    ],
  },
  {
    id: '808s', title: '808s & Heartbreak', short: '808s', year: '2008',
    palette: { bg: '#CFD3D8', text: '#0F1417', accent: '#D63333', glow: 'rgba(214,51,51,0.30)', soft: 'rgba(214,51,51,0.14)' },
    quotes: [
      { text: "Imma let you finish, but Beyoncé had one of the best videos of all time", year: 2009, type: 'EVENT', source: 'MTV VMAs, September 13', context: "Interrupted Taylor Swift's Best Female Video acceptance. The line entered the language. He went into self-imposed exile after." },
      { text: 'after his mother', year: 2007, type: 'BIOGRAPHY', source: 'November 10, 2007', context: 'Donda West died from complications of cosmetic surgery. 808s was the next album he made.' },
      { text: 'and after Alexis', year: 2008, type: 'BIOGRAPHY', source: 'broken engagement', context: 'Engagement to Alexis Phifer ended in early 2008. The album is grief layered over grief.' },
      { text: 'auto-tuned grief', year: 2008, type: 'PRODUCTION', source: 'production turn', context: 'Drum machines, Auto-Tune as instrument, almost no rapping. Critics hated it on release; the next decade of pop sounded like it.' },
      { text: 'three weeks at Avex Honolulu', year: 2008, type: 'EVENT', source: 'Hawaii recording', context: 'Cut almost entirely in three weeks. He would return to that same studio for MBDTF.' },
      { text: 'a heart drawn in red', year: 2008, type: 'COVER ART', source: 'KAWS', context: 'A single deflated heart balloon on chrome. Restraint as the entire content of the cover.' },
      { text: 'Heartless', year: 2008, type: 'SINGLE', source: 'Hype Williams animated video', context: "Rotoscoped video, Disney's American Pop as visual reference. Reached #2 on the Hot 100." },
      { text: 'Love Lockdown', year: 2008, type: 'SINGLE', source: 'TR-808 + tribal drums', context: 'Performed on the VMAs before the album dropped. Audiences booed the new direction. Released the next day.' },
      { text: 'Pinocchio Story, freestyled in Singapore', year: 2008, type: 'EVENT', source: 'live recording, Glow in the Dark Tour', context: 'Closing track recorded live in front of an audience in Singapore. Never re-recorded. The grief had a take number.' },
      { text: 'the album that built the 2010s', year: 2008, type: 'INFLUENCE', source: 'cultural reception', context: 'The Weeknd, Drake, Frank Ocean, Kid Cudi all built careers on this template. Critically rehabilitated within five years.' },
    ],
  },
  {
    id: 'mbdtf', title: 'My Beautiful Dark Twisted Fantasy', short: 'MBDTF', year: '2010',
    palette: { bg: '#180606', text: '#F2E4D0', accent: '#C0392B', glow: 'rgba(192,57,43,0.50)', soft: 'rgba(192,57,43,0.22)' },
    quotes: [
      { text: 'My greatest pain is that I will never see myself perform live', year: 2010, type: 'QUOTE', source: 'press cycle / interviews', context: 'A line he repeated through the MBDTF promo run. The album was his attempt to be his own audience.' },
      { text: 'the Hawaii sessions', year: 2010, type: 'EVENT', source: 'Avex Honolulu lockdown', context: 'Cooked in a rented studio with rotating producers, Pusha T, Bon Iver, Nicki Minaj, RZA. Studio booked 24/7 for months.' },
      { text: 'phoenix in flames', year: 2010, type: 'COVER ART', source: 'George Condo paintings', context: 'Condo painted four covers. The banned one — phoenix straddling the artist — became the icon.' },
      { text: 'GOOD Fridays', year: 2010, type: 'RELEASE', source: 'free song every Friday for 15 weeks', context: 'Reset what an album rollout could be. Songs that did not make the album are still streamed millions of times.' },
      { text: 'Runaway, the film', year: 2010, type: 'FILM', source: '34-minute short film', context: 'Phoenix love story. Aired on every MTV channel simultaneously. He was rebuilding his myth in public.' },
      { text: 'Pitchfork 10.0', year: 2010, type: 'RECEPTION', source: 'November 22 review', context: 'First perfect score the publication had given a major-label rap album in years. Became a contested cultural document on its own.' },
      { text: 'Power', year: 2010, type: 'SAMPLE', source: 'King Crimson, 21st Century Schizoid Man', context: 'Lead single. Marked the comeback. The video was a single still frame in motion — a renaissance fresco brought to life.' },
      { text: 'All of the Lights', year: 2010, type: 'PRODUCTION', source: '14 vocalists, Jeff Bhasker co-pro', context: 'Rihanna hook, Elton John piano, Fergie, Alicia Keys, Kid Cudi all uncredited on the track. Maximalism as a moral stance.' },
      { text: 'Runaway, the song', year: 2010, type: 'SINGLE', source: '9-minute single, Pusha T verse', context: 'Performed solo at the 2010 VMAs in a red suit. Apology and celebration of self in one nine-minute take.' },
      { text: 'Lost in the World', year: 2010, type: 'FEATURE', source: 'Bon Iver interpolation', context: "Built on Justin Vernon's 'Woods.' The Wisconsin folk falsetto crashed into a Gil Scott-Heron sample. The album's emotional summit." },
    ],
  },
  {
    id: 'yeezus', title: 'Yeezus', short: 'YZ', year: '2013',
    palette: { bg: '#F4F4F2', text: '#0A0A0A', accent: '#E11D1D', glow: 'rgba(225,29,29,0.36)', soft: 'rgba(225,29,29,0.16)' },
    quotes: [
      { text: 'I am Warhol. I am Shakespeare in the flesh.', year: 2013, type: 'QUOTE', source: 'BBC Radio 1, Zane Lowe', context: 'A 25-minute interview that became the defining Kanye text. Most-quoted artist interview of the decade.' },
      { text: "Steve Jobs ain't got nothing on me", year: 2013, type: 'QUOTE', source: 'BBC Radio 1, Zane Lowe', context: 'Same interview. He was framing himself as a brand-builder and designer, not just a rapper.' },
      { text: 'no cover, just red tape', year: 2013, type: 'COVER ART', source: 'packaging concept', context: 'CD shipped in a clear case with a strip of red electrical tape. The cover was the absence of one.' },
      { text: 'Rick Rubin in the final two weeks', year: 2013, type: 'PRODUCTION', source: 'mastering / final cut', context: 'Brought Rubin in to strip the album down. Fifteen days from chaos to release. Minimalism as subtraction, not restraint.' },
      { text: 'New Slaves on 66 buildings', year: 2013, type: 'EVENT', source: 'global guerrilla projection', context: 'Projected the music video onto 66 buildings worldwide on the same night. No advertising spend, total dominance.' },
      { text: 'Black Skinhead on SNL', year: 2013, type: 'EVENT', source: 'May 18 episode', context: 'First-ever performance of two unreleased Yeezus tracks. Black Skinhead and New Slaves. The album was still secret.' },
      { text: 'Daft Punk on On Sight', year: 2013, type: 'PRODUCTION', source: 'opener production credit', context: 'Daft Punk produced the abrasive opener. Hudson Mohawke and Arca shaped the rest. Industrial dance underneath rage.' },
      { text: 'Bound 2', year: 2013, type: 'VIDEO', source: 'Brenda Lee sample, Kim Kardashian video', context: "Topless on a motorcycle in front of green-screen mountains. Seth Rogen and James Franco's parody made it more famous." },
      { text: 'birth of North', year: 2013, type: 'BIOGRAPHY', source: 'June 15', context: 'North West born one day after the album release. The most rebellious and most domestic moment of his career, the same week.' },
      { text: 'industrial scream', year: 2013, type: 'PRODUCTION', source: 'sound design', context: 'TR-808s through distortion, vocals through Auto-Tune through more distortion. The sound of a man trying to tear it all up.' },
    ],
  },
  {
    id: 'tlop', title: 'The Life of Pablo', short: 'TLOP', year: '2016',
    palette: { bg: '#F26B3A', text: '#0F0A06', accent: '#FFFFFF', glow: 'rgba(255,255,255,0.45)', soft: 'rgba(255,255,255,0.22)' },
    quotes: [
      { text: 'a gospel album with a whole lot of cursing on it', year: 2016, type: 'QUOTE', source: 'Twitter, February 11', context: 'How he himself described it during the chaotic rollout. Title changed three times in the final week.' },
      { text: 'I love this album so much', year: 2016, type: 'QUOTE', source: 'Twitter, February 11', context: 'Tweeted minutes after release. Became a meme template within hours.' },
      { text: 'I am 53 million dollars in personal debt', year: 2016, type: 'QUOTE', source: 'Twitter, February 14', context: 'Followed by a request that Mark Zuckerberg invest one billion dollars in Kanye West ideas. He was serious.' },
      { text: 'Madison Square Garden listening', year: 2016, type: 'EVENT', source: 'February 11, Yeezy Season 3', context: 'Played the album while presenting the fashion line. Streamed to twenty-plus countries simultaneously.' },
      { text: 'living document', year: 2016, type: 'RELEASE', source: 'streaming-era release strategy', context: 'Edited the album live on streaming services for weeks after release. Songs changed under listeners\' ears.' },
      { text: 'Tidal exclusive, then everywhere', year: 2016, type: 'RELEASE', source: 'February-April rollout', context: 'Locked to Tidal at launch as a streaming bet. Six weeks later it leaked everywhere. The bet ended the era of exclusives.' },
      { text: 'Famous, the song', year: 2016, type: 'SAMPLE', source: 'Sister Nancy, Bam Bam', context: 'Rihanna hook, dancehall sample, the Taylor Swift line. The song that re-opened a feud that never closed.' },
      { text: 'Famous, the video', year: 2016, type: 'VIDEO', source: 'wax-figure tableau, Forum LA', context: 'Wax figures of Trump, Taylor, Bush, Rihanna, himself, Kim, naked in one bed. Premiered at the Forum, screened once.' },
      { text: 'Ultralight Beam', year: 2016, type: 'FEATURE', source: 'Chance the Rapper, Kelly Price gospel choir', context: "Opening track. Chance's verse made him a star. The gospel choir became the album's spine." },
      { text: 'No More Parties in LA', year: 2016, type: 'FEATURE', source: 'Kendrick Lamar verse, Madlib production', context: 'Kendrick\'s only feature on the album, on a Madlib beat that had been around for years. Six minutes of nothing wasted.' },
    ],
  },
  {
    id: 'ye', title: 'ye', short: 'YE', year: '2018',
    palette: { bg: '#3F5238', text: '#EDE7D3', accent: '#A8B584', glow: 'rgba(168,181,132,0.40)', soft: 'rgba(168,181,132,0.20)' },
    quotes: [
      { text: 'I hate being Bi-Polar its awesome', year: 2018, type: 'COVER ART', source: 'iPhone photograph, Jackson Hole', context: 'Shot on his iPhone hours before the listening party. Wyoming mountains. The diagnosis printed in marker.' },
      { text: 'five albums in five weeks', year: 2018, type: 'PRODUCTION', source: 'Wyoming sessions', context: 'ye, KIDS SEE GHOSTS, Pusha T DAYTONA, Nas NASIR, Teyana Taylor K.T.S.E. — all seven tracks, all five weeks.' },
      { text: 'seven tracks', year: 2018, type: 'PRODUCTION', source: 'self-imposed format', context: 'Every Wyoming album was exactly seven tracks. A rule he set, executed across five releases, then walked away from.' },
      { text: 'I love the way Candace Owens thinks', year: 2018, type: 'EVENT', source: 'Twitter, April 21', context: 'Started the political turn that defined the era\'s press. Album dropped six weeks later.' },
      { text: 'TMZ, slavery as a choice', year: 2018, type: 'EVENT', source: 'TMZ Live, May 1', context: 'On-camera, off-script. Van Lathan confronted him on air. The moment stopped being a press cycle and became one.' },
      { text: 'the Oval Office visit', year: 2018, type: 'EVENT', source: 'October 11, with President Trump', context: 'MAGA hat, ten-minute monologue, hug across the desk. Photographed for every front page in the world.' },
      { text: 'Ghost Town', year: 2018, type: 'FEATURE', source: '070 Shake outro', context: "Shake's 'I feel kinda free' became the moment a generation walked out of college. Career-making 90 seconds." },
      { text: 'KIDS SEE GHOSTS', year: 2018, type: 'RELEASE', source: 'Cudi reunion, June 8', context: 'Released one week after ye. The two of them on a roof overhead, trading verses. The era\'s emotional ceiling.' },
      { text: 'cover decided that day', year: 2018, type: 'COVER ART', source: 'hours before listening party', context: 'Original cover scrapped morning of the event. He photographed the mountains on his phone, added a marker line, submitted to streaming.' },
      { text: 'ye, just ye', year: 2018, type: 'BIOGRAPHY', source: 'title choice', context: 'Refused to give it a real name. Named it the nickname his fans used for him. The whole album was him reading himself.' },
    ],
  },
  {
    id: 'jik', title: 'Jesus Is King', short: 'JIK', year: '2019',
    palette: { bg: '#4FA3DA', text: '#FFFFFF', accent: '#FFFFFF', glow: 'rgba(255,255,255,0.65)', soft: 'rgba(255,255,255,0.30)' },
    quotes: [
      { text: 'Sunday Service', year: 2019, type: 'EVENT', source: 'weekly gospel sessions', context: 'Started in January as private invitation-only choir sessions. By Coachella in April it was a cultural movement.' },
      { text: 'Coachella sunrise set', year: 2019, type: 'EVENT', source: 'Easter Sunday, April 21', context: 'Performed Sunday Service at sunrise on a hill in the desert. No stage, no headline slot — the festival rebuilt itself around it.' },
      { text: 'IMAX premiere', year: 2019, type: 'FILM', source: 'concert film', context: 'A 38-minute film shot inside the Roden Crater Land Art aesthetic. Premiered in IMAX before the album dropped.' },
      { text: 'no more secular music', year: 2019, type: 'QUOTE', source: 'self-declaration', context: 'Announced he would only make Christian music going forward. Held to it for one album.' },
      { text: 'a cobalt circle', year: 2019, type: 'COVER ART', source: 'minimalist sky-blue square', context: 'Sky-blue square, white circle. Same minimal logic as Yeezus, exact opposite mood.' },
      { text: 'Closed on Sunday', year: 2019, type: 'SINGLE', source: 'Chick-fil-A as devotional metaphor', context: 'Either the most or least Kanye thing he had ever done. The line entered every meme account in the country within a day.' },
      { text: 'Use This Gospel', year: 2019, type: 'FEATURE', source: 'Clipse reunion (Pusha T + Malice)', context: 'Reunited the brothers Thornton for the first time in seven years. Kenny G played the saxophone solo.' },
      { text: 'released six weeks late', year: 2019, type: 'RELEASE', source: 'announced for Sept 27, dropped Oct 25', context: 'Multiple delays. New listening parties announced and canceled. The mythology of perpetual incompletion.' },
      { text: 'Sunday Service Choir', year: 2020, type: 'INFLUENCE', source: 'choir as institution', context: 'The choir released its own album, Jesus Is Born, on Christmas 2019. Kanye stepped back as bandleader.' },
      { text: 'Best Contemporary Christian Album', year: 2021, type: 'AWARD', source: 'Grammy, March 14', context: 'Won the only category his new artistic identity could win. The 22nd Grammy of his career.' },
    ],
  },
  {
    id: 'donda', title: 'Donda', short: 'DONDA', year: '2021',
    palette: { bg: '#0A0A0A', text: '#F5F5F5', accent: '#888888', glow: 'rgba(255,255,255,0.28)', soft: 'rgba(255,255,255,0.10)' },
    quotes: [
      { text: 'three stadium listening parties', year: 2021, type: 'EVENT', source: 'July 22 / August 5 / August 26', context: 'Mercedes-Benz Stadium twice, Soldier Field once. He lived inside the stadium between them, in a cinder-block apartment built on the field.' },
      { text: 'set himself on fire', year: 2021, type: 'EVENT', source: 'Soldier Field listening, Aug 26', context: 'Final scene of the third event. Lit on fire, lifted into the air, lowered back to earth. The album then released that night.' },
      { text: 'named for his mother', year: 2021, type: 'BIOGRAPHY', source: 'album title', context: 'Donda West, who died in 2007. The whole album was the elegy he had owed her for fourteen years.' },
      { text: 'a black square', year: 2021, type: 'COVER ART', source: 'pure black, no text', context: 'No name, no title, no image. A Malevich for streaming services. Spotify had to explain it to its own algorithm.' },
      { text: 'longest album of his career', year: 2021, type: 'RELEASE', source: '27 tracks, 1h 48m', context: 'He had moved past the seven-track rule entirely. Maximalist length as a final stance against minimalism.' },
      { text: 'Manson and DaBaby on stage', year: 2021, type: 'EVENT', source: 'Soldier Field, August 26', context: 'Walked out flanking him during Jail (Pt 2). Two cancelled figures, one stage. The provocation that defined the rollout.' },
      { text: 'Hurricane', year: 2021, type: 'SINGLE', source: '#6 Hot 100, most-streamed of the era', context: 'The Weeknd hook, Lil Baby verse. Won Best Melodic Rap Performance at the Grammys.' },
      { text: 'Jail, the Jay-Z reunion', year: 2021, type: 'FEATURE', source: 'first Jay verse on a Kanye album in five years', context: "Recorded the day of the first listening party. Jay's verse arrived hours before the event started." },
      { text: 'CLB, same week', year: 2021, type: 'EVENT', source: 'Drake feud reignited', context: 'Drake released Certified Lover Boy six days after Donda dropped. The two were trading shots through their album cycles.' },
      { text: 'released without his approval', year: 2021, type: 'RELEASE', source: 'dispute with Universal', context: 'Claimed on Instagram that Universal pushed the album out before he was finished. The first album he disowned at release.' },
    ],
  },
];

const DEFAULT_PALETTE = {
  bg: '#F4F0E8', text: '#1A1714', accent: '#8B7355',
  glow: 'rgba(139,115,85,0.20)', soft: 'rgba(139,115,85,0.10)',
};

// =================================================================
// LAYOUT
// Stable Poisson-ish spread; recomputed when filter changes so the
// active set redistributes to fill the canvas.
// =================================================================
function seededRandom(seed) {
  let s = seed;
  return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
}

function distributeBubbles(items, seed = 1) {
  const rand = seededRandom(seed);
  const cols = Math.max(2, Math.ceil(Math.sqrt(items.length * 1.6)));
  const rows = Math.max(2, Math.ceil(items.length / cols));
  const cells = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) cells.push([r, c]);
  for (let i = cells.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [cells[i], cells[j]] = [cells[j], cells[i]];
  }
  return items.map((item, idx) => {
    const [r, c] = cells[idx % cells.length];
    const xPad = 8, yPad = 14;
    const cellW = (100 - xPad * 2) / cols;
    const cellH = (100 - yPad * 2) / rows;
    const x = xPad + cellW * c + cellW / 2 + (rand() - 0.5) * cellW * 0.55;
    const y = yPad + cellH * r + cellH / 2 + (rand() - 0.5) * cellH * 0.55;
    return {
      ...item,
      x, y,
      drift: 6 + rand() * 8,
      delay: rand() * 6,
      driftDx: (rand() - 0.5) * 14,
      driftDy: (rand() - 0.5) * 10,
    };
  });
}

// =================================================================
// MAIN
// =================================================================
export default function KanyeArchive() {
  const [activeAlbumId, setActiveAlbumId] = useState(null);
  const [hoveredAlbumId, setHoveredAlbumId] = useState(null);
  const [hoveredBubbleId, setHoveredBubbleId] = useState(null);
  const [pinnedQuote, setPinnedQuote] = useState(null);
  const [mouse, setMouse] = useState({ x: -9999, y: -9999, inside: false });
  const fieldRef = useRef(null);

  // Build all bubbles once (default layout)
  const allBubbles = useMemo(() => {
    const items = [];
    ALBUMS.forEach(a => a.quotes.forEach((q, i) =>
      items.push({ id: `${a.id}-${i}`, albumId: a.id, ...q })
    ));
    return distributeBubbles(items, 7);
  }, []);

  // When a filter is active, redistribute the matching subset to fill the canvas
  const filteredBubbles = useMemo(() => {
    if (!activeAlbumId) return allBubbles;
    const matching = allBubbles.filter(b => b.albumId === activeAlbumId);
    return distributeBubbles(matching, 23);
  }, [activeAlbumId, allBubbles]);

  // Build a map by id so we can look up the *current* (filtered or not) position
  const positionById = useMemo(() => {
    const map = new Map();
    filteredBubbles.forEach(b => map.set(b.id, b));
    return map;
  }, [filteredBubbles]);

  // Mouse tracking (RAF-throttled)
  useEffect(() => {
    let raf = null;
    const onMove = (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        setMouse({ x: e.clientX, y: e.clientY, inside: true });
        raf = null;
      });
    };
    const onLeave = () => setMouse(m => ({ ...m, inside: false }));
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // ESC closes pinned card
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setPinnedQuote(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Active palette: pinned > hovered album > active filter > default
  const paletteSource = pinnedQuote
    ? ALBUMS.find(a => a.id === pinnedQuote.albumId)
    : hoveredAlbumId
      ? ALBUMS.find(a => a.id === hoveredAlbumId)
      : activeAlbumId
        ? ALBUMS.find(a => a.id === activeAlbumId)
        : null;
  const palette = paletteSource ? paletteSource.palette : DEFAULT_PALETTE;

  // Compute mouse position in the field's % space (for magnetism)
  const fieldRect = fieldRef.current?.getBoundingClientRect();
  const mxPct = fieldRect ? ((mouse.x - fieldRect.left) / fieldRect.width) * 100 : -100;
  const myPct = fieldRect ? ((mouse.y - fieldRect.top) / fieldRect.height) * 100 : -100;
  const aspectFactor = fieldRect && fieldRect.height > 0 ? fieldRect.width / fieldRect.height : 1.6;
  const MAGNET_RADIUS = 14; // in % of viewport width

  return (
    <div
      style={{
        minHeight: '100vh',
        background: palette.bg,
        color: palette.text,
        transition: 'background-color 900ms cubic-bezier(0.22, 1, 0.36, 1), color 900ms cubic-bezier(0.22, 1, 0.36, 1)',
        fontFamily: '"Instrument Serif", "Cormorant Garamond", Georgia, serif',
        position: 'relative',
        overflow: 'hidden',
        cursor: pinnedQuote ? 'default' : 'none',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@300;400;500&display=swap');

        * { box-sizing: border-box; }

        @keyframes drift {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(var(--dx, 0px), var(--dy, 0px)); }
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translate(-50%, -48%) scale(0.94); }
          to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        @keyframes backdropIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes lineIn {
          from { stroke-dashoffset: 1; opacity: 0; }
          to { stroke-dashoffset: 0; opacity: 0.5; }
        }
        @keyframes dotIn {
          from { opacity: 0; }
          to { opacity: 0.85; }
        }

        .constellation {
          position: absolute; inset: 0;
          pointer-events: none;
          z-index: 3;
          width: 100%; height: 100%;
          overflow: visible;
        }
        .constellation-line {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          opacity: 0;
          animation: lineIn 800ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
          filter: drop-shadow(0 0 3px currentColor);
        }
        .constellation-dot {
          opacity: 0;
          animation: dotIn 500ms ease forwards;
          filter: drop-shadow(0 0 4px currentColor);
        }

        .grain::before {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          opacity: 0.05; mix-blend-mode: multiply;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
        }

        .bubble-wrap {
          position: absolute;
          will-change: transform, left, top;
          transition:
            left 1100ms cubic-bezier(0.22, 1, 0.36, 1),
            top 1100ms cubic-bezier(0.22, 1, 0.36, 1),
            opacity 700ms ease,
            transform 250ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .bubble-drift {
          animation: drift var(--drift, 10s) ease-in-out infinite;
          animation-delay: var(--delay, 0s);
        }
        .bubble {
          display: inline-block;
          padding: 0.5em 0.95em;
          border-radius: 999px;
          font-style: italic;
          letter-spacing: -0.01em;
          line-height: 1.18;
          cursor: pointer;
          user-select: none;
          white-space: nowrap;
          backdrop-filter: blur(2px);
          transition:
            transform 500ms cubic-bezier(0.22, 1, 0.36, 1),
            font-size 500ms cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 500ms ease,
            background-color 500ms ease,
            color 500ms ease,
            filter 500ms ease,
            opacity 500ms ease;
          will-change: transform;
        }
        .bubble.long { white-space: normal; max-width: 22ch; text-align: center; }
        .bubble:hover {
          transform: scale(1.45);
          filter: drop-shadow(0 12px 30px var(--glow, rgba(0,0,0,0.15)));
        }
        .bubble.dim { opacity: 0.05; pointer-events: none; filter: blur(1.5px); }

        .filter-pill {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase;
          padding: 6px 11px; border-radius: 999px;
          border: 1px solid currentColor; background: transparent; color: inherit;
          cursor: pointer; opacity: 0.5;
          transition: opacity 300ms ease, background-color 300ms ease, transform 300ms ease;
        }
        .filter-pill:hover { opacity: 1; transform: translateY(-1px); }
        .filter-pill.active { opacity: 1; background: currentColor; }
        .filter-pill.active span { color: var(--bg, #fff); mix-blend-mode: difference; }

        .meta {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase;
        }

        .aurora {
          position: fixed;
          width: 600px; height: 600px;
          border-radius: 50%;
          pointer-events: none;
          mix-blend-mode: multiply;
          filter: blur(60px);
          z-index: 1;
          transform: translate(-50%, -50%);
          transition: opacity 600ms ease, background 900ms ease;
        }

        .cursor-dot {
          position: fixed; pointer-events: none;
          width: 10px; height: 10px; border-radius: 50%;
          transform: translate(-50%, -50%);
          mix-blend-mode: difference; background: white;
          z-index: 1000;
          transition: opacity 250ms ease;
        }

        .archive-backdrop {
          position: fixed; inset: 0; z-index: 100;
          background: rgba(0,0,0,0.45);
          backdrop-filter: blur(8px);
          animation: backdropIn 400ms ease forwards;
        }
        .archive-card {
          position: fixed; left: 50%; top: 50%;
          transform: translate(-50%, -50%);
          width: min(560px, 92vw);
          padding: 44px 44px 36px;
          border-radius: 4px;
          z-index: 101;
          animation: cardIn 600ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .archive-card .close {
          position: absolute; top: 14px; right: 14px;
          width: 32px; height: 32px; border-radius: 50%;
          border: none; background: transparent; color: inherit;
          cursor: pointer; opacity: 0.5; font-size: 20px;
          transition: opacity 200ms ease;
        }
        .archive-card .close:hover { opacity: 1; }
      `}</style>

      <div className="grain" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }} />

      {/* Cursor aurora — soft palette glow following the mouse */}
      <div
        className="aurora"
        style={{
          left: mouse.x, top: mouse.y,
          background: `radial-gradient(circle, ${palette.glow} 0%, transparent 70%)`,
          opacity: mouse.inside && !pinnedQuote ? 0.85 : 0,
        }}
      />

      {/* Custom cursor dot (only when not pinned) */}
      {!pinnedQuote && (
        <div
          className="cursor-dot"
          style={{ left: mouse.x, top: mouse.y, opacity: mouse.inside ? 0.9 : 0 }}
        />
      )}

      {/* Header */}
      <header style={{
        padding: '32px 36px 0', display: 'flex', justifyContent: 'space-between',
        alignItems: 'baseline', flexWrap: 'wrap', gap: 16, position: 'relative', zIndex: 5,
      }}>
        <div>
          <div className="meta" style={{ marginBottom: 6, opacity: 0.6 }}>an interactive archive</div>
          <h1 style={{
            fontFamily: '"Instrument Serif", serif',
            fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 400,
            letterSpacing: '-0.03em', lineHeight: 0.9, margin: 0,
          }}>
            ye <em style={{ opacity: 0.55 }}>/ across eras</em>
          </h1>
        </div>
        <div className="meta" style={{ textAlign: 'right' }}>
          {paletteSource ? (
            <>
              <div style={{ fontSize: 16, letterSpacing: '0.04em', textTransform: 'none', fontFamily: '"Instrument Serif", serif', fontStyle: 'italic' }}>
                {paletteSource.title}
              </div>
              <div style={{ opacity: 0.7 }}>{paletteSource.year}</div>
            </>
          ) : (
            <>
              <div style={{ fontSize: 16, letterSpacing: '0.04em', textTransform: 'none', fontFamily: '"Instrument Serif", serif', fontStyle: 'italic' }}>
                hover to preview · click for the archive entry
              </div>
              <div style={{ opacity: 0.7 }}>2004 — 2021</div>
            </>
          )}
        </div>
      </header>

      {/* Filter row */}
      <nav
        style={{ padding: '20px 36px 0', display: 'flex', flexWrap: 'wrap', gap: 8, position: 'relative', zIndex: 5 }}
        onMouseLeave={() => setHoveredAlbumId(null)}
      >
        <button
          className={`filter-pill ${activeAlbumId === null ? 'active' : ''}`}
          style={{ '--bg': palette.bg }}
          onClick={() => setActiveAlbumId(null)}
          onMouseEnter={() => setHoveredAlbumId(null)}
        >
          <span>All</span>
        </button>
        {ALBUMS.map(a => (
          <button
            key={a.id}
            className={`filter-pill ${activeAlbumId === a.id ? 'active' : ''}`}
            style={{ '--bg': palette.bg }}
            onClick={() => setActiveAlbumId(activeAlbumId === a.id ? null : a.id)}
            onMouseEnter={() => setHoveredAlbumId(a.id)}
          >
            <span>{a.short} · {a.year.slice(2)}</span>
          </button>
        ))}
      </nav>

      {/* Bubble field */}
      <main
        ref={fieldRef}
        style={{ position: 'relative', width: '100%', height: 'calc(100vh - 180px)', minHeight: 540, zIndex: 2 }}
      >
        {/* Constellation layer — lines + dots from hovered bubble to all same-era bubbles */}
        <svg
          className="constellation"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {hoveredBubbleId && !pinnedQuote && (() => {
            const center = positionById.get(hoveredBubbleId);
            if (!center) return null;
            const album = ALBUMS.find(a => a.id === center.albumId);
            const peers = Array.from(positionById.values())
              .filter(b => b.albumId === center.albumId && b.id !== hoveredBubbleId);
            return (
              <g style={{ color: album.palette.accent }}>
                {peers.map((b, i) => (
                  <line
                    key={`line-${b.id}`}
                    className="constellation-line"
                    x1={center.x} y1={center.y}
                    x2={b.x} y2={b.y}
                    stroke="currentColor"
                    strokeWidth="0.18"
                    strokeLinecap="round"
                    pathLength="1"
                    vectorEffect="non-scaling-stroke"
                    style={{ animationDelay: `${i * 60}ms` }}
                  />
                ))}
                {peers.map((b, i) => (
                  <circle
                    key={`dot-${b.id}`}
                    className="constellation-dot"
                    cx={b.x} cy={b.y} r="0.45"
                    fill="currentColor"
                    vectorEffect="non-scaling-stroke"
                    style={{ animationDelay: `${300 + i * 60}ms` }}
                  />
                ))}
              </g>
            );
          })()}
        </svg>

        {allBubbles.map(b => {
          const album = ALBUMS.find(a => a.id === b.albumId);
          const isFilteredOut = activeAlbumId && activeAlbumId !== b.albumId;
          const pos = positionById.get(b.id) || b;
          const isLong = b.text.length > 28;
          const baseSize = isLong ? 18 : b.text.length < 14 ? 26 : 22;

          // Magnetism: scale & background based on cursor proximity
          const dx = mxPct - pos.x;
          const dy = (myPct - pos.y) * aspectFactor; // normalize y to x scale
          const distPct = Math.sqrt(dx * dx + dy * dy);
          const proximity = isFilteredOut || pinnedQuote ? 0 : Math.max(0, 1 - distPct / MAGNET_RADIUS);
          const magScale = 1 + proximity * 0.28;
          const magBg = proximity > 0.05 ? album.palette.soft : 'transparent';

          return (
            <div
              key={b.id}
              className="bubble-wrap"
              style={{
                left: `${pos.x}%`, top: `${pos.y}%`,
                transform: `translate(-50%, -50%) scale(${magScale})`,
                opacity: pinnedQuote && pinnedQuote.id !== b.id ? 0.15 : 1,
              }}
            >
              <div
                className="bubble-drift"
                style={{ '--drift': `${pos.drift}s`, '--delay': `${pos.delay}s`, '--dx': `${pos.driftDx}px`, '--dy': `${pos.driftDy}px` }}
              >
                <span
                  className={`bubble ${isLong ? 'long' : ''} ${isFilteredOut ? 'dim' : ''}`}
                  style={{
                    fontSize: baseSize,
                    background: magBg,
                    color: 'inherit',
                    '--glow': album.palette.glow,
                  }}
                  onMouseEnter={() => {
                    setHoveredAlbumId(b.albumId);
                    setHoveredBubbleId(b.id);
                  }}
                  onMouseLeave={() => {
                    setHoveredAlbumId(null);
                    setHoveredBubbleId(null);
                  }}
                  onClick={() => setPinnedQuote(b)}
                >
                  {b.text}
                </span>
              </div>
            </div>
          );
        })}
      </main>

      {/* Archive card overlay */}
      {pinnedQuote && (() => {
        const album = ALBUMS.find(a => a.id === pinnedQuote.albumId);
        return (
          <>
            <div className="archive-backdrop" onClick={() => setPinnedQuote(null)} />
            <article
              className="archive-card"
              style={{
                background: album.palette.bg,
                color: album.palette.text,
                boxShadow: `0 40px 100px -20px ${album.palette.glow}, 0 0 0 1px ${album.palette.soft}`,
              }}
            >
              <button className="close" onClick={() => setPinnedQuote(null)} aria-label="Close">×</button>
              <div className="meta" style={{ opacity: 0.6, marginBottom: 18 }}>
                {album.short} · {pinnedQuote.year}{pinnedQuote.type ? ` · ${pinnedQuote.type}` : ''}
              </div>
              <blockquote style={{
                fontFamily: '"Instrument Serif", serif',
                fontStyle: 'italic',
                fontSize: 'clamp(26px, 3.4vw, 36px)',
                lineHeight: 1.18,
                letterSpacing: '-0.02em',
                margin: '0 0 28px',
              }}>
                "{pinnedQuote.text}"
              </blockquote>
              <div style={{
                display: 'flex', flexDirection: 'column', gap: 12,
                paddingTop: 20, borderTop: `1px solid ${album.palette.soft}`,
              }}>
                <div>
                  <div className="meta" style={{ opacity: 0.5, marginBottom: 4 }}>Source</div>
                  <div style={{ fontFamily: '"Instrument Serif", serif', fontSize: 16 }}>{pinnedQuote.source}</div>
                </div>
                <div>
                  <div className="meta" style={{ opacity: 0.5, marginBottom: 4 }}>Context</div>
                  <div style={{ fontFamily: '"Instrument Serif", serif', fontSize: 16, lineHeight: 1.5 }}>{pinnedQuote.context}</div>
                </div>
              </div>
              <div className="meta" style={{ opacity: 0.4, marginTop: 24, fontSize: 9 }}>
                ESC or click outside to close
              </div>
            </article>
          </>
        );
      })()}

      {/* Footer */}
      <footer style={{
        position: 'absolute', bottom: 18, left: 36, right: 36,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
        letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.55, zIndex: 5,
      }}>
        <span>{filteredBubbles.length} entries · {ALBUMS.length} eras</span>
        <span>palette: {paletteSource ? paletteSource.short : 'default'}</span>
      </footer>
    </div>
  );
}
