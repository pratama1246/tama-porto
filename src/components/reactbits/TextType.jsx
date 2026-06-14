'use client';

import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { gsap } from 'gsap';

const TextType = ({
  text,
  as: Component = 'div',
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = true,
  className = '',
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = '|',
  cursorClassName = '',
  cursorBlinkDuration = 0.5,
  textColors = [],
  variableSpeed,
  onSentenceComplete,
  startOnVisible = false,
  reverseMode = false,
  ...props
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(!startOnVisible);
  const cursorRef = useRef(null);
  const containerRef = useRef(null);

  const isSegmented = useMemo(() => {
    return Array.isArray(text) && text.length > 0 && typeof text[0] === 'object' && 'text' in text[0];
  }, [text]);

  const textArray = useMemo(() => {
    if (isSegmented) {
      const flatText = text.map(s => s.text).join('');
      return [flatText];
    }
    return Array.isArray(text) ? text : [text];
  }, [text, isSegmented]);

  const getRandomSpeed = useCallback(() => {
    if (!variableSpeed) return typingSpeed;
    const { min, max } = variableSpeed;
    return Math.random() * (max - min) + min;
  }, [variableSpeed, typingSpeed]);

  const getCurrentTextColor = () => {
    if (textColors.length === 0) return 'inherit';
    return textColors[currentTextIndex % textColors.length];
  };

  useEffect(() => {
    if (!startOnVisible || !containerRef.current) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [startOnVisible]);

  useEffect(() => {
    if (showCursor && cursorRef.current) {
      gsap.set(cursorRef.current, { opacity: 1 });
      const anim = gsap.to(cursorRef.current, {
        opacity: 0,
        duration: cursorBlinkDuration,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
      });
      return () => {
        anim.kill();
      };
    }
  }, [showCursor, cursorBlinkDuration]);

  useEffect(() => {
    if (!isVisible) return;

    let timeout;

    const currentText = textArray[currentTextIndex];
    const processedText = reverseMode ? currentText.split('').reverse().join('') : currentText;

    const executeTypingAnimation = () => {
      if (isDeleting) {
        if (displayedText === '') {
          setIsDeleting(false);
          if (currentTextIndex === textArray.length - 1 && !loop) {
            return;
          }

          if (onSentenceComplete) {
            onSentenceComplete(textArray[currentTextIndex], currentTextIndex);
          }

          setCurrentTextIndex(prev => (prev + 1) % textArray.length);
          setCurrentCharIndex(0);
          timeout = setTimeout(() => {}, pauseDuration);
        } else {
          timeout = setTimeout(() => {
            setDisplayedText(prev => prev.slice(0, -1));
          }, deletingSpeed);
        }
      } else {
        if (currentCharIndex < processedText.length) {
          timeout = setTimeout(
            () => {
              setDisplayedText(prev => prev + processedText[currentCharIndex]);
              setCurrentCharIndex(prev => prev + 1);
            },
            variableSpeed ? getRandomSpeed() : typingSpeed
          );
        } else if (textArray.length >= 1) {
          if (!loop && currentTextIndex === textArray.length - 1) return;
          timeout = setTimeout(() => {
            setIsDeleting(true);
          }, pauseDuration);
        }
      }
    };

    if (currentCharIndex === 0 && !isDeleting && displayedText === '') {
      timeout = setTimeout(executeTypingAnimation, initialDelay);
    } else {
      executeTypingAnimation();
    }

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentCharIndex,
    displayedText,
    isDeleting,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    textArray,
    currentTextIndex,
    loop,
    initialDelay,
    isVisible,
    reverseMode,
    variableSpeed,
    onSentenceComplete
  ]);

  const shouldHideCursor =
    hideCursorWhileTyping && (currentCharIndex < textArray[currentTextIndex].length || isDeleting);

  const renderSegmentedText = () => {
    let charCounter = 0;
    
    return text.map((seg, idx) => {
      const start = charCounter;
      const end = start + seg.text.length;
      charCounter = end;

      if (currentCharIndex <= start) {
        return null;
      }

      const isPartiallyRevealed = currentCharIndex < end;
      const visibleText = isPartiallyRevealed 
        ? seg.text.slice(0, currentCharIndex - start) 
        : seg.text;

      if (seg.type === 'underline') {
        return (
          <span key={idx} className="relative inline-block px-1 text-[var(--text-dark)] font-medium">
            <span className="relative z-10">{visibleText}</span>
            {visibleText.length > 0 && (
              <svg
                className="absolute left-0 bottom-[-2px] w-full h-[6px] text-[var(--accent-pink)] opacity-85 pointer-events-none"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
                fill="none"
              >
                <path
                  d="M3,7 Q35,3 65,7 T97,5"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </span>
        );
      }

      if (seg.type === 'highlight') {
        return (
          <span 
            key={idx} 
            className="relative inline-block px-2 py-0.5 mx-0.5 bg-[var(--accent-yellow)]/65 border border-black/5 rounded-[4px] rotate-[-1.5deg] text-[var(--text-dark)] font-semibold shadow-xs"
          >
            {visibleText}
          </span>
        );
      }

      return (
        <span key={idx} className="inline">
          {visibleText}
        </span>
      );
    });
  };

  const Tag = Component;
  return (
    <Tag
      ref={containerRef}
      className={`inline-block whitespace-pre-wrap tracking-tight ${className}`}
      {...props}
    >
      {isSegmented ? (
        renderSegmentedText()
      ) : (
        <span className="inline" style={{ color: getCurrentTextColor() || 'inherit' }}>
          {displayedText}
        </span>
      )}
      {showCursor && (
        <span
          ref={cursorRef}
          className={`ml-1 inline-block opacity-100 ${shouldHideCursor ? 'hidden' : ''} ${cursorClassName}`}
        >
          {cursorCharacter}
        </span>
      )}
    </Tag>
  );
};

export default TextType;
