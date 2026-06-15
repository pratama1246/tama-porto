export default function GalleryTab({ detail }) {
  const screenshots = detail?.screenshots || []

  if (screenshots.length === 0) {
    return (
      <div className="text-center font-handwrite text-[var(--text-muted)] py-12 select-none">
        * No screenshots uploaded for this gallery *
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex flex-col gap-2">
        <h3 className="font-display font-semibold text-base md:text-lg text-[var(--text-dark)] m-0 select-none">
          🖼️ Project Bento Gallery
        </h3>
        <p className="font-body text-sm text-[var(--text-muted)] leading-relaxed m-0 select-none">
          A masonry-style visual grid displaying screens in their full native proportions.
        </p>
      </div>

      {/* Masonry Columns Grid */}
      <div className="columns-1 sm:columns-2 md:columns-3 gap-4 pt-4">
        {screenshots.map((shot, idx) => {
          return (
            <div
              key={idx}
              className="break-inside-avoid bg-white border border-black/10 rounded-sm p-3 mb-4 relative group transition-all duration-300 hover:shadow-xs hover:border-black/20 hover:scale-[1.01] shadow-3xs"
            >
              {/* Image Container */}
              <div className="w-full bg-[var(--bg-secondary)]/5 rounded-2xs overflow-hidden border border-black/5 relative select-none">
                <img
                  src={shot.url}
                  alt={shot.caption}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-102 pointer-events-none"
                  loading="lazy"
                />
              </div>

              {/* Caption Label */}
              <div className="mt-2.5 flex items-center justify-between gap-2 border-t border-black/5 pt-2 select-none shrink-0">
                <span className="font-body text-xs font-semibold text-[var(--text-dark)]/90 truncate">
                  {shot.caption}
                </span>
                <span className="text-[9px] font-semibold text-[var(--text-muted)] bg-[var(--bg-secondary)] px-1.5 py-0.5 rounded-sm shrink-0 uppercase tracking-wider font-mono">
                  {shot.type}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
