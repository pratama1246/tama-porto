import { useState, useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
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
      <span className="text-[7px] uppercase tracking-widest font-semibold font-body leading-none">Official</span>
      <span className="text-[9px] uppercase tracking-tighter font-semibold font-display my-0.5 leading-none">{config.text}</span>
      <span className="text-[6px] uppercase tracking-wider font-semibold font-body leading-none">PNC Dept</span>
    </div>
  )
}

// Individual Certificate Card Component
function CertificateCard({ cert, isArchive = false }) {
  const isPaperClip = cert.id % 2 === 0
  const tapeStyle = getTapeStyle(cert.id)
  
  const randomRotation = isArchive 
    ? (cert.id % 2 === 0 ? 'rotate-[1.5deg]' : 'rotate-[-1.5deg]')
    : ''

  const renderCardContent = () => (
    <>
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
          className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-wider max-w-[70%]"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {cert.issuer}
        </span>
        <span 
          className="text-xs text-[var(--text-handwrite)] rotate-[2deg] select-none"
          style={{ fontFamily: 'var(--font-handwrite)' }}
        >
          {cert.date}
        </span>
      </div>

      {/* Card Body (Title & Credential ID) */}
      <div className="flex-grow flex flex-col gap-2.5">
        <h3 
          className={`font-display font-semibold tracking-tight text-[var(--text-dark)] leading-tight m-0 ${
            isArchive ? 'text-sm md:text-base' : 'text-base md:text-lg'
          }`}
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
      <div className={`mt-5 pt-3 border-t-2 border-ink-black/10 flex justify-between items-end relative min-h-[50px] ${
        isArchive ? 'z-10' : ''
      }`}>
        {cert.link ? (
          <a
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-ink-black bg-mint text-ink-black font-mono text-[11px] font-bold neo-shadow-sm hover:brightness-95 active:scale-95 transition-all no-underline"
          >
            <span>Verify Credential</span>
            <span className="text-[10px]">↗</span>
          </a>
        ) : (
          <span 
            className="text-[10px] text-text-handwrite/70 font-semibold select-none italic bg-pale-yellow/60 px-2 py-0.5 rounded border border-black/10"
            style={{ fontFamily: 'var(--font-handwrite)' }}
          >
            * local_copy.png *
          </span>
        )}

        {/* Wax Seal / Stamp */}
        <Stamp id={cert.id} />
      </div>
    </>
  )

  if (isArchive) {
    return (
      <div 
        className={`relative flex flex-col justify-between min-h-[260px] w-full max-w-[340px] sm:max-w-[360px] p-4.5 sm:p-5 bg-white border-2 border-ink-black rounded-xl neo-shadow hover:-translate-y-1 transition-all duration-200 ${randomRotation}`}
      >
        {renderCardContent()}
      </div>
    )
  }

  return (
    <ScrollStackItem 
      itemClassName="flex flex-col justify-between min-h-[390px] md:min-h-[360px] w-full border-2 border-ink-black neo-shadow rounded-2xl"
    >
      {renderCardContent()}
    </ScrollStackItem>
  )
}

export default function Certifications() {
  const [showArchive, setShowArchive] = useState(false)

  // Recalculate ScrollTrigger markers and layout cleanly after expand/collapse completes
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 450)
    return () => clearTimeout(timer)
  }, [showArchive])

  // Active certifications shown in ScrollStack
  const coreCerts = certifications.filter(cert => !cert.archived)
  // Archived certifications shown in collapsible grid
  const archiveCerts = certifications.filter(cert => cert.archived)

  return (
    <section
      id="certifications"
      className="py-10 px-6 md:py-24 md:px-12 lg:px-20 max-w-[1600px] mx-auto w-full overflow-visible"
    >
      <div className="flex flex-col gap-10">
        {/* Section Header */}
        <div>
          <h2
            className="inline-block px-5 py-2 md:px-7 md:py-3 rounded-xl text-xl sm:text-2xl md:text-4xl font-display font-extrabold text-ink-black bg-lavender border-2 border-ink-black neo-shadow rotate-[1.5deg] tracking-tight m-0 select-none"
          >
            Certifications
          </h2>
        </div>

        {/* ScrollStack Wrapper for core tech certifications */}
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
          {coreCerts.map((cert) => (
            <CertificateCard key={cert.id} cert={cert} />
          ))}
        </ScrollStack>

        {/* Toggle Archive Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setShowArchive(!showArchive)}
            className="group flex items-center gap-2.5 px-6 py-3 rounded-xl border-2 border-ink-black bg-pale-yellow text-ink-black font-mono text-xs sm:text-sm font-bold neo-shadow neo-shadow-hover transition-all cursor-pointer select-none"
          >
            <span>
              {showArchive 
                ? 'Collapse Archive Certificates ▴' 
                : `View Archive Certificates (+${archiveCerts.length} more) ▾`}
            </span>
          </button>
        </div>

        {/* Collapsible Archive Grid (Native Smooth CSS Grid Accordion - 0 Layout Stutter) */}
        <div
          style={{
            display: 'grid',
            gridTemplateRows: showArchive ? '1fr' : '0fr',
            transition: 'grid-template-rows 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease',
            opacity: showArchive ? 1 : 0
          }}
          className="w-full"
        >
          <div className="overflow-hidden min-h-0">
            <div className="border-t border-dashed border-[var(--text-muted)]/30 pt-8 pb-6 px-2 sm:px-6 mt-6">
              <div className="text-center mb-8">
                <span className="font-handwrite text-sm text-[var(--text-handwrite)]/80 italic">
                  * {archiveCerts.length} archived — general &amp; micro-skill achievements *
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 justify-items-center items-start [&>*:last-child:nth-child(3n+1)]:lg:col-start-2">
                {archiveCerts.map((cert) => (
                  <CertificateCard key={cert.id} cert={cert} isArchive={true} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
