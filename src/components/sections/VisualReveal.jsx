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
      className="relative h-[150vh] md:h-[200vh] w-full border-y-2 border-ink-black border-dashed"
    >
      {/* Sticky Screen Viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6 md:px-12">

        {/* Animated Text Container (Header + Quote) */}
        <div 
          ref={textContainerRef}
          className="relative z-10 max-w-6xl w-full text-center flex flex-col items-center gap-6"
        >
          {/* Header */}
          <div className="flex flex-col items-center justify-center">
            <h2 
              className="inline-block px-6 py-2.5 md:px-8 md:py-3.5 rounded-xl text-2xl sm:text-3xl md:text-5xl font-display font-extrabold text-ink-black bg-mint border-2 border-ink-black neo-shadow rotate-[-1deg] tracking-tight m-0 select-none"
            >
              Behind the Creative Flow
            </h2>
          </div>

          {/* ScrollReveal Text Overlay */}
          <ScrollReveal
            triggerRef={containerRef}
            baseOpacity={0.05}
            baseRotation={2}
            blurStrength={10}
            containerClassName="mx-auto mt-2"
            textClassName="text-center font-display font-bold text-ink-black leading-[1.4] tracking-tight text-[1.4rem] sm:text-[1.8rem] md:text-[2.3rem]"
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
          className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-pale-yellow px-4 py-1.5 rounded-full border-2 border-ink-black neo-shadow-sm z-30 pointer-events-none flex items-center gap-2 animate-bounce"
        >
          <span className="w-2 h-2 rounded-full bg-sticker-pink border border-ink-black"></span>
          <span className="text-[11px] font-mono font-bold text-ink-black uppercase tracking-wider">Keep scrolling to reveal</span>
        </div>

      </div>
    </div>
  );
}
