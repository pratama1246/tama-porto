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
      className="py-10 px-6 md:py-24 md:px-12 lg:px-20 max-w-[1600px] mx-auto w-full"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
      >
        {/* Section Title - Span full width on mobile, top on desktop */}
        <motion.div variants={fadeUp} className="md:col-span-12 mb-4">
          <h2
            className="inline-block px-5 py-2 md:px-7 md:py-3 rounded-xl text-xl sm:text-2xl md:text-4xl font-display font-extrabold text-ink-black bg-sticker-pink border-2 border-ink-black neo-shadow rotate-[-1deg] tracking-tight m-0 select-none"
          >
            About Me
          </h2>
        </motion.div>


        {/* Left Side: Polaroid Card (5 cols on desktop, centered overlapping on mobile) */}
        <motion.div
          variants={fadeUp}
          className="md:col-span-5 flex justify-center relative py-2 sm:py-6 -mb-4 md:mb-0 z-10"
        >
          {/* Polaroid Frame */}
          <div
            className="relative bg-white p-3 pb-6 sm:pb-8 rounded-lg neo-shadow border-2 border-ink-black transition-all duration-300 hover:rotate-0 hover:scale-[1.02] w-[clamp(220px,65vw,280px)]"
            style={{
              transform: 'rotate(-2.5deg)',
            }}
          >
            {/* CSS Paper Clip Decorator */}
            <div 
              className="absolute -top-3.5 left-1/3 w-[12px] h-[34px] border-2 border-ink-black rounded-full z-20 bg-transparent rotate-[18deg] pointer-events-none"
              aria-hidden="true"
            >
              <div className="absolute top-[3px] left-[1.5px] w-[6px] h-[20px] border-2 border-ink-black rounded-full bg-transparent" />
            </div>

            {/* Polaroid Photo Image */}
            <div className="w-full aspect-square bg-[#f5e6c8] overflow-hidden rounded-md border-2 border-ink-black">
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
              className="text-center mt-3 sm:mt-4 text-[0.85rem] sm:text-[0.9rem] font-medium text-text-handwrite select-none"
              style={{ fontFamily: 'var(--font-handwrite)' }}
            >
              me_in_studio.jpg
            </div>
          </div>

          {/* Washi Tape Strip at bottom left of polaroid */}
          <div
            className="absolute -bottom-1 -left-1 sm:-bottom-2 sm:-left-2 w-[65px] sm:w-[75px] h-[18px] sm:h-[20px] bg-mint opacity-85 border border-ink-black/40 z-10 rotate-[-12deg] rounded-xs pointer-events-none"
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
            className="bg-white p-6 md:p-8 rounded-lg neo-shadow border-2 border-ink-black relative overflow-hidden rotate-[1deg]"
            style={{
              backgroundImage: 'linear-gradient(var(--bg-secondary) 1px, transparent 1px)',
              backgroundSize: '100% 28px',
              lineHeight: '28px'
            }}
          >
            {/* Notebook Margin Line */}
            <div className="absolute top-0 bottom-0 left-8 md:left-12 border-l border-red-300" aria-hidden="true" />

            <div className="pl-6 md:pl-10">
              <h3
                className="font-display font-bold text-xl text-ink-black mb-4"
              >
                Hi, I'm Tama!
              </h3>
              <p
                className="text-sm md:text-[0.95rem] text-ink-black leading-relaxed font-body"
                style={{ lineHeight: '28px' }}
              >
                I am currently pursuing my D3 Informatics Engineering degree at <strong>Politeknik Negeri Cilacap</strong>. 
                With a passion for UI/UX design and frontend development, I love bridging the gap between design systems in Figma and functional, responsive code.
              </p>
              <p
                className="text-sm md:text-[0.95rem] text-ink-black leading-relaxed mt-4 font-body"
                style={{ lineHeight: '28px' }}
              >
                Currently, I am expanding my skills in React, component-based architectures, and modern styling tools like Tailwind CSS. Backed by a foundation in computer networking and IT systems, I strive to build digital products that balance aesthetics, usability, and technical reliability.
              </p>
            </div>
          </div>

          {/* Sticky Note Row */}
          <div className="flex justify-end md:justify-start pl-0 md:pl-8 mt-2">
            <motion.div
              whileHover={{ scale: 1.05, rotate: '3deg' }}
              className="bg-pale-yellow p-5 rounded-lg neo-shadow border-2 border-ink-black max-w-[260px]"
              style={{
                transform: 'rotate(2deg)',
              }}
            >
              <h4 
                className="text-[0.8rem] font-mono font-bold text-text-handwrite border-b-2 border-ink-black/20 pb-1 mb-2.5 tracking-wide uppercase"
              >
                QUICK STATS:
              </h4>
              <ul
                className="list-none p-0 m-0 flex flex-col gap-1.5 text-[0.85rem] font-medium text-text-handwrite"
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
