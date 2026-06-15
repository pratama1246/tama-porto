import { useState } from 'react';
import { motion } from 'framer-motion';
import TiltedCard from '../reactbits/TiltedCard';
import { musicList } from '../../data/hobbies';

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
  const [showMusic, setShowMusic] = useState(false);

  return (
    <section 
      id="hobbies" 
      className="py-10 px-4 md:py-24 md:px-8 max-w-6xl mx-auto relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute right-[5%] top-[8%] w-16 h-16 bg-[var(--accent-lavender)] opacity-20 rounded-full blur-xl pointer-events-none" />

      {/* Section Header */}
      <motion.div 
        className="text-center mb-10 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
      >
        <h2 className="font-display text-2xl md:text-3.5xl text-[var(--text-dark)] rotate-[-1deg] inline-block relative">
          🎵 currently on repeat
          {/* Accent line under heading */}
          <span className="absolute -bottom-2 left-0 right-0 h-[3px] bg-[var(--accent-pink)] opacity-60 rounded-full rotate-[0.5deg]" />
        </h2>
        <p className="font-handwrite text-md md:text-lg text-[var(--text-handwrite)] mt-4">
          what i listen to when i'm coding
        </p>
      </motion.div>

      {/* Toggle Button */}
      <motion.div 
        className="flex justify-center mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <button
          onClick={() => setShowMusic(!showMusic)}
          className="px-6 py-2.5 bg-[var(--accent-pink)] border-2 border-[var(--text-dark)] rounded-sm font-display font-semibold text-sm md:text-base text-[var(--text-dark)] shadow-[3px_3px_0px_var(--text-dark)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all cursor-pointer flex items-center gap-2 select-none"
        >
          {showMusic ? "🙈 HIDE MY PLAYLIST" : "💿 SHOW MY PLAYLIST"}
        </button>
      </motion.div>

      {/* Music Grid with Smooth Height Collapsing */}
      <motion.div
        initial={false}
        animate={{ 
          height: showMusic ? "auto" : 0, 
          opacity: showMusic ? 1 : 0 
        }}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }} // smooth cubic easeOut
        style={{ pointerEvents: showMusic ? 'auto' : 'none' }}
        className="overflow-hidden w-full"
      >
        <motion.div 
          className="flex flex-row flex-wrap justify-center gap-12 xl:gap-10 w-full pt-4 pb-8"
          initial="hidden"
          animate={showMusic ? "visible" : "hidden"}
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
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-[var(--accent-pink)] opacity-85 -rotate-1 rounded-[2px] shadow-xs flex items-center justify-center text-[10px] font-handwrite text-[#4a3728] tracking-wider select-none z-10 pointer-events-none">
                🎵 NOW SPINNING
              </div>

              <div className="bg-white p-3 pb-4 shadow-sm rounded-[6px] border border-[#e5dec9]">
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
              <div className="absolute -bottom-2 -left-2 w-12 h-5 bg-[var(--accent-blue)] opacity-60 rotate-[-12deg] rounded-[1px] pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
