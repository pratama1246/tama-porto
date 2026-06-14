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

// Custom SVG Icons
function MailIcon({ className }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

function GitHubIcon({ className }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  )
}

function WebIcon({ className }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

function InstagramIcon({ className }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function PinterestIcon({ className }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M8 22a9 9 0 0 1-1.9-9.1c.3-1.8 1.3-4 2.5-5.9C10 4.6 11.8 3 13.8 3c2.9 0 5.2 2.3 5.2 5.2 0 3.7-2 6.8-4.8 6.8-1 0-2-.5-2.3-1.1-.8 3.1-1.3 5.2-1.3 5.2a10 10 0 0 1-2.6 3z" />
    </svg>
  )
}

function LinkedInIcon({ className }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
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
            className="bg-[#fefcf7] p-6 md:p-8 rounded-sm shadow-sm border border-black/5 max-w-[600px] w-full text-left rotate-[0.5deg]"
          >
            <p
              className="text-base text-[var(--text-handwrite)] leading-relaxed m-0"
              style={{ fontFamily: 'var(--font-handwrite)' }}
            >
              Hey there! Thanks for visiting my gallery. If you want to discuss a project, 
              ask about my coursework at PNC, or just say hello—feel free to reach out. 
              My inbox is always open!
            </p>
            <div
              className="text-right mt-6 text-sm text-[var(--text-handwrite)]"
              style={{ fontFamily: 'var(--font-handwrite)' }}
            >
              — Tama
            </div>
          </motion.div>

          {/* Stamp / Seal style links */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap justify-center gap-8 md:gap-12 mt-4 max-w-full"
          >
            {/* Stamp 1: GitHub (Dashed Red Border) */}
            <motion.a
              href="https://github.com/pratama1246"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: '5deg' }}
              className="flex flex-col items-center justify-center w-[120px] h-[120px] rounded-full border-2 border-dashed border-red-500/60 p-3 rotate-[-4deg] bg-[#fdf6e3]/40 cursor-pointer no-underline select-none shadow-xs text-red-700/80"
            >
              <GitHubIcon className="mb-1.5" />
              <span className="text-[10px] font-bold tracking-wider uppercase" style={{ fontFamily: 'var(--font-body)' }}>
                GitHub
              </span>
              <span className="text-[8px] uppercase tracking-tighter opacity-85 mt-0.5" style={{ fontFamily: 'var(--font-handwrite)' }}>
                @pratama1246
              </span>
            </motion.a>

            {/* Stamp 2: Email (Oval Wax Seal) */}
            <motion.a
              href="mailto:pratamaputra6854@gmail.com"
              whileHover={{ scale: 1.1, rotate: '-5deg' }}
              className="flex flex-col items-center justify-center w-[150px] h-[110px] rounded-[50%] border-2 border-double border-blue-500/60 p-3 rotate-[3deg] bg-[#fdf6e3]/40 cursor-pointer no-underline select-none shadow-xs text-blue-700/80"
            >
              <MailIcon className="mb-1.5" />
              <span className="text-[10px] font-bold tracking-wider uppercase" style={{ fontFamily: 'var(--font-body)' }}>
                Official Mail
              </span>
              <span className="text-[8px] tracking-tighter opacity-85 mt-0.5 truncate max-w-full" style={{ fontFamily: 'var(--font-handwrite)' }}>
                pratamaputra6854@gmail.com
              </span>
            </motion.a>

            {/* Stamp 3: Web Domain (Hexagonal/Decagon Wax Seal style) */}
            <motion.a
              href="https://mytamakikii.web.id"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: '4deg' }}
              className="flex flex-col items-center justify-center w-[120px] h-[120px] rounded-lg border-2 border-dotted border-purple-500/60 p-3 rotate-[-3deg] bg-[#fdf6e3]/40 cursor-pointer no-underline select-none shadow-xs text-purple-700/80"
              style={{ borderRadius: '24%' }}
            >
              <WebIcon className="mb-1.5" />
              <span className="text-[10px] font-bold tracking-wider uppercase" style={{ fontFamily: 'var(--font-body)' }}>
                Tama.gallery
              </span>
              <span className="text-[8px] tracking-tighter opacity-85 mt-0.5" style={{ fontFamily: 'var(--font-handwrite)' }}>
                Verified Web
              </span>
            </motion.a>

            {/* Stamp 4: LinkedIn (Rectangular Wax Seal style) */}
            <motion.a
              href="https://www.linkedin.com/in/perfectpratama/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: '3deg' }}
              className="flex flex-col items-center justify-center w-[140px] h-[110px] rounded-md border-2 border-double border-sky-500/60 p-3 rotate-[2deg] bg-[#fdf6e3]/40 cursor-pointer no-underline select-none shadow-xs text-sky-700/80"
            >
              <LinkedInIcon className="mb-1.5" />
              <span className="text-[10px] font-bold tracking-wider uppercase" style={{ fontFamily: 'var(--font-body)' }}>
                LinkedIn
              </span>
              <span className="text-[8px] tracking-tighter opacity-85 mt-0.5" style={{ fontFamily: 'var(--font-handwrite)' }}>
                perfectpratama
              </span>
            </motion.a>

            {/* Stamp 5: Instagram (Postage Stamp scalloped style) */}
            <motion.a
              href="https://instagram.com/perfectamafine"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: '-4deg' }}
              className="flex flex-col items-center justify-center w-[120px] h-[120px] rounded-xl border-2 border-dashed border-pink-500/60 p-3 rotate-[-5deg] bg-[#fdf6e3]/40 cursor-pointer no-underline select-none shadow-xs text-pink-700/80"
            >
              <InstagramIcon className="mb-1.5" />
              <span className="text-[10px] font-bold tracking-wider uppercase" style={{ fontFamily: 'var(--font-body)' }}>
                Instagram
              </span>
              <span className="text-[8px] tracking-tighter opacity-85 mt-0.5" style={{ fontFamily: 'var(--font-handwrite)' }}>
                @perfectamafine
              </span>
            </motion.a>

            {/* Stamp 6: Pinterest (Round Wax Seal style) */}
            <motion.a
              href="https://id.pinterest.com/ppraaatammma___/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: '5deg' }}
              className="flex flex-col items-center justify-center w-[110px] h-[110px] rounded-full border-2 border-dotted border-rose-500/60 p-3 rotate-[4deg] bg-[#fdf6e3]/40 cursor-pointer no-underline select-none shadow-xs text-rose-700/80"
            >
              <PinterestIcon className="mb-1.5" />
              <span className="text-[10px] font-bold tracking-wider uppercase" style={{ fontFamily: 'var(--font-body)' }}>
                Pinterest
              </span>
              <span className="text-[8px] tracking-tighter opacity-85 mt-0.5" style={{ fontFamily: 'var(--font-handwrite)' }}>
                @ppraaatammma___
              </span>
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
        className="w-full select-none mt-12 overflow-hidden bg-[var(--bg-primary)]/50 border-t border-[var(--text-dark)]/15 py-5 md:py-6"
      >
        <ScrollVelocity
          texts={[
            `© ${new Date().getFullYear()} Pratama Putra Purwanto • Politeknik Negeri Cilacap — D3 Teknik Informatika •`
          ]}
          velocity={-35}
          numCopies={3}
          scrollerClassName="text-xl md:text-3xl font-display font-bold uppercase tracking-wider text-[var(--text-dark)]/90 flex items-center w-full"
          className="px-8"
        />
      </motion.div>
    </section>
  )
}
