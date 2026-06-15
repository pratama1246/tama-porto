// src/components/CardNav.jsx
// GSAP-powered scrapbook-style card navigation
// Desktop: clean horizontal scrapbook-style tab links (no hamburger, no CTA button)
// Mobile: cool interactive card menu using GSAP heights

import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';

// Custom SVG arrow icon to replace react-icons/go
function ArrowUpRight({ className, ...props }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
      aria-hidden="true"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

const CardNav = ({
  logo,
  logoAlt = 'Logo',
  items,
  className = '',
  ease = 'power3.out',
  baseColor = '#fdf6e3', // Matches --bg-primary (grid paper) from DESIGN.md
  menuColor = '#2d2d2d'
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef(null);
  const cardsRef = useRef([]);
  const tlRef = useRef(null);

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 300;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      const contentEl = navEl.querySelector('.card-nav-content');
      if (contentEl) {
        const wasVisible = contentEl.style.visibility;
        const wasPointerEvents = contentEl.style.pointerEvents;
        const wasPosition = contentEl.style.position;
        const wasHeight = contentEl.style.height;

        contentEl.style.visibility = 'visible';
        contentEl.style.pointerEvents = 'auto';
        contentEl.style.position = 'static';
        contentEl.style.height = 'auto';

        // Trigger reflow to read correct scrollHeight
        contentEl.offsetHeight;

        const topBar = 48; // height of mobile top bar (h-12 = 48px)
        const padding = 16;
        const contentHeight = contentEl.scrollHeight;

        contentEl.style.visibility = wasVisible;
        contentEl.style.pointerEvents = wasPointerEvents;
        contentEl.style.position = wasPosition;
        contentEl.style.height = wasHeight;

        return topBar + contentHeight + padding;
      }
    }
    return 300;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (!isMobile) {
      // Clear any GSAP inline styles on desktop and let Tailwind classes (h-16) handle height
      gsap.set(navEl, { clearProps: 'height,overflow' });
      return null;
    }

    gsap.set(navEl, { height: 48, overflow: 'hidden' });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.4,
      ease
    });

    tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 }, '-=0.1');

    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;

    return () => {
      tl?.kill();
      tlRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ease, items]);

  useLayoutEffect(() => {
    const handleResize = () => {
      const isMobile = window.matchMedia('(max-width: 768px)').matches;

      if (!isMobile) {
        // On desktop, clear GSAP heights completely so h-14 (56px) CSS takes over
        gsap.set(navRef.current, { clearProps: 'height,overflow' });
        setIsExpanded(false);
        setIsHamburgerOpen(false);
        if (tlRef.current) tlRef.current.kill();
        return;
      }

      if (!tlRef.current) {
        const newTl = createTimeline();
        if (newTl) tlRef.current = newTl;
      }

      if (isExpanded) {
        const newHeight = calculateHeight();
        gsap.set(navRef.current, { height: newHeight });

        if (tlRef.current) {
          tlRef.current.kill();
          const newTl = createTimeline();
          if (newTl) {
            newTl.progress(1);
            tlRef.current = newTl;
          }
        }
      } else {
        if (tlRef.current) {
          tlRef.current.kill();
          const newTl = createTimeline();
          if (newTl) {
            tlRef.current = newTl;
          }
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
      tl.reverse();
    }
  };

  const setCardRef = i => el => {
    if (el) cardsRef.current[i] = el;
  };

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className={`card-nav-container fixed left-4 right-4 md:left-auto md:right-8 w-auto md:w-[90%] max-w-[720px] z-[99] top-[1em] md:top-[1.2em] ${className}`}
    >
      <nav
        ref={navRef}
        className={`card-nav ${isExpanded ? 'open' : ''} block h-12 md:h-14 p-0 rounded-xl shadow-[var(--shadow-sm)] border border-[rgba(160,160,190,0.2)] relative overflow-hidden`}
        style={{ backgroundColor: baseColor }}
      >
        <div 
          className="card-nav-top absolute inset-x-0 top-0 h-12 md:h-14 flex items-center justify-between z-[2]"
          style={{ paddingLeft: '16px', paddingRight: '16px' }}
        >
          {/* Hamburger Menu Icon (Mobile Only) */}
          <div
            className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''} group h-full md:hidden flex flex-col items-center justify-center cursor-pointer gap-[6px] order-2`}
            onClick={toggleMenu}
            role="button"
            aria-label={isExpanded ? 'Close menu' : 'Open menu'}
            tabIndex={0}
            style={{ color: menuColor }}
          >
            <div
              className={`hamburger-line w-[24px] h-[2px] bg-current transition-[transform,opacity,margin] duration-300 ease-linear [transform-origin:50%_50%] ${
                isHamburgerOpen ? 'translate-y-[4px] rotate-45' : ''
              } group-hover:opacity-75`}
            />
            <div
              className={`hamburger-line w-[24px] h-[2px] bg-current transition-[transform,opacity,margin] duration-300 ease-linear [transform-origin:50%_50%] ${
                isHamburgerOpen ? '-translate-y-[4px] -rotate-45' : ''
              } group-hover:opacity-75`}
            />
          </div>

          {/* Logo Container */}
          <div className="logo-container flex items-center order-1">
            {logo ? (
              <img src={logo} alt={logoAlt} className="logo h-[28px]" />
            ) : (
              <a
                href="#hero"
                className="logo font-semibold tracking-tight text-base select-none no-underline"
                style={{ fontFamily: 'var(--font-display)', color: '#2d2d2d' }}
                onClick={() => {
                  if (isExpanded) toggleMenu();
                }}
              >
                tama<span style={{ color: '#e29578' }}>.</span>gallery
              </a>
            )}
          </div>

          {/* Desktop Links (Hidden on Mobile, Styled as cute index tabs/tapes) */}
          <div className="hidden md:flex items-center gap-2 order-2 ml-auto">
            <a
              href="#hero"
              className="px-2.5 py-1 rounded-sm text-[11px] font-semibold uppercase tracking-wider transition-all duration-200 select-none no-underline border border-black/5 hover:-translate-y-0.5 hover:scale-105 active:scale-95"
              style={{
                backgroundColor: '#b8d8e8', // --accent-blue
                color: '#2d2d2d',
                transform: 'rotate(-1.5deg)',
                fontFamily: 'var(--font-body)'
              }}
            >
              Home
            </a>
            <a
              href="#about"
              className="px-2.5 py-1 rounded-sm text-[11px] font-semibold uppercase tracking-wider transition-all duration-200 select-none no-underline border border-black/5 hover:-translate-y-0.5 hover:scale-105 active:scale-95"
              style={{
                backgroundColor: '#c8b8e8', // --accent-lavender
                color: '#2d2d2d',
                transform: 'rotate(1deg)',
                fontFamily: 'var(--font-body)'
              }}
            >
              About
            </a>
            <a
              href="#projects"
              className="px-2.5 py-1 rounded-sm text-[11px] font-semibold uppercase tracking-wider transition-all duration-200 select-none no-underline border border-black/5 hover:-translate-y-0.5 hover:scale-105 active:scale-95"
              style={{
                backgroundColor: '#ffb3c6', // --accent-pink
                color: '#2d2d2d',
                transform: 'rotate(-1deg)',
                fontFamily: 'var(--font-body)'
              }}
            >
              Projects
            </a>
            <a
              href="#skills"
              className="px-2.5 py-1 rounded-sm text-[11px] font-semibold uppercase tracking-wider transition-all duration-200 select-none no-underline border border-black/5 hover:-translate-y-0.5 hover:scale-105 active:scale-95"
              style={{
                backgroundColor: '#b8e8d0', // --accent-mint
                color: '#2d2d2d',
                transform: 'rotate(1.5deg)',
                fontFamily: 'var(--font-body)'
              }}
            >
              Skills
            </a>
            <a
              href="#certifications"
              className="px-2.5 py-1 rounded-sm text-[11px] font-semibold uppercase tracking-wider transition-all duration-200 select-none no-underline border border-black/5 hover:-translate-y-0.5 hover:scale-105 active:scale-95"
              style={{
                backgroundColor: '#ffeaa7', // --accent-yellow
                color: '#2d2d2d',
                transform: 'rotate(-0.8deg)',
                fontFamily: 'var(--font-body)'
              }}
            >
              Certifications
            </a>
            <a
              href="#contact"
              className="px-2.5 py-1 rounded-sm text-[11px] font-semibold uppercase tracking-wider transition-all duration-200 select-none no-underline border border-black/5 hover:-translate-y-0.5 hover:scale-105 active:scale-95"
              style={{
                backgroundColor: '#ffd4b8', // --accent-peach
                color: '#2d2d2d',
                transform: 'rotate(-1deg)',
                fontFamily: 'var(--font-body)'
              }}
            >
              Contact
            </a>
          </div>
        </div>

        {/* Expanded Content Grid (Mobile Drawer only) */}
        <div
          className={`card-nav-content absolute left-0 right-0 top-[48px] bottom-0 p-4 flex flex-col items-stretch gap-4 justify-start z-[1] ${
            isExpanded ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
          } md:hidden`}
          aria-hidden={!isExpanded}
        >
          {(items || []).slice(0, 3).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="nav-card select-none relative flex flex-col gap-4 rounded-[calc(0.75rem-0.2rem)] border border-black/5 min-w-0 flex-[1_1_auto] h-auto min-h-[120px]"
              ref={setCardRef(idx)}
              style={{ 
                backgroundColor: item.bgColor, 
                color: item.textColor,
                padding: '20px'
              }}
            >
              <div 
                className="nav-card-label font-semibold tracking-tight text-[18px]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {item.label}
              </div>
              <div className="nav-card-links mt-1 flex flex-col gap-2.5">
                {item.links?.map((lnk, i) => {
                  const isExternal = lnk.href?.startsWith('http');
                  return (
                    <a
                      key={`${lnk.label}-${i}`}
                      className="nav-card-link inline-flex items-center gap-[6px] no-underline cursor-pointer transition-opacity duration-300 hover:opacity-75 text-[14px] font-medium"
                      style={{ fontFamily: 'var(--font-body)', color: 'inherit' }}
                      href={lnk.href}
                      aria-label={lnk.ariaLabel}
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noopener noreferrer' : undefined}
                      onClick={() => {
                        // Close menu when clicking internal anchor links
                        if (!isExternal) {
                          toggleMenu();
                        }
                      }}
                    >
                      <ArrowUpRight className="nav-card-link-icon shrink-0 w-3.5 h-3.5 opacity-80" />
                      {lnk.label}
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </motion.div>
  );
};

export default CardNav;
