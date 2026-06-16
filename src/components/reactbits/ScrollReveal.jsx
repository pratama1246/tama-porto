import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = ({
  children,
  scrollContainerRef,
  triggerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  rotationEnd = 'bottom bottom',
  wordAnimationEnd = 'bottom bottom'
}) => {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="inline-block word" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;
    const trigger = triggerRef && triggerRef.current ? triggerRef.current : el;

    // If we trigger on a parent sticky container, run exactly for the sticky duration (top+=200px top to bottom bottom)
    const startVal = triggerRef ? 'top+=200px top' : 'top 85%';
    const endVal = triggerRef ? 'bottom bottom' : 'top 45%';
    const rotEndVal = triggerRef ? 'bottom bottom' : 'top 55%';



    // ScrollTrigger for rotation
    const animRotation = gsap.fromTo(
      el,
      { transformOrigin: '0% 50%', rotate: baseRotation },
      {
        ease: 'none',
        rotate: 0,
        scrollTrigger: {
          trigger,
          scroller,
          start: startVal,
          end: rotEndVal,
          scrub: true
        }
      }
    );

    const wordElements = el.querySelectorAll('.word');

    // ScrollTrigger for opacity
    const animOpacity = gsap.fromTo(
      wordElements,
      { opacity: baseOpacity, willChange: 'opacity' },
      {
        ease: 'none',
        opacity: 1,
        stagger: 0.05,
        scrollTrigger: {
          trigger,
          scroller,
          start: startVal,
          end: endVal,
          scrub: true
        }
      }
    );

    // ScrollTrigger for blur
    const isMobileDevice = window.innerWidth < 1024;
    let animBlur = null;
    if (enableBlur && !isMobileDevice) {
      animBlur = gsap.fromTo(
        wordElements,
        { filter: `blur(${blurStrength}px)` },
        {
          ease: 'none',
          filter: 'blur(0px)',
          stagger: 0.05,
          scrollTrigger: {
            trigger,
            scroller,
            start: startVal,
            end: endVal,
            scrub: true
          }
        }
      );
    }



    return () => {
      animRotation.scrollTrigger?.kill();
      animRotation.kill();
      
      animOpacity.scrollTrigger?.kill();
      animOpacity.kill();
      
      if (animBlur) {
        animBlur.scrollTrigger?.kill();
        animBlur.kill();
      }
    };
  }, [scrollContainerRef, triggerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength]);

  return (
    <h2 ref={containerRef} className={`my-5 ${containerClassName}`}>
      <p className={`text-[clamp(1.6rem,4vw,3rem)] leading-[1.5] font-semibold ${textClassName}`}>{splitText}</p>
    </h2>
  );
};

export default ScrollReveal;
