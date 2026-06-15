export default function DatabaseTab({ detail }) {
  const database = detail?.database
  const payments = detail?.payments

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
      {/* Database Schema Section */}
      <div className="flex-grow w-full lg:max-w-[55%] flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <h3 className="font-display font-semibold text-base md:text-lg text-[var(--text-dark)] m-0">
            🗄️ Database Structure
          </h3>
          <p className="font-body text-sm text-[var(--text-muted)] leading-relaxed">
            {database?.description}
          </p>
        </div>

        {/* Database Tables Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {database?.tables.map((table, tIdx) => (
            <div key={tIdx} className="bg-white border border-black/10 rounded-sm p-4 shadow-3xs flex flex-col gap-2.5 rotate-[0.5deg] hover:rotate-0 transition-transform">
              <div className="font-mono text-sm font-semibold text-[var(--text-dark)] border-b border-black/5 pb-1 flex justify-between select-none">
                <span>{table.name}</span>
                <span className="text-[10px] text-[var(--text-muted)] font-sans">table</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {table.fields.map((field, fIdx) => (
                  <span key={fIdx} className="font-mono text-[10px] md:text-xs px-2 py-0.5 rounded-sm bg-[var(--bg-secondary)]/50 border border-black/5 text-[var(--text-dark)]/85">
                    {field}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Midtrans Webhooks & Polling Section */}
      <div className="w-full lg:w-[45%] flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <h3 className="font-display font-semibold text-base md:text-lg text-[var(--text-dark)] m-0">
            💳 Midtrans Webhooks & APIs
          </h3>
          <p className="font-body text-sm text-[var(--text-muted)] leading-relaxed">
            Transaction webhooks and frontend status polling configuration.
          </p>
        </div>

        {payments ? (
          <div className="bg-[#fefcf7] border border-black/10 rounded-sm p-5 shadow-2xs relative flex flex-col gap-4">
            {/* Washi tape decoration */}
            <div className="absolute -top-3 left-1/3 w-20 h-4 bg-[var(--accent-blue)]/75 rotate-[-1deg] rounded-sm pointer-events-none select-none" />
            
            <div className="font-body text-sm font-semibold text-[var(--text-dark)]">
              Provider: <span className="underline decoration-[var(--accent-pink)] decoration-2">{payments.provider}</span>
            </div>

            <div className="flex flex-col gap-3.5">
              {payments.endpoints.map((ep, epIdx) => (
                <div key={epIdx} className="flex flex-col gap-2 border-t border-black/5 pt-3.5 first:border-0 first:pt-0">
                  <div className="flex items-center gap-2">
                    <span className={`font-mono text-[10px] font-semibold px-2 py-0.5 rounded-sm border text-white select-none ${
                      ep.method === 'POST' ? 'bg-emerald-600 border-emerald-700' : 'bg-blue-600 border-blue-700'
                    }`}>
                      {ep.method}
                    </span>
                    <span className="font-mono text-sm font-bold text-[var(--text-dark)] overflow-hidden text-ellipsis whitespace-nowrap">
                      {ep.path}
                    </span>
                  </div>
                  <p className="font-body text-xs md:text-sm text-[var(--text-dark)]/80 leading-normal">
                    {ep.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-[#fefcf7] border border-black/10 rounded-sm p-8 shadow-2xs text-center font-handwrite text-[var(--text-muted)] select-none">
            * No webhook payments integrated *
          </div>
        )}
      </div>
    </div>
  )
}
