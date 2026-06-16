export default function OverviewTab({ detail }) {
  return (
    <div className="flex flex-col gap-6 md:gap-8 w-full">
      <div className="flex flex-col gap-3">
        <span className="font-handwrite text-[var(--text-handwrite)] text-sm rotate-[-1deg] self-start bg-[var(--accent-yellow)] px-2 py-0.5 rounded-sm select-none">
          * project_brief.txt *
        </span>
        <p className="font-body text-sm md:text-base leading-relaxed text-[var(--text-dark)]/90 m-0">
          {detail?.overview}
        </p>
      </div>

      {/* Problem & Solution Scrapbook Block */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-1">
        {/* Problem Statement */}
        <div className="bg-[var(--accent-peach)]/30 border border-black/10 rounded-sm p-4 relative shadow-3xs rotate-[-1deg] hover:rotate-0 transition-transform">
          <div className="w-10 h-3.5 bg-red-500/20 absolute -top-2 left-[10%] rotate-[-2deg] rounded-sm pointer-events-none" />
          <h4 className="font-display font-semibold text-xs md:text-sm text-[var(--text-dark)] uppercase mb-2 flex items-center gap-1.5 select-none">
            ⚠️ Problem Statement
          </h4>
          <p className="font-body text-sm text-[var(--text-dark)]/90 leading-relaxed m-0">
            {detail?.problem}
          </p>
        </div>

        {/* Solution */}
        <div className="bg-[var(--accent-mint)]/35 border border-black/10 rounded-sm p-4 relative shadow-3xs rotate-[1deg] hover:rotate-0 transition-transform">
          <div className="w-10 h-3.5 bg-emerald-500/20 absolute -top-2 right-[10%] rotate-[1.5deg] rounded-sm pointer-events-none" />
          <h4 className="font-display font-semibold text-xs md:text-sm text-[var(--text-dark)] uppercase mb-2 flex items-center gap-1.5 select-none">
            ✨ Proposed Solution
          </h4>
          <p className="font-body text-sm text-[var(--text-dark)]/90 leading-relaxed m-0">
            {detail?.solution}
          </p>
        </div>
      </div>

      {/* Disclaimer / Copyright Alert */}
      {detail?.disclaimer && (
        <div className="bg-amber-50 border border-amber-500/20 rounded-sm p-4 relative shadow-3xs rotate-[-0.5deg] hover:rotate-0 transition-transform">
          <div className="w-10 h-3.5 bg-amber-500/15 absolute -top-2 left-6 rotate-[1deg] rounded-sm pointer-events-none" />
          <h4 className="font-display font-semibold text-xs md:text-sm text-amber-800 uppercase mb-2 flex items-center gap-1.5 select-none">
            ⚠️ Disclaimer & Copyright Notice
          </h4>
          <p className="font-body text-[11px] md:text-xs text-amber-900/90 leading-relaxed m-0">
            {detail.disclaimer}
          </p>
        </div>
      )}

      {/* Key Features Block */}
      {detail?.keyFeatures && (
        <div className="bg-[#fefcf7] border border-black/10 rounded-sm p-5 shadow-2xs relative">
          {/* Washi tape decoration */}
          <div className="absolute -top-3.5 left-6 w-16 h-4.5 bg-[var(--accent-yellow)]/70 rotate-[-1deg] rounded-sm pointer-events-none" />
          <h3 className="font-display font-semibold text-base md:text-lg text-[var(--text-dark)] mb-4 border-b border-black/5 pb-2 select-none">
            🎯 Key Features
          </h3>
          <ul className="list-none pl-0 m-0 flex flex-col gap-3">
            {detail.keyFeatures.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-sm md:text-base font-body text-[var(--text-dark)]/90 leading-relaxed">
                <span className="text-[var(--accent-pink)] font-bold select-none shrink-0">✔</span>
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tech Stack Box */}
      <div className="bg-[#fefcf7] border border-black/10 rounded-sm p-5 shadow-2xs relative">
        {/* Washi tape decoration */}
        <div className="absolute -top-3.5 right-6 w-16 h-4.5 bg-[var(--accent-peach)]/60 rotate-[2deg] rounded-sm pointer-events-none" />
        
        <h3 className="font-display font-semibold text-base md:text-lg text-[var(--text-dark)] mb-4 border-b border-black/5 pb-2 select-none">
          Tools & Tech Stack
        </h3>
        <div className="flex flex-col gap-4">
          {detail?.techStack?.map((techGroup, index) => (
            <div key={index} className="flex flex-col gap-2">
              <span className="font-body text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-wider select-none">
                {techGroup.category}
              </span>
              <div className="flex flex-wrap gap-2">
                {techGroup.list.map((techItem, techIdx) => (
                  <span
                    key={techIdx}
                    className="px-2.5 py-1.5 rounded-sm text-xs md:text-sm font-semibold bg-white border border-black/10 text-[var(--text-dark)] hover:scale-102 hover:rotate-[0.5deg] transition-all cursor-default select-none shadow-3xs"
                  >
                    {techItem}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
