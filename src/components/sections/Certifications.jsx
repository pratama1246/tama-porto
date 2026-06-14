import ScrollStack, { ScrollStackItem } from '../reactbits/ScrollStack'
import { certifications } from '../../data/certifications'

// Decorative Washi Tape style
const getTapeStyle = (id) => {
  const tapeColors = [
    "var(--accent-pink)",
    "var(--accent-lavender)",
    "var(--accent-mint)",
    "var(--accent-blue)"
  ]
  const angles = [-2, 3, -1, 2]
  const colorIdx = id % tapeColors.length
  const angleIdx = (id - 1) % angles.length
  
  return {
    backgroundColor: tapeColors[colorIdx],
    transform: `rotate(${angles[angleIdx]}deg)`
  }
}

// Interactive custom stamps for the certifications
function Stamp({ id }) {
  const stampConfig = [
    { text: "PASSED", color: "text-red-500/80 border-red-500/60", rotation: "rotate-[-12deg]" },
    { text: "VERIFIED", color: "text-blue-500/80 border-blue-500/60", rotation: "rotate-[8deg]" },
    { text: "APPROVED", color: "text-emerald-500/80 border-emerald-500/60", rotation: "rotate-[-5deg]" },
    { text: "CERTIFIED", color: "text-amber-500/80 border-amber-500/60", rotation: "rotate-[15deg]" }
  ]
  
  const config = stampConfig[(id - 1) % stampConfig.length]

  return (
    <div 
      className={`absolute bottom-3 right-3 w-16 h-16 rounded-full border-2 border-dashed flex flex-col items-center justify-center ${config.color} ${config.rotation} select-none opacity-75 pointer-events-none`}
    >
      <span className="text-[7px] uppercase tracking-widest font-bold font-body leading-none">Official</span>
      <span className="text-[9px] uppercase tracking-tighter font-extrabold font-display my-0.5 leading-none">{config.text}</span>
      <span className="text-[6px] uppercase tracking-wider font-bold font-body leading-none">PNC Dept</span>
    </div>
  )
}

// Individual Certificate Card Component integrated into ScrollStackItem
function CertificateCard({ cert }) {
  const isPaperClip = cert.id % 2 === 0
  const tapeStyle = getTapeStyle(cert.id)

  return (
    <ScrollStackItem 
      itemClassName="flex flex-col justify-between min-h-[390px] md:min-h-[360px] w-full"
    >
      {/* Decorative Pinned Element: alternating paperclip or washi tape */}
      {isPaperClip ? (
        /* Paper Clip */
        <div 
          className="absolute -top-3 left-6 w-[12px] h-[34px] border-2 border-[var(--text-muted)] rounded-full z-20 bg-transparent rotate-[15deg]"
          aria-hidden="true"
        >
          <div className="absolute top-[3px] left-[1px] w-[6px] h-[22px] border-2 border-[var(--text-muted)] rounded-full bg-transparent" />
        </div>
      ) : (
        /* Washi Tape */
        <div
          style={tapeStyle}
          className="absolute -top-2.5 left-[calc(50%-35px)] w-[70px] h-[15px] opacity-80 border border-black/5 rounded-xs z-10"
          aria-hidden="true"
        />
      )}

      {/* Card Header (Issuer & Date) */}
      <div className="flex justify-between items-start mb-3">
        <span 
          className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider max-w-[70%]"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {cert.issuer}
        </span>
        <span 
          className="text-xs text-[var(--text-handwrite)] rotate-[2deg] select-none font-bold"
          style={{ fontFamily: 'var(--font-handwrite)' }}
        >
          {cert.date}
        </span>
      </div>

      {/* Card Body (Title & Credential ID) */}
      <div className="flex-grow flex flex-col gap-2.5">
        <h3 
          className="font-display font-semibold text-base md:text-lg tracking-tight text-[var(--text-dark)] leading-tight m-0"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {cert.title}
        </h3>
        
        {cert.credentialId && (
          <div className="text-[10px] bg-black/5 text-[var(--text-dark)] px-2 py-0.5 rounded-xs w-fit border border-black/5 font-mono select-all">
            ID: {cert.credentialId}
          </div>
        )}

        {/* Skill Tags */}
        <div className="flex flex-wrap gap-1 mt-1">
          {cert.skills.map((skill, index) => (
            <span
              key={`${skill}-${index}`}
              className="px-2 py-0.5 rounded-xs bg-slate-100 text-[10px] font-medium text-slate-600 border border-black/5 shadow-3xs"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer (Verify Link and Stamp) */}
      <div className="mt-5 pt-3 border-t border-black/5 flex justify-between items-end relative min-h-[50px]">
        {cert.link ? (
          <a
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-[var(--text-dark)] hover:underline no-underline"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Verify Credential 
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="inline ml-0.5">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        ) : (
          <span 
            className="text-[10px] text-[var(--text-handwrite)]/60 font-medium select-none italic"
            style={{ fontFamily: 'var(--font-handwrite)' }}
          >
            * local_copy.png *
          </span>
        )}

        {/* Wax Seal / Stamp */}
        <Stamp id={cert.id} />
      </div>
    </ScrollStackItem>
  )
}

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="py-10 px-4 md:py-24 md:px-8 max-w-6xl mx-auto overflow-visible"
    >
      <div className="flex flex-col gap-10">
        {/* Section Header */}
        <div>
          <div
            className="inline-block px-3 py-1 rounded-sm text-[12px] font-semibold uppercase tracking-wider bg-[var(--accent-lavender)] border border-black/5 rotate-[1.5deg] mb-2"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            My Achievements
          </div>
          <h2
            className="font-display font-semibold text-[1.5rem] md:text-[2rem] tracking-tight text-[var(--text-dark)] m-0"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            The Certificate Board
          </h2>
        </div>

        {/* ScrollStack Wrapper for stacking cards */}
        <ScrollStack 
          useWindowScroll={true}
          itemDistance={40} 
          itemScale={0.025}
          itemStackDistance={16}
          stackPosition="15%"
          scaleEndPosition="5%"
          baseScale={0.93}
          rotationAmount={1.5}
          blurAmount={0.8}
        >
          {certifications.map((cert) => (
            <CertificateCard key={cert.id} cert={cert} />
          ))}
        </ScrollStack>
      </div>
    </section>
  )
}
