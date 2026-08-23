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
        y: '22vh',
        rotate: -6,
        scale: 0.95
      },
      {
        y: '0vh',
        rotate: -2,
        scale: 1.08,
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
    // Starts higher up and scrolls smoothly up past the top of the viewport.
    const textAnim = gsap.fromTo(
      textContainer,
      {
        y: '18vh',
      },
      {
        y: '-38vh',
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
      className="relative h-[160vh] md:h-[200vh] w-full"
    >
      {/* Sticky Screen Viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 sm:px-8 md:px-12">

        {/* Animated Text Container (Header + Quote) - Higher z-index so text is always 100% visible */}
        <div 
          ref={textContainerRef}
          className="relative z-30 max-w-5xl w-full text-center flex flex-col items-center gap-3 sm:gap-6 pt-2 sm:pt-0"
        >
          {/* Header */}
          <div className="flex flex-col items-center justify-center">
            <h2 
              className="inline-block px-4 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3.5 rounded-xl text-lg xs:text-xl sm:text-3xl md:text-5xl font-display font-extrabold text-ink-black bg-mint border-2 border-ink-black neo-shadow rotate-[-1deg] tracking-tight m-0 select-none"
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
            containerClassName="mx-auto mt-1 sm:mt-2 px-1 sm:px-2 max-w-4xl"
            textClassName="text-center font-display font-bold text-ink-black leading-[1.38] sm:leading-[1.4] tracking-tight text-[1.05rem] xs:text-[1.18rem] sm:text-[1.6rem] md:text-[2.2rem]"
          >
            "The things that inspire me most—stories that stay with us, music that sparks emotion, aesthetics that express personality, and technology that connects people—all share one thing in common: they leave a lasting impression. That's the kind of experience I hope to create in everything I build."
          </ScrollReveal>
        </div>

        {/* The sticker photo at the bottom of the viewport - Large, prominent, and cinematic */}
        <div className="absolute bottom-[-10px] sm:bottom-[-20px] md:bottom-[-40px] left-1/2 -translate-x-1/2 pointer-events-none z-10 flex justify-center origin-bottom max-h-[48vh] sm:max-h-[50vh]">
          <img
            ref={imageRef}
            src="/assets/stickers/profile-sticker.webp"
            alt="Tama Sticker"
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
            className="protected-image w-[350px] max-w-[92vw] sm:w-[500px] md:w-[660px] max-h-[48vh] sm:max-h-[50vh] h-auto object-contain sticker-effect origin-bottom"
          />
        </div>

        {/* Tiny instruction pill at the bottom */}
        <div 
          ref={pillRef}
          className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 bg-pale-yellow px-3.5 py-1.5 rounded-full border-2 border-ink-black neo-shadow-sm z-30 pointer-events-none flex items-center gap-2 animate-bounce"
        >
          <span className="w-2 h-2 rounded-full bg-sticker-pink border border-ink-black"></span>
          <span className="text-[10px] sm:text-[11px] font-mono font-bold text-ink-black uppercase tracking-wider">Keep scrolling to reveal</span>
        </div>

      </div>
    </div>
  );
}
