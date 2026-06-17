import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 }
  }
}

export default function About() {
  return (
    <section
      id="about"
      className="py-10 px-4 md:py-24 md:px-8 max-w-7xl mx-auto"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
      >
        {/* Section Title - Span full width on mobile, top on desktop */}
        <div className="md:col-span-12 mb-4">
          <motion.div
            variants={fadeUp}
            className="inline-block px-3 py-1 rounded-sm text-[12px] font-semibold uppercase tracking-wider bg-[var(--accent-pink)] border border-black/5 rotate-[-1deg] mb-2"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            My Profile
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display font-semibold text-[1.5rem] md:text-[2rem] tracking-tight text-[var(--text-dark)] m-0"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Inside the Pinboard
          </motion.h2>
        </div>


        {/* Left Side: Polaroid Card (4 cols) */}
        <motion.div
          variants={fadeUp}
          className="md:col-span-5 flex justify-center relative py-6"
        >
          {/* Polaroid Frame */}
          <div
            className="relative bg-white p-3 pb-8 rounded-sm shadow-sm transition-transform duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-md max-w-[280px]"
            style={{
              transform: 'rotate(-3deg)',
              border: '1px solid rgba(0,0,0,0.06)'
            }}
          >
            {/* CSS Paper Clip Decorator */}
            <div 
              className="absolute -top-4 left-1/3 w-[12px] h-[36px] border-2 border-[var(--text-muted)] rounded-full z-20 bg-transparent rotate-[18deg]"
              aria-hidden="true"
            >
              <div className="absolute top-[4px] left-[1.5px] w-[6px] h-[22px] border-2 border-[var(--text-muted)] rounded-full bg-transparent" />
            </div>

            {/* Polaroid Photo Image */}
            <div className="w-[256px] h-[256px] bg-[#f5e6c8] overflow-hidden rounded-[2px] border border-black/5">
              <img
                src="/assets/photos/avatar.webp"
                alt="Tama Purwanto"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                className="protected-image w-full h-full object-cover grayscale-[10%]"
                loading="lazy"
              />
            </div>

            {/* Handwritten Label */}
            <div
              className="text-center mt-4 text-[0.85rem] text-[var(--text-handwrite)] select-none"
              style={{ fontFamily: 'var(--font-handwrite)' }}
            >
              me_in_studio.jpg
            </div>
          </div>

          {/* Washi Tape Strip at bottom left of polaroid */}
          <div
            className="absolute -bottom-2 -left-2 w-[75px] h-[18px] bg-[var(--accent-mint)] opacity-80 border border-black/5 z-10 rotate-[-12deg] rounded-sm pointer-events-none"
            style={{ mixBlendMode: 'multiply' }}
            aria-hidden="true"
          />
        </motion.div>

        {/* Right Side: Notebook Paper Bio & Sticky Note (7 cols) */}
        <motion.div
          variants={fadeUp}
          className="md:col-span-7 flex flex-col gap-6"
        >
          {/* Notebook Paper Sheet Container */}
          <div
            className="bg-[#fefcf7] p-6 md:p-8 rounded-sm shadow-sm border border-black/5 relative overflow-hidden rotate-[1deg]"
            style={{
              backgroundImage: 'linear-gradient(var(--bg-secondary) 1px, transparent 1px)',
              backgroundSize: '100% 28px',
              lineHeight: '28px'
            }}
          >
            {/* Notebook Margin Line */}
            <div className="absolute top-0 bottom-0 left-8 md:left-12 border-l border-red-200" aria-hidden="true" />

            <div className="pl-6 md:pl-10">
              <h3
                className="font-display font-medium text-lg text-[var(--text-dark)] mb-4"
                style={{ fontFamily: 'var(--font-display)', lineHeight: '1.2' }}
              >
                Hi, I'm Tama!
              </h3>
              <p
                className="text-sm md:text-[0.95rem] text-[var(--text-dark)] leading-relaxed"
                style={{ fontFamily: 'var(--font-body)', lineHeight: '28px' }}
              >
                I am currently pursuing my D3 Informatics Engineering degree at <strong>Politeknik Negeri Cilacap</strong>. 
                With a passion for UI/UX design and frontend development, I love bridging the gap between design systems in Figma and functional, responsive code.
              </p>
              <p
                className="text-sm md:text-[0.95rem] text-[var(--text-dark)] leading-relaxed mt-4"
                style={{ fontFamily: 'var(--font-body)', lineHeight: '28px' }}
              >
                Currently, I am expanding my skills in React, component-based architectures, and modern styling tools like Tailwind CSS. Backed by a foundation in computer networking and IT systems, I strive to build digital products that balance aesthetics, usability, and technical reliability.
              </p>
            </div>
          </div>

          {/* Sticky Note Row */}
          <div className="flex justify-end md:justify-start pl-0 md:pl-8 mt-2">
            <motion.div
              whileHover={{ scale: 1.05, rotate: '5deg' }}
              className="bg-[var(--accent-yellow)] p-4 rounded-sm shadow-xs max-w-[220px]"
              style={{
                transform: 'rotate(2deg)',
                border: '1px solid rgba(0,0,0,0.04)'
              }}
            >
              <h4 
                className="text-[0.85rem] font-semibold text-[var(--text-handwrite)] border-b border-[var(--text-handwrite)]/10 pb-1 mb-2 tracking-wide uppercase"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                QUICK STATS:
              </h4>
              <ul
                className="list-none p-0 m-0 flex flex-col gap-1.5 text-[0.85rem] text-[var(--text-handwrite)]"
                style={{ fontFamily: 'var(--font-handwrite)' }}
              >
                <li>📌 D3 Informatics @ PNC</li>
                <li>🎨 Figma & UI Enthusiast</li>
                <li>🛠️ PHP & Laravel Basics</li>
                <li>🌐 Networking foundations</li>
                <li>🚀 Learning React & GSAP</li>
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
