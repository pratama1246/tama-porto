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


export default function Contact() {
  return (
    <section
      id="contact"
      className="relative bg-(--bg-secondary) pt-12 pb-0 px-0 mt-6 md:pt-24 md:mt-12 w-full"
    >
      {/* Decorative Torn Paper Edge at the top, separate from content to keep spikes small and avoid clipping */}
      <div 
        className="absolute -top-8.75 left-0 right-0 h-9 bg-(--bg-secondary) torn-edge pointer-events-none" 
        aria-hidden="true"
      />
      <div className="max-w-[1600px] mx-auto w-full px-6 md:px-12 lg:px-20 pb-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center text-center gap-10"
        >
          {/* Section Header */}
          <motion.div variants={fadeUp}>
            <h2
              className="inline-block px-5 py-2 md:px-7 md:py-3 rounded-xl text-xl sm:text-2xl md:text-4xl font-display font-extrabold text-ink-black bg-pale-yellow border-2 border-ink-black neo-shadow rotate-[-1.5deg] tracking-tight m-0 select-none"
            >
              Get In Touch
            </h2>
          </motion.div>

          {/* Invitation Letter */}
          <motion.div
            variants={fadeUp}
            className="bg-[#fefcf7] p-6 pr-24 sm:pr-28 md:p-8 md:pr-32 rounded-2xl border-2 border-ink-black neo-shadow max-w-150 w-full text-left rotate-[0.5deg] relative overflow-visible"
          >
            {/* Postage Stamp */}
            <div className="absolute top-4 right-4 md:top-6 md:right-6 w-14 h-18 md:w-16 md:h-20 bg-sticker-pink border-2 border-ink-black rounded-lg flex flex-col items-center justify-between p-1.5 rotate-6 neo-shadow-sm select-none z-10">
              <div className="text-[7px] font-mono font-bold text-ink-black tracking-wider">INDONESIA</div>
              <div className="text-lg md:text-xl">🍫</div>
              <div className="text-[8px] font-mono font-bold text-ink-black">2026</div>
            </div>

            {/* Circular Postmark Cancellation Cap */}
            <div className="absolute -top-2 -right-4 md:-top-4 md:-right-6 w-24 h-24 md:w-28 md:h-28 border-2 border-dashed border-red-600/40 rounded-full flex flex-col items-center justify-center -rotate-12 pointer-events-none font-mono text-[7px] md:text-[8px] text-red-600/60 select-none z-20">
              <span className="font-bold tracking-widest">CILACAP</span>
              <span className="my-0.5 font-bold">CHAPTER 20</span>
              <span className="font-bold tracking-wide">POSTED</span>
              
              {/* Wavy lines spanning across */}
              <svg className="absolute -left-12 top-6 w-20 h-12 text-red-600/35" viewBox="0 0 100 50">
                <path d="M0,10 Q25,0 50,10 T100,10 M0,25 Q25,15 50,25 T100,25 M0,40 Q25,30 50,40 T100,40" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>

            <p
              className="text-base text-text-handwrite leading-relaxed m-0 font-medium"
              style={{ fontFamily: 'var(--font-handwrite)' }}
            >
              Hey there! Thanks for visiting my gallery. If you want to discuss a project, 
              ask about my coursework at PNC, or just say hello—feel free to reach out. 
              My inbox is always open!
            </p>
            <div
              className="text-right mt-4 text-sm font-semibold text-text-handwrite"
              style={{ fontFamily: 'var(--font-handwrite)' }}
            >
              — Tama
            </div>
            <div
              className="mt-4 text-[13px] text-text-handwrite border-t border-ink-black/10 pt-2.5 font-semibold text-amber-950 flex items-center gap-1.5"
              style={{ fontFamily: 'var(--font-handwrite)' }}
            >
              <span>P.S. Let's grab an iced chocolate or matcha if you are around Cilacap! 🍫✨</span>
            </div>
          </motion.div>

          {/* Clean Interactive Tactile Social Links */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col w-full mt-4 border-t-2 border-ink-black text-left"
          >
            {/* Link 1: GitHub */}
            <motion.a
              href="https://github.com/pratama1246"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 12, transition: { duration: 0.18, ease: 'easeOut' } }}
              className="group flex flex-col sm:flex-row sm:justify-between sm:items-center w-full py-4 md:py-6 border-b-2 border-ink-black hover:bg-pale-yellow px-3 sm:px-4 text-ink-black transition-colors duration-200 no-underline"
            >
              <div className="flex items-center gap-2.5 sm:gap-3">
                <span className="text-lg sm:text-xl md:text-2xl font-mono font-extrabold tracking-wider">GITHUB</span>
                <span className="font-mono text-[10px] sm:text-xs font-bold bg-white border border-ink-black px-2 py-0.5 rounded-md neo-shadow-sm group-hover:-rotate-2 transition-transform">
                  💻 REPOS
                </span>
              </div>
              <span className="font-mono font-bold text-xs sm:text-sm md:text-base mt-2 sm:mt-0 opacity-85 group-hover:opacity-100 flex items-center gap-1.5">
                <span>@PRATAMA1246</span>
                <span className="inline-block transform group-hover:translate-x-1.5 group-hover:-translate-y-1 transition-transform">↗</span>
              </span>
            </motion.a>

            {/* Link 2: Email */}
            <motion.a
              href="mailto:pratamaputra6854@gmail.com"
              whileHover={{ x: 12, transition: { duration: 0.18, ease: 'easeOut' } }}
              className="group flex flex-col sm:flex-row sm:justify-between sm:items-center w-full py-4 md:py-6 border-b-2 border-ink-black hover:bg-mint px-3 sm:px-4 text-ink-black transition-colors duration-200 no-underline"
            >
              <div className="flex items-center gap-2.5 sm:gap-3">
                <span className="text-lg sm:text-xl md:text-2xl font-mono font-extrabold tracking-wider">OFFICIAL MAIL</span>
                <span className="font-mono text-[10px] sm:text-xs font-bold bg-white border border-ink-black px-2 py-0.5 rounded-md neo-shadow-sm group-hover:rotate-2 transition-transform">
                  ✉️ INBOX
                </span>
              </div>
              <span className="font-mono font-bold text-xs sm:text-sm md:text-base mt-2 sm:mt-0 opacity-85 group-hover:opacity-100 flex items-center gap-1.5">
                <span>PRATAMAPUTRA6854@GMAIL.COM</span>
                <span className="inline-block transform group-hover:translate-x-1.5 group-hover:-translate-y-1 transition-transform">↗</span>
              </span>
            </motion.a>

            {/* Link 3: LinkedIn */}
            <motion.a
              href="https://www.linkedin.com/in/perfectpratama/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 12, transition: { duration: 0.18, ease: 'easeOut' } }}
              className="group flex flex-col sm:flex-row sm:justify-between sm:items-center w-full py-4 md:py-6 border-b-2 border-ink-black hover:bg-soft-blue px-3 sm:px-4 text-ink-black transition-colors duration-200 no-underline"
            >
              <div className="flex items-center gap-2.5 sm:gap-3">
                <span className="text-lg sm:text-xl md:text-2xl font-mono font-extrabold tracking-wider">LINKEDIN</span>
                <span className="font-mono text-[10px] sm:text-xs font-bold bg-white border border-ink-black px-2 py-0.5 rounded-md neo-shadow-sm group-hover:-rotate-2 transition-transform">
                  💼 CAREER
                </span>
              </div>
              <span className="font-mono font-bold text-xs sm:text-sm md:text-base mt-2 sm:mt-0 opacity-85 group-hover:opacity-100 flex items-center gap-1.5">
                <span>PERFECTPRATAMA</span>
                <span className="inline-block transform group-hover:translate-x-1.5 group-hover:-translate-y-1 transition-transform">↗</span>
              </span>
            </motion.a>

            {/* Link 4: Instagram */}
            <motion.a
              href="https://instagram.com/perfectamafine"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 12, transition: { duration: 0.18, ease: 'easeOut' } }}
              className="group flex flex-col sm:flex-row sm:justify-between sm:items-center w-full py-4 md:py-6 border-b-2 border-ink-black hover:bg-sticker-pink px-3 sm:px-4 text-ink-black transition-colors duration-200 no-underline"
            >
              <div className="flex items-center gap-2.5 sm:gap-3">
                <span className="text-lg sm:text-xl md:text-2xl font-mono font-extrabold tracking-wider">INSTAGRAM</span>
                <span className="font-mono text-[10px] sm:text-xs font-bold bg-white border border-ink-black px-2 py-0.5 rounded-md neo-shadow-sm group-hover:rotate-2 transition-transform">
                  📸 DIARY
                </span>
              </div>
              <span className="font-mono font-bold text-xs sm:text-sm md:text-base mt-2 sm:mt-0 opacity-85 group-hover:opacity-100 flex items-center gap-1.5">
                <span>@PERFECTAMAFINE</span>
                <span className="inline-block transform group-hover:translate-x-1.5 group-hover:-translate-y-1 transition-transform">↗</span>
              </span>
            </motion.a>

            {/* Link 5: Pinterest */}
            <motion.a
              href="https://id.pinterest.com/ppraaatammma___/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 12, transition: { duration: 0.18, ease: 'easeOut' } }}
              className="group flex flex-col sm:flex-row sm:justify-between sm:items-center w-full py-4 md:py-6 border-b-2 border-ink-black hover:bg-lavender px-3 sm:px-4 text-ink-black transition-colors duration-200 no-underline"
            >
              <div className="flex items-center gap-2.5 sm:gap-3">
                <span className="text-lg sm:text-xl md:text-2xl font-mono font-extrabold tracking-wider">PINTEREST</span>
                <span className="font-mono text-[10px] sm:text-xs font-bold bg-white border border-ink-black px-2 py-0.5 rounded-md neo-shadow-sm group-hover:-rotate-2 transition-transform">
                  📌 MOODBOARD
                </span>
              </div>
              <span className="font-mono font-bold text-xs sm:text-sm md:text-base mt-2 sm:mt-0 opacity-85 group-hover:opacity-100 flex items-center gap-1.5">
                <span>@PPRAAATAMMMA___</span>
                <span className="inline-block transform group-hover:translate-x-1.5 group-hover:-translate-y-1 transition-transform">↗</span>
              </span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Giant Stacked Typography Footer */}
      <motion.footer
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-full border-t-2 border-ink-black bg-[var(--bg-primary)] pt-10 sm:pt-14 pb-8 px-4 sm:px-8 md:px-16 lg:px-20 mt-16 sm:mt-24 flex justify-center select-none overflow-hidden"
      >
        <div className="max-w-[1600px] w-full flex flex-col justify-between">
          {/* Top Info Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-5 sm:pb-8 border-b-2 border-ink-black/10 font-mono text-xs sm:text-sm font-bold text-ink-black uppercase">
            <div className="flex items-center gap-2 shrink-0">
              <span className="px-2.5 py-1 rounded-md bg-pale-yellow border-2 border-ink-black neo-shadow-sm text-xs sm:text-sm font-extrabold whitespace-nowrap">
                © {new Date().getFullYear()}
              </span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 text-text-muted text-[11px] sm:text-xs whitespace-nowrap">
              <span>FRONTEND &amp; NETWORK</span>
              <span>•</span>
              <span>MYTAMAKIKII.WEB.ID</span>
            </div>
          </div>

          {/* Massive Stacked Name with calibrated responsive clamping */}
          <div className="py-6 sm:py-12 md:py-16 flex flex-col items-start leading-[0.85] tracking-tighter w-full">
            <span className="font-display font-black text-[13.5vw] xs:text-[14.2vw] sm:text-[14.5vw] md:text-[14vw] lg:text-[13vw] 2xl:text-[12.5rem] text-ink-black uppercase hover:text-soft-blue transition-colors duration-300">
              PRATAMA
            </span>
            <span className="font-display font-black text-[13.5vw] xs:text-[14.2vw] sm:text-[14.5vw] md:text-[14vw] lg:text-[13vw] 2xl:text-[12.5rem] text-ink-black uppercase hover:text-sticker-pink transition-colors duration-300">
              PUTRA
            </span>
            <span className="font-display font-black text-[13.5vw] xs:text-[14.2vw] sm:text-[14.5vw] md:text-[14vw] lg:text-[13vw] 2xl:text-[12.5rem] text-ink-black uppercase hover:text-mint transition-colors duration-300">
              PURWANTO
            </span>
          </div>

          {/* Bottom Disclaimer */}
          <div className="pt-6 border-t-2 border-ink-black/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[10px] sm:text-xs font-mono text-text-muted">
            <span>Some assets and components may be subject to copyright • Non-profit personal portfolio.</span>
            <span className="shrink-0">Crafted in Cilacap, ID 🇮🇩</span>
          </div>
        </div>
      </motion.footer>
    </section>
  )
}
