import React, { useEffect, useState, useRef, useCallback } from 'react';

interface AnimatedStatCounterProps {
  value: string;
  duration?: number;
  className?: string;
  triggerKey?: number;
}

export const AnimatedStatCounter: React.FC<AnimatedStatCounterProps> = ({
  value,
  duration = 1800,
  className = '',
  triggerKey = 0,
}) => {
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const [isInView, setIsInView] = useState<boolean>(false);
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);

  // Parse raw value string: e.g. "5,000+" -> target: 5000, prefix: "", suffix: "+", decimals: 0
  // "4.9★" -> target: 4.9, prefix: "", suffix: "★", decimals: 1
  const parsed = React.useMemo(() => {
    const match = value.match(/^([^0-9.]*)([0-9,]+(?:\.[0-9]+)?)(.*)$/);
    if (!match) {
      return { prefix: '', target: 0, suffix: value, decimals: 0, hasCommas: false };
    }
    const prefix = match[1] || '';
    const numStr = match[2];
    const suffix = match[3] || '';
    const hasCommas = numStr.includes(',');
    const cleanNumStr = numStr.replace(/,/g, '');
    const target = parseFloat(cleanNumStr) || 0;
    const decimalParts = cleanNumStr.split('.');
    const decimals = decimalParts.length > 1 ? decimalParts[1].length : 0;
    return { prefix, target, suffix, decimals, hasCommas };
  }, [value]);

  const [currentNum, setCurrentNum] = useState<number>(0);

  // Viewport intersection observer to start count when visible
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            setHasAnimated(true);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -20px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const runAnimation = useCallback(() => {
    let startTime: number | null = null;
    let animationFrameId: number;

    const startVal = 0;
    const endVal = parsed.target;
    const diff = endVal - startVal;

    setCurrentNum(0);

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth cubic ease-out: 1 - (1 - progress)^3
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const val = startVal + diff * easeOut;

      setCurrentNum(val);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCurrentNum(endVal);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [parsed.target, duration]);

  useEffect(() => {
    if (!isInView) return;
    const cleanup = runAnimation();
    return () => {
      if (cleanup) cleanup();
    };
  }, [isInView, triggerKey, runAnimation]);

  // Format display string
  const formatDisplay = () => {
    if (!isInView && !hasAnimated) {
      // Initial render starts explicitly at 0
      return `${parsed.prefix}${parsed.decimals > 0 ? (0).toFixed(parsed.decimals) : '0'}${parsed.suffix}`;
    }

    if (parsed.decimals > 0) {
      return `${parsed.prefix}${currentNum.toFixed(parsed.decimals)}${parsed.suffix}`;
    }

    const rounded = Math.round(currentNum);
    const formattedNum = parsed.hasCommas ? rounded.toLocaleString('en-US') : rounded.toString();
    return `${parsed.prefix}${formattedNum}${parsed.suffix}`;
  };

  return (
    <span ref={containerRef} className={className}>
      {formatDisplay()}
    </span>
  );
};
