import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollReveal from '../reactbits/ScrollReveal';

gsap.registerPlugin(ScrollTrigger);

export default function VisualReveal() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const textContainerRef = useRef(null);
  const pillRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const img = imageRef.current;
    const textContainer = textContainerRef.current;
    const pill = pillRef.current;
    if (!container || !img || !textContainer) return;

    // 1. Sticker Photo Animation:
    // Starts lower down (partially offscreen), slides up to its active position,
    // tilts slightly and scales up as the user scrolls down.
    const imgAnim = gsap.fromTo(
      img,
      { 
        y: '20vh',
        rotate: -6,
        scale: 0.95
      },
      {
        y: '0vh',
        rotate: -2,
        scale: 1.05,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        }
      }
    );

    // 2. Text Container Animation:
    // Starts lower down and scrolls up past the center of the viewport.
    const textAnim = gsap.fromTo(
      textContainer,
      {
        y: '30vh',
      },
      {
        y: '-30vh',
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        }
      }
    );

    // 3. Instruction Pill Animation:
    // Fades out dynamically as the user starts scrolling.
    let pillAnim = null;
    if (pill) {
      pillAnim = gsap.to(
        pill,
        {
          opacity: 0,
          scrollTrigger: {
            trigger: container,
            start: 'top+=100px top',
            end: 'top+=300px top',
            scrub: true,
          }
        }
      );
    }

    return () => {
      imgAnim.scrollTrigger?.kill();
      imgAnim.kill();
      textAnim.scrollTrigger?.kill();
      textAnim.kill();
      if (pillAnim) {
        pillAnim.scrollTrigger?.kill();
        pillAnim.kill();
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative h-[150vh] md:h-[200vh] w-full border-y border-black/5"
    >
      {/* Sticky Screen Viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6 md:px-12">

        {/* Animated Text Container (Header + Quote) */}
        <div 
          ref={textContainerRef}
          className="relative z-10 max-w-4xl w-full text-center flex flex-col items-center gap-6"
        >
          {/* Header */}
          <div className="flex flex-col items-center justify-center">
            <span 
              className="inline-block px-3 py-1 rounded-sm text-[12px] font-semibold uppercase tracking-wider bg-[var(--accent-lavender)] border border-black/5 rotate-[1.5deg] mb-3"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              My Philosophy
            </span>
            <h3 
              className="font-display font-semibold text-3xl md:text-5xl text-[var(--text-dark)] m-0 tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Behind the Creative Flow
            </h3>
          </div>

          {/* ScrollReveal Text Overlay */}
          <ScrollReveal
            triggerRef={containerRef}
            baseOpacity={0.05}
            baseRotation={2}
            blurStrength={10}
            containerClassName="mx-auto mt-2"
            textClassName="text-center font-display font-semibold text-[var(--text-dark)] leading-[1.4] tracking-tight text-[1.4rem] sm:text-[1.8rem] md:text-[2.4rem]"
          >
            "The things that inspire me most—stories that stay with us, music that sparks emotion, aesthetics that express personality, and technology that connects people—all share one thing in common: they leave a lasting impression. That's the kind of experience I hope to create in everything I build."
          </ScrollReveal>
        </div>

        {/* The sticker photo at the bottom of the viewport */}
        <div className="absolute bottom-[-20px] md:bottom-[-40px] left-1/2 -translate-x-1/2 pointer-events-none z-20 flex justify-center origin-bottom max-h-[50vh]">
          <img
            ref={imageRef}
            src="/assets/stickers/profile-sticker.webp"
            alt="Tama Sticker"
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
            className="protected-image w-[380px] max-w-[90vw] sm:w-[480px] md:w-[660px] max-h-[50vh] h-auto object-contain sticker-effect origin-bottom"
          />
        </div>

        {/* Tiny instruction pill at the bottom */}
        <div 
          ref={pillRef}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[var(--bg-secondary)] px-4 py-1.5 rounded-full border border-black/10 shadow-xs z-30 pointer-events-none flex items-center gap-2 animate-bounce"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-pink)]"></span>
          <span className="text-[10px] md:text-[11px] font-semibold text-[var(--text-dark)] uppercase tracking-wider">Keep scrolling to reveal</span>
        </div>

      </div>
    </div>
  );
}
