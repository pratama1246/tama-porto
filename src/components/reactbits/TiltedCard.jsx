import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2
};

export default function TiltedCard({
  imageSrc,
  altText = 'Tilted card image',
  captionText = '',
  containerHeight = '300px',
  containerWidth = '100%',
  imageHeight = '260px',
  imageWidth = '260px',
  scaleOnHover = 1.05,
  rotateAmplitude = 12,
  showMobileWarning = false,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false,
  isPolaroid = false,
  polaroidLabel = ''
}) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1
  });

  const [lastY, setLastY] = useState(0);

  function handleMouse(e) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velocityY = offsetY - lastY;
    rotateFigcaption.set(-velocityY * 0.6);
    setLastY(offsetY);
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
    opacity.set(1);
  }

  function handleMouseLeave() {
    opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
  }

  return (
    <figure
      ref={ref}
      className="relative w-full h-full [perspective:800px] flex flex-col items-center justify-center select-none"
      style={{
        height: containerHeight,
        width: containerWidth
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showMobileWarning && (
        <div className="absolute top-4 text-center text-sm block sm:hidden font-body text-[var(--text-muted)]">
          This effect is not optimized for mobile. Check on desktop.
        </div>
      )}

      <motion.div
        className={`relative [transform-style:preserve-3d] ${
          isPolaroid 
            ? 'bg-white p-[10px] pb-[52px] shadow-sm rounded-[4px] border border-[#e5dec9]' 
            : 'rounded-[4px] overflow-hidden'
        }`}
        style={{
          width: imageWidth,
          height: isPolaroid ? `calc(${imageHeight} + 42px)` : imageHeight,
          rotateX,
          rotateY,
          scale
        }}
      >
        <motion.img
          src={imageSrc}
          alt={altText}
          className={`object-cover will-change-transform [transform:translateZ(0)] ${
            isPolaroid 
              ? 'rounded-[2px] w-full h-full border border-black/5' 
              : 'absolute top-0 left-0 rounded-[4px]'
          }`}
          style={isPolaroid ? {} : {
            width: imageWidth,
            height: imageHeight
          }}
        />

        {isPolaroid && polaroidLabel && (
          <div 
            className="absolute bottom-2.5 left-0 right-0 text-center font-handwrite text-[11px] md:text-[12px] px-2 leading-snug text-[var(--text-handwrite)] [transform:translateZ(12px)] pointer-events-none"
          >
            {polaroidLabel}
          </div>
        )}

        {displayOverlayContent && overlayContent && (
          <motion.div 
            className={`absolute z-[2] will-change-transform [transform:translateZ(30px)] ${
              isPolaroid ? 'top-[10px] left-[10px]' : 'top-0 left-0'
            }`}
            style={{
              width: isPolaroid ? `calc(${imageWidth} - 20px)` : imageWidth,
              height: isPolaroid ? `calc(${imageHeight} - 20px)` : imageHeight
            }}
          >
            {overlayContent}
          </motion.div>
        )}
      </motion.div>

      {showTooltip && captionText && (
        <motion.figcaption
          className="pointer-events-none absolute left-0 top-0 rounded-[4px] bg-white border border-[#e5dec9] px-[10px] py-[4px] text-[11px] font-handwrite text-[#2d2d2d] shadow-sm opacity-0 z-[3] hidden sm:block"
          style={{
            x,
            y,
            opacity,
            rotate: rotateFigcaption
          }}
        >
          {captionText}
        </motion.figcaption>
      )}
    </figure>
  );
}
