import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollReveal from '../reactbits/ScrollReveal';

gsap.registerPlugin(ScrollTrigger);

export default function VisualReveal() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const img = imageRef.current;
    if (!container || !img) return;

    // Zoom the sticker photo on top of the text and fade it to watermark level (18% opacity)
    const anim = gsap.fromTo(
      img,
      { 
        scale: 1, 
        rotate: -2,
        opacity: 0.95 
      },
      {
        scale: 8, // zooms to cover the screen
        rotate: 15, // slight rotation while zooming
        opacity: 0.18, // fades so the text remains readable, but still clearly visible on top
        ease: 'power1.out',
        scrollTrigger: {
          trigger: container,
          start: 'top+=120px top',
          end: 'bottom bottom',
          scrub: true,
        }
      }
    );

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative h-[140vh] md:h-[200vh] w-full border-y border-black/5"
    >
      {/* Scroll-away Header (Normal flow, scrolls out of view before stick) */}
      <div className="w-full text-center pt-12 pb-6 md:pt-20 md:pb-8 flex flex-col items-center justify-center z-10 relative h-auto md:h-[200px]">
        <span 
          className="inline-block px-3 py-1 rounded-sm text-[12px] font-semibold uppercase tracking-wider bg-[var(--accent-lavender)] border border-black/5 rotate-[1.5deg] mb-3"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          My Philosophy
        </span>
        <h3 
          className="font-display font-bold text-3xl md:text-4xl text-[var(--text-dark)] m-0 tracking-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Behind the Creative Flow
        </h3>
      </div>

      {/* Sticky Screen Viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6 md:px-12">



        {/* ScrollReveal Text Overlay (Rendered first in DOM, z-10) */}
        <div className="relative z-10 max-w-4xl w-full text-center">
          <ScrollReveal
            triggerRef={containerRef}
            baseOpacity={0.05}
            baseRotation={2}
            blurStrength={10}
            containerClassName="mx-auto"
            textClassName="text-center font-display font-bold text-[var(--text-dark)] leading-[1.4] tracking-tight text-[1.5rem] sm:text-[2rem] md:text-[2.6rem]"
          >
            "The things that inspire me most—stories that stay with us, music that sparks emotion, aesthetics that express personality, and technology that connects people—all share one thing in common: they leave a lasting impression. That's the kind of experience I hope to create in everything I build."
          </ScrollReveal>
        </div>

        {/* The zooming sticker photo (Rendered second in DOM, z-20, on top of text) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <img
            ref={imageRef}
            src="/assets/stickers/profile-sticker.webp"
            alt="Zooming Tama Sticker"
            className="w-[400px] max-w-[90vw] md:w-[680px] md:max-w-none h-auto object-contain sticker-effect origin-center"
          />
        </div>

        {/* Tiny instruction pill at the bottom */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[var(--bg-secondary)] px-4 py-1.5 rounded-full border border-black/10 shadow-xs z-30 pointer-events-none flex items-center gap-2 animate-bounce">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-pink)]"></span>
          <span className="text-[10px] md:text-[11px] font-semibold text-[var(--text-dark)] uppercase tracking-wider">Keep scrolling to reveal</span>
        </div>
      </div>
    </div>
  );
}
