import { useState } from 'react';
import { motion } from 'framer-motion';
import TiltedCard from '../reactbits/TiltedCard';
import { featuredPlaylists, musicList } from '../../data/hobbies';

// Scroll reveal animations
const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' }
  }
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

export default function Hobbies() {
  const [showMoreAlbums, setShowMoreAlbums] = useState(false);

  return (
    <section 
      id="hobbies" 
      className="py-10 px-4 sm:px-6 md:py-20 md:px-12 lg:px-20 max-w-[1600px] mx-auto w-full relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute right-[5%] top-[8%] w-24 h-24 bg-[var(--accent-lavender)] opacity-20 rounded-full blur-xl pointer-events-none" />
      <div className="absolute left-[5%] bottom-[12%] w-28 h-28 bg-[var(--accent-mint)] opacity-15 rounded-full blur-xl pointer-events-none" />

      {/* Section Header */}
      <motion.div 
        className="text-center mb-8 sm:mb-10 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
      >
        <h2 className="font-display font-extrabold text-xl sm:text-2xl md:text-4xl text-ink-black bg-sticker-pink border-2 border-ink-black neo-shadow rotate-[-1deg] inline-block px-5 py-2 md:px-7 md:py-3 rounded-xl select-none">
          🎵 currently on repeat
        </h2>
        <p 
          className="text-base sm:text-lg md:text-xl text-text-handwrite mt-3 font-semibold select-none"
          style={{ fontFamily: 'var(--font-handwrite)' }}
        >
          the late-night coding soundtrack keeping me in the zone
        </p>
      </motion.div>

      {/* Featured Spotify Playlists: 2-Column Responsive Grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeUp}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-10 max-w-[1400px] w-full mx-auto relative mb-12 sm:mb-16"
      >
        {featuredPlaylists.map((pl, idx) => {
          const tapeColors = ['bg-pale-yellow', 'bg-sticker-pink', 'bg-mint'];
          const cornerColors = ['bg-soft-blue', 'bg-[#ffd4b8]', 'bg-pale-yellow'];
          const isThird = idx === 2;
          return (
            <div 
              key={pl.id} 
              className={`relative ${isThird ? 'lg:col-span-2 lg:max-w-[calc(50%-1.25rem)] lg:mx-auto w-full' : ''}`}
            >
              {/* Top Washi Tape */}
              <div 
                className={`absolute -top-3.5 left-1/2 -translate-x-1/2 h-6 px-4 ${tapeColors[idx % 3]} ${idx % 2 === 0 ? '-rotate-1' : 'rotate-1'} border border-ink-black/40 rounded-xs neo-shadow-sm flex items-center justify-center text-[10px] sm:text-xs font-mono font-bold text-ink-black tracking-wider select-none z-20 pointer-events-none whitespace-nowrap`}
                style={{ clipPath: 'polygon(0% 5%, 3% 0%, 97% 4%, 100% 12%, 98% 88%, 95% 100%, 3% 95%, 0% 88%)' }}
              >
                {pl.tapeLabel.toUpperCase()} // SPOTIFY PLAYER
              </div>

              {/* Outer Mixtape Card */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-ink-black neo-shadow relative z-10 h-full flex flex-col justify-between">
                
                {/* Custom Playlist Header Info */}
                <div className={`${pl.themeBg} text-white p-4 sm:p-5 rounded-xl border-2 border-ink-black neo-shadow-sm mb-4 relative overflow-hidden`}>
                  
                  {/* Background Ambient Glow */}
                  <div className={`absolute -right-8 -top-8 w-32 h-32 ${pl.accentGlow} rounded-full blur-2xl pointer-events-none`} />

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 relative z-10">

                    {/* Header Texts */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-white/20 text-white font-semibold">
                          {pl.tag}
                        </span>
                        <span className="text-[11px] text-white/70">
                          • Spotify
                        </span>
                      </div>

                      <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight leading-tight m-0 truncate">
                        {pl.title}
                      </h3>

                      {pl.description && (
                        <p 
                          className="text-xs sm:text-sm text-white/80 mt-1 italic leading-snug"
                          style={{ fontFamily: 'var(--font-handwrite)' }}
                        >
                          "{pl.description}"
                        </p>
                      )}

                      {/* Curator Credit Badge */}
                      <div className="mt-2.5 flex items-center gap-2 pt-2 border-t border-white/15 text-[11px] text-white/90">
                        <span className="font-semibold text-sticker-pink">
                          👤 Curated with 🎧 by {pl.curator}
                        </span>
                      </div>
                    </div>

                    {/* Open in Spotify Button */}
                    <a
                      href={pl.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="self-end sm:self-center px-3 py-1.5 rounded-lg bg-[#1DB954] text-white font-mono text-[11px] font-bold tracking-wider hover:bg-[#1aa34a] border border-black/30 neo-shadow-sm transition-transform active:scale-95 no-underline flex items-center gap-1.5 shrink-0"
                    >
                      <span>Open</span>
                      <span>↗</span>
                    </a>
                  </div>
                </div>

                {/* Spotify Embedded iFrame Player */}
                <div className="rounded-xl overflow-hidden border-2 border-ink-black bg-black flex-grow">
                  <iframe 
                    key={pl.id}
                    data-testid="embed-iframe" 
                    style={{ borderRadius: '10px' }} 
                    src={pl.embedUrl} 
                    width="100%" 
                    height="352" 
                    frameBorder="0" 
                    allowFullScreen="" 
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                    loading="lazy"
                    title={`${pl.title} Spotify Embed`}
                    className="w-full block"
                  />
                </div>

                {/* Bottom Bar: Earphones Prompt */}
                <div className="mt-3.5 pt-2.5 border-t border-ink-black/15 flex items-center justify-center gap-1.5 text-[11px] sm:text-xs font-mono font-bold text-ink-black/80 select-none">
                  <span>🎧</span>
                  <span>Plug in your earphones for the best experience</span>
                </div>

              </div>

              {/* Bottom Corner Washi Tape Decor */}
              <div 
                className={`absolute -bottom-3 -right-3 w-14 h-5 ${cornerColors[idx % 3]} ${idx % 2 === 0 ? 'rotate-[6deg]' : '-rotate-[6deg]'} border border-ink-black/40 rounded-xs pointer-events-none z-20`} 
                style={{ clipPath: 'polygon(0% 10%, 4% 0%, 96% 5%, 100% 12%, 98% 88%, 94% 100%, 6% 95%, 0% 90%)' }}
              />
            </div>
          );
        })}
      </motion.div>

      {/* More Favorite Albums Toggle */}
      <motion.div 
        className="flex flex-col items-center justify-center mb-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <button
          onClick={() => setShowMoreAlbums(!showMoreAlbums)}
          className="px-5 py-2.5 bg-pale-yellow hover:bg-[#ffe999] border-2 border-ink-black rounded-lg font-mono font-bold text-xs sm:text-sm text-ink-black neo-shadow neo-shadow-hover transition-all cursor-pointer flex items-center gap-2 select-none"
        >
          {showMoreAlbums ? "🙈 HIDE INDIVIDUAL ALBUMS" : "💿 EXPLORE MORE FAVORITE ALBUMS"}
        </button>
      </motion.div>

      {/* Expandable Music Grid for Individual Albums (5 Albums Flex Grid) */}
      <motion.div
        initial={false}
        animate={{ 
          height: showMoreAlbums ? "auto" : 0, 
          opacity: showMoreAlbums ? 1 : 0 
        }}
        transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
        style={{ pointerEvents: showMoreAlbums ? 'auto' : 'none' }}
        className="overflow-hidden w-full"
      >
        <motion.div 
          className="flex flex-row flex-wrap justify-center gap-6 xl:gap-7 max-w-[1550px] w-full mx-auto pt-10 pb-12 px-4 sm:px-6"
          initial="hidden"
          animate={showMoreAlbums ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {musicList.map((music) => (
            <motion.div 
              key={music.id}
              className="relative shrink-0"
              style={{ rotate: music.rotation }}
              variants={fadeUp}
              whileHover={{ 
                rotate: '0deg',
                y: -6,
                zIndex: 10,
                transition: { duration: 0.2, ease: 'easeOut' }
              }}
              transition={{ type: 'tween', duration: 0.2, ease: 'easeOut' }}
            >
              {/* Washi Tape */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-sticker-pink border border-ink-black/40 -rotate-1 rounded-xs neo-shadow-sm flex items-center justify-center text-[10px] font-mono font-bold text-ink-black tracking-wider select-none z-10 pointer-events-none">
                🎵 ON REPEAT
              </div>

              <div className="bg-white p-3 pb-4 neo-shadow rounded-lg border-2 border-ink-black">
                <a 
                  href={music.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block cursor-pointer mt-2"
                  title="Click to listen on Spotify"
                >
                  <TiltedCard
                    imageSrc={music.coverImage}
                    altText={music.title}
                    captionText="🔗 Click to open Spotify"
                    isPolaroid={true}
                    polaroidLabel={`💿 ${music.title.toLowerCase()} - ${music.artist.toLowerCase()}`}
                    imageWidth="240px"
                    imageHeight="240px"
                    containerWidth="260px"
                    containerHeight="310px"
                    scaleOnHover={1.03}
                    rotateAmplitude={8}
                    showTooltip={true}
                  />
                </a>
              </div>

              {/* Tape decoration at bottom */}
              <div className="absolute -bottom-2 -left-2 w-12 h-5 bg-soft-blue border border-ink-black/40 rotate-[-12deg] rounded-xs pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
