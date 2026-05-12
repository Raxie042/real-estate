'use client';

import { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  className = '',
  once = true,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: '-60px' });
  const controls = useAnimation();

  const initialMap = {
    up:    { opacity: 0, y: 32 },
    left:  { opacity: 0, x: -32 },
    right: { opacity: 0, x: 32 },
    none:  { opacity: 0 },
  };

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, x: 0, y: 0, transition: { duration, delay, ease: [0.22, 1, 0.36, 1] } });
    }
  }, [inView, controls, delay, duration]);

  return (
    <motion.div
      ref={ref}
      initial={initialMap[direction]}
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
}
