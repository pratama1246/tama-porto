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

export default function CardNav({
  items,
  className = '',
  logo,
  logoAlt = 'Logo',
  onLogoClick,
  isLoading = false,
  ease = 'power3.out'
}) {
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
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={!isLoading ? { y: 0, opacity: 1 } : { y: -60, opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      className={`card-nav-container fixed top-0 inset-x-0 w-full z-[99] ${className}`}
    >
      <nav
        ref={navRef}
        className={`card-nav ${isExpanded ? 'open' : ''} w-full block h-14 sm:h-16 p-0 border-b border-black/[0.08] bg-[#fdf6e3]/85 backdrop-blur-md relative overflow-hidden transition-all`}
      >
        <div 
          className="card-nav-top w-full max-w-[1600px] mx-auto h-14 sm:h-16 flex items-center justify-between px-4 sm:px-8 md:px-12 lg:px-16"
        >
          {/* Mobile: Logo on Left */}
          <div className="logo-container flex md:hidden items-center order-1">
            {logo ? (
              <img
                src={logo}
                alt={logoAlt}
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                className="protected-image logo h-[30px]"
              />
            ) : (
              <a
                id="nav-brand-mobile"
                href="#hero"
                className="logo font-semibold tracking-tight text-base select-none no-underline flex items-center gap-2 text-ink-black cursor-pointer group"
                style={{ fontFamily: 'var(--font-display)' }}
                onClick={(e) => {
                  if (onLogoClick) onLogoClick(e);
                  if (isExpanded) toggleMenu();
                }}
              >
                <div className="w-7 h-7 shrink-0 group-hover:scale-105 transition-transform">
                  <img
                    src="/favicon.svg"
                    alt="Tama Polaroid Logo"
                    className="w-full h-full object-contain select-none pointer-events-none"
                    draggable={false}
                  />
                </div>
                <span className="font-bold">tama<span className="text-[#ff6b9d]">.</span>gallery</span>
              </a>
            )}
          </div>

          {/* Mobile: Menu Toggle Button on Right */}
          <button
            type="button"
            onClick={toggleMenu}
            aria-label={isExpanded ? 'Close menu' : 'Open menu'}
            className="md:hidden flex items-center gap-1.5 px-3 py-1.5 bg-black/[0.04] hover:bg-black/[0.08] border border-black/10 rounded-md active:scale-95 transition-all text-ink-black font-mono font-semibold text-[11px] uppercase tracking-wider cursor-pointer order-2 select-none"
          >
            {isHamburgerOpen ? (
              <>
                <span className="text-[12px] leading-none">✕</span>
                <span className="leading-none">CLOSE</span>
              </>
            ) : (
              <>
                <div className="flex flex-col gap-[3px] w-3.5 items-start justify-center">
                  <span className="w-3.5 h-[1.5px] bg-ink-black rounded-full block" />
                  <span className="w-2.5 h-[1.5px] bg-ink-black rounded-full block" />
                  <span className="w-3.5 h-[1.5px] bg-ink-black rounded-full block" />
                </div>
                <span className="leading-none">MENU</span>
              </>
            )}
          </button>

          {/* Desktop Left Wing: Nav Links */}
          <div className="hidden md:flex items-center justify-start gap-1.5 lg:gap-2.5 flex-1">
            <a
              href="#hero"
              className="px-3 py-1.5 rounded-md text-xs font-mono font-semibold uppercase tracking-wider text-text-dark/75 hover:text-ink-black hover:bg-black/[0.04] transition-colors no-underline"
            >
              Home
            </a>
            <a
              href="#about"
              className="px-3 py-1.5 rounded-md text-xs font-mono font-semibold uppercase tracking-wider text-text-dark/75 hover:text-ink-black hover:bg-black/[0.04] transition-colors no-underline"
            >
              About
            </a>
            <a
              href="#journey"
              className="px-3 py-1.5 rounded-md text-xs font-mono font-semibold uppercase tracking-wider text-text-dark/75 hover:text-ink-black hover:bg-black/[0.04] transition-colors no-underline"
            >
              Journey
            </a>
          </div>

          {/* Desktop Centerpiece: Centered Brand Logo */}
          <div className="hidden md:flex items-center justify-center shrink-0 px-4">
            {logo ? (
              <img
                src={logo}
                alt={logoAlt}
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                className="protected-image logo h-[30px]"
              />
            ) : (
              <a
                id="nav-brand-desktop"
                href="#hero"
                className="logo font-semibold tracking-tight text-base sm:text-lg select-none no-underline flex items-center gap-2.5 text-ink-black cursor-pointer group"
                style={{ fontFamily: 'var(--font-display)' }}
                onClick={(e) => {
                  if (onLogoClick) onLogoClick(e);
                  if (isExpanded) toggleMenu();
                }}
              >
                {/* Polaroid Favicon Icon */}
                <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 shrink-0 group-hover:scale-110 transition-transform">
                  <img
                    src="/favicon.svg"
                    alt="Tama Polaroid Logo"
                    className="w-full h-full object-contain select-none pointer-events-none"
                    draggable={false}
                  />
                </div>
                <span className="font-bold tracking-tight">tama<span className="text-[#ff6b9d]">.</span>gallery</span>
              </a>
            )}
          </div>

          {/* Desktop Right Wing: Nav Links & CTA */}
          <div className="hidden md:flex items-center justify-end gap-1.5 lg:gap-2.5 flex-1">
            <a
              href="#projects"
              className="px-3 py-1.5 rounded-md text-xs font-mono font-semibold uppercase tracking-wider text-text-dark/75 hover:text-ink-black hover:bg-black/[0.04] transition-colors no-underline"
            >
              Projects
            </a>
            <a
              href="#skills"
              className="px-3 py-1.5 rounded-md text-xs font-mono font-semibold uppercase tracking-wider text-text-dark/75 hover:text-ink-black hover:bg-black/[0.04] transition-colors no-underline"
            >
              Skills
            </a>
            <a
              href="#certifications"
              className="px-3 py-1.5 rounded-md text-xs font-mono font-semibold uppercase tracking-wider text-text-dark/75 hover:text-ink-black hover:bg-black/[0.04] transition-colors no-underline"
            >
              Certs
            </a>
            <a
              href="#contact"
              className="ml-2 px-3.5 py-1.5 rounded-md bg-ink-black text-white hover:bg-neutral-800 font-mono text-xs font-semibold uppercase tracking-wider transition-colors no-underline inline-flex items-center gap-1.5"
            >
              <span>Contact</span>
              <span className="text-xs">→</span>
            </a>
          </div>
        </div>

        {/* Expanded Content Grid (Mobile Drawer only) */}
        <div
          className={`card-nav-content absolute left-0 right-0 top-[56px] bottom-0 p-4 flex flex-col items-stretch gap-3 justify-start z-[1] max-w-lg mx-auto ${
            isExpanded ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
          } md:hidden`}
          aria-hidden={!isExpanded}
        >
          {(items || []).slice(0, 3).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="nav-card select-none relative flex flex-col gap-3 rounded-xl border border-black/10 min-w-0 flex-[1_1_auto] h-auto min-h-[110px] shadow-xs"
              ref={setCardRef(idx)}
              style={{ 
                backgroundColor: item.bgColor, 
                color: item.textColor,
                padding: '16px'
              }}
            >
              <div 
                className="nav-card-label font-semibold tracking-tight text-[16px]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {item.label}
              </div>
              <div className="nav-card-links mt-0.5 flex flex-col gap-2">
                {item.links?.map((lnk, i) => {
                  const isExternal = lnk.href?.startsWith('http');
                  return (
                    <a
                      key={`${lnk.label}-${i}`}
                      className="nav-card-link inline-flex items-center gap-1.5 no-underline cursor-pointer transition-opacity duration-200 hover:opacity-75 text-[13px] font-medium"
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
                      <ArrowUpRight className="nav-card-link-icon shrink-0 w-3.5 h-3.5 opacity-70" />
                      {lnk.label}
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </motion.header>
  );
}
