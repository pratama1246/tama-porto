import { motion } from 'framer-motion'
import ScrollVelocity from '../reactbits/ScrollVelocity'

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
      className="relative bg-[var(--bg-secondary)] pt-12 pb-0 px-0 mt-6 md:pt-24 md:mt-12 w-full"
    >
      {/* Decorative Torn Paper Edge at the top, separate from content to keep spikes small and avoid clipping */}
      <div 
        className="absolute -top-[35px] left-0 right-0 h-[36px] bg-[var(--bg-secondary)] torn-edge pointer-events-none" 
        aria-hidden="true"
      />
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center text-center gap-10"
        >
          {/* Section Header */}
          <div>
            <motion.div
              variants={fadeUp}
              className="inline-block px-3 py-1 rounded-sm text-[12px] font-semibold uppercase tracking-wider bg-[var(--accent-yellow)] border border-black/5 rotate-[-1.5deg] mb-2"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Get In Touch
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-display font-semibold text-[1.5rem] md:text-[2rem] tracking-tight text-[var(--text-dark)] m-0"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Send a Postcard
            </motion.h2>
          </div>

          {/* Invitation Letter */}
          <motion.div
            variants={fadeUp}
            className="bg-[#fefcf7] p-6 pr-24 sm:pr-28 md:p-8 md:pr-32 rounded-sm shadow-sm border border-black/5 max-w-[600px] w-full text-left rotate-[0.5deg] relative overflow-visible"
          >
            {/* Y2K Postage Stamp */}
            <div className="absolute top-4 right-4 md:top-6 md:right-6 w-14 h-18 md:w-16 md:h-20 bg-[var(--accent-pink)] border-2 border-dashed border-[var(--text-dark)]/20 rounded-xs flex flex-col items-center justify-between p-1.5 rotate-[6deg] shadow-3xs select-none z-10">
              <div className="text-[7px] font-semibold text-[var(--text-dark)]/60 tracking-wider">INDONESIA</div>
              <div className="text-lg md:text-xl">☕</div>
              <div className="text-[8px] font-mono font-semibold text-[var(--text-dark)]">2026</div>
            </div>

            {/* Circular Postmark Cancellation Cap (Overlapping the stamp) */}
            <div className="absolute -top-2 -right-4 md:-top-4 md:-right-6 w-24 h-24 md:w-28 md:h-28 border border-dashed border-red-600/35 rounded-full flex flex-col items-center justify-center rotate-[-12deg] pointer-events-none font-mono text-[7px] md:text-[8px] text-red-600/40 select-none z-20">
              <span className="font-semibold tracking-widest">CILACAP</span>
              <span className="my-0.5 font-semibold">15 JUN 2026</span>
              <span className="font-semibold tracking-wide">POSTED</span>
              
              {/* Wavy lines spanning across */}
              <svg className="absolute -left-12 top-6 w-20 h-12 text-red-600/30" viewBox="0 0 100 50">
                <path d="M0,10 Q25,0 50,10 T100,10 M0,25 Q25,15 50,25 T100,25 M0,40 Q25,30 50,40 T100,40" fill="none" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </div>

            <p
              className="text-base text-[var(--text-handwrite)] leading-relaxed m-0"
              style={{ fontFamily: 'var(--font-handwrite)' }}
            >
              Hey there! Thanks for visiting my gallery. If you want to discuss a project, 
              ask about my coursework at PNC, or just say hello—feel free to reach out. 
              My inbox is always open!
            </p>
            <div
              className="text-right mt-4 text-sm text-[var(--text-handwrite)]"
              style={{ fontFamily: 'var(--font-handwrite)' }}
            >
              — Tama
            </div>
            <div
              className="mt-4 text-[13px] text-[var(--text-handwrite)]/90 border-t border-[var(--text-dark)]/5 pt-2"
              style={{ fontFamily: 'var(--font-handwrite)' }}
            >
              P.S. Let's grab a cup of coffee if you are around Cilacap! ☕
            </div>
          </motion.div>

          {/* Clean Text-Only Social Links */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col w-full mt-4 border-t border-[var(--text-dark)]/15 text-left"
          >
            {/* Link 1: GitHub */}
            <motion.a
              href="https://github.com/pratama1246"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 12 }}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full py-4 md:py-6 border-b border-[var(--text-dark)]/15 hover:border-[var(--text-dark)]/35 text-[var(--text-dark)] transition-all duration-200 no-underline"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              <span className="text-lg sm:text-xl md:text-2xl font-semibold tracking-wider">GITHUB</span>
              <span className="font-medium opacity-80 text-xs sm:text-sm md:text-lg mt-1 sm:mt-0">@PRATAMA1246</span>
            </motion.a>

            {/* Link 2: Email */}
            <motion.a
              href="mailto:pratamaputra6854@gmail.com"
              whileHover={{ x: 12 }}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full py-4 md:py-6 border-b border-[var(--text-dark)]/15 hover:border-[var(--text-dark)]/35 text-[var(--text-dark)] transition-all duration-200 no-underline"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              <span className="text-lg sm:text-xl md:text-2xl font-semibold tracking-wider">OFFICIAL MAIL</span>
              <span className="font-medium opacity-80 text-xs sm:text-sm md:text-lg mt-1 sm:mt-0">PRATAMAPUTRA6854@GMAIL.COM</span>
            </motion.a>

            {/* Link 4: LinkedIn */}
            <motion.a
              href="https://www.linkedin.com/in/perfectpratama/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 12 }}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full py-4 md:py-6 border-b border-[var(--text-dark)]/15 hover:border-[var(--text-dark)]/35 text-[var(--text-dark)] transition-all duration-200 no-underline"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              <span className="text-lg sm:text-xl md:text-2xl font-semibold tracking-wider">LINKEDIN</span>
              <span className="font-medium opacity-80 text-xs sm:text-sm md:text-lg mt-1 sm:mt-0">PERFECTPRATAMA</span>
            </motion.a>

            {/* Link 5: Instagram */}
            <motion.a
              href="https://instagram.com/perfectamafine"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 12 }}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full py-4 md:py-6 border-b border-[var(--text-dark)]/15 hover:border-[var(--text-dark)]/35 text-[var(--text-dark)] transition-all duration-200 no-underline"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              <span className="text-lg sm:text-xl md:text-2xl font-semibold tracking-wider">INSTAGRAM</span>
              <span className="font-medium opacity-80 text-xs sm:text-sm md:text-lg mt-1 sm:mt-0">@PERFECTAMAFINE</span>
            </motion.a>

            {/* Link 6: Pinterest */}
            <motion.a
              href="https://id.pinterest.com/ppraaatammma___/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 12 }}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full py-4 md:py-6 border-b border-[var(--text-dark)]/15 hover:border-[var(--text-dark)]/35 text-[var(--text-dark)] transition-all duration-200 no-underline"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              <span className="text-lg sm:text-xl md:text-2xl font-semibold tracking-wider">PINTEREST</span>
              <span className="font-medium opacity-80 text-xs sm:text-sm md:text-lg mt-1 sm:mt-0">@PPRAAATAMMMA___</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer Copyright - Full Screen Width, Sticking to bottom */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-full select-none mt-12 overflow-hidden bg-[var(--bg-primary)]/50 border-t border-[var(--text-dark)]/15 pt-5 pb-4 md:pt-6 md:pb-5 flex flex-col gap-2 md:gap-3 items-center text-center"
      >
        <ScrollVelocity
          texts={[
            `© ${new Date().getFullYear()} Pratama Putra • Informatics Engineering • All rights reserved •`
          ]}
          velocity={-35}
          numCopies={3}
          scrollerClassName="text-xl md:text-3xl font-display font-semibold uppercase tracking-wider text-[var(--text-dark)]/90 flex items-center w-full"
          className="px-8"
        />
        <div className="text-[10px] md:text-xs opacity-75 font-mono font-semibold tracking-wider text-[var(--text-dark)] px-4 uppercase">
          Some assets and components may be subject to copyright • This website is a non-profit personal portfolio. If you own any featured asset and object to its use, please contact me for immediate removal.
        </div>
      </motion.div>
    </section>
  )
}
