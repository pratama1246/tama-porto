import { useState } from 'react'

export default function SetupTab({ detail }) {
  const setup = detail?.setup
  const demoAccounts = detail?.demoAccounts || []
  const [copiedIdx, setCopiedIdx] = useState(null)

  const handleCopy = (cmd, idx) => {
    navigator.clipboard.writeText(cmd)
    setCopiedIdx(idx)
    setTimeout(() => setCopiedIdx(null), 1500)
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
      {/* Left Column: Setup commands */}
      <div className="flex-grow w-full lg:max-w-[55%] flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <h3 className="font-display font-semibold text-base md:text-lg text-[var(--text-dark)] m-0">
            🛠️ Local Setup Guide
          </h3>
          <p className="font-body text-sm text-[var(--text-muted)] leading-relaxed">
            Run the following commands sequentially in your local terminal.
          </p>
        </div>

        {/* Terminal Notepad */}
        <div className="bg-[#fefcf7] border border-black/10 rounded-sm p-5 shadow-2xs flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-4 font-mono text-sm">
            {setup?.steps.map((step, idx) => (
              <div key={idx} className="flex flex-col gap-2 border-b border-black/5 pb-3.5 last:border-0 last:pb-0">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-body text-[10px] md:text-xs text-[var(--text-muted)] font-semibold uppercase">
                    Step {idx + 1}: {step.desc}
                  </span>
                  <button
                    onClick={() => handleCopy(step.cmd, idx)}
                    className="px-2 py-0.5 rounded-sm border border-black/15 bg-white text-[10px] font-sans font-semibold hover:bg-black/5 active:scale-95 transition-all cursor-pointer select-none"
                  >
                    {copiedIdx === idx ? 'Copied ✓' : 'Copy'}
                  </button>
                </div>
                <div className="bg-[var(--bg-secondary)]/35 border border-black/5 rounded-xs p-2.5 font-mono text-xs md:text-sm text-[var(--text-dark)] select-all overflow-x-auto whitespace-nowrap">
                  $ {step.cmd}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Demo Accounts */}
      <div className="w-full lg:w-[45%] flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <h3 className="font-display font-semibold text-base md:text-lg text-[var(--text-dark)] m-0">
            🔑 Demo Accounts
          </h3>
          <p className="font-body text-sm text-[var(--text-muted)] leading-relaxed">
            Use these pre-seeded accounts in the seeder to inspect the system.
          </p>
        </div>

        {demoAccounts.length > 0 ? (
          <div className="bg-[#fefcf7] border border-black/10 rounded-sm p-5 shadow-2xs relative flex flex-col gap-4">
            {/* Washi tape decoration */}
            <div className="absolute -top-3.5 right-6 w-16 h-4.5 bg-[var(--accent-pink)]/60 rotate-[-1deg] rounded-sm pointer-events-none select-none" />
            
            <div className="font-body text-sm text-[var(--text-dark)] select-none">
              Demo Password: <span className="font-mono font-bold bg-[var(--accent-yellow)] px-2 py-0.5 rounded-xs">pncpickup123</span>
            </div>

            <div className="flex flex-col gap-4">
              {demoAccounts.map((acc, idx) => (
                <div key={idx} className="flex flex-col gap-2.5 border-t border-black/5 pt-3.5 first:border-0 first:pt-0">
                  <div className="flex justify-between items-center gap-2">
                    <span className="font-body text-sm font-semibold text-[var(--text-dark)]">
                      {acc.role}
                    </span>
                    {acc.note && (
                      <span className="text-[10px] font-handwrite text-[var(--text-handwrite)] bg-[var(--accent-lavender)]/50 px-1.5 py-0.5 rounded-sm rotate-[-1deg] select-none">
                        {acc.note}
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-mono select-none">username/nim</span>
                      <span className="font-mono text-xs md:text-sm text-[var(--text-dark)] bg-white border border-black/5 px-2 py-0.5 rounded-sm select-all">
                        {acc.username}
                      </span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-mono select-none">email</span>
                      <span className="font-mono text-xs md:text-sm text-[var(--text-dark)] bg-white border border-black/5 px-2 py-0.5 rounded-sm select-all overflow-hidden text-ellipsis whitespace-nowrap">
                        {acc.email}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-[#fefcf7] border border-black/10 rounded-sm p-8 shadow-2xs text-center font-handwrite text-[var(--text-muted)] select-none">
            * No demo account credentials configured *
          </div>
        )}
      </div>
    </div>
  )
}
