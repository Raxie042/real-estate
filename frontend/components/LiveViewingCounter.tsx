'use client';

import { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  listingId: string;
}

export default function LiveViewingCounter({ listingId }: Props) {
  const [count, setCount] = useState<number | null>(null);
  const [prev, setPrev] = useState<number | null>(null);

  useEffect(() => {
    // Seed a pseudo-random but stable initial count based on listingId
    const seed = listingId.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    const initial = 2 + (seed % 7); // 2–8
    setCount(initial);

    // Drift count every 25–45s to simulate live activity
    const drift = () => {
      const interval = 25000 + Math.random() * 20000;
      return setTimeout(() => {
        setCount(c => {
          if (c === null) return initial;
          setPrev(c);
          const delta = Math.random() < 0.6 ? 1 : -1;
          return Math.max(1, Math.min(12, c + delta));
        });
        driftRef.current = drift();
      }, interval);
    };

    const driftRef = { current: drift() };
    return () => clearTimeout(driftRef.current);
  }, [listingId]);

  if (count === null) return null;

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9A96A] opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C9A96A]" />
      </span>
      <Eye size={14} className="text-[#7A6E60]" />
      <AnimatePresence mode="wait">
        <motion.span
          key={count}
          initial={{ y: prev !== null && count > prev ? -8 : 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: prev !== null && count > prev ? 8 : -8, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="font-semibold text-[#1C1A17]"
        >
          {count}
        </motion.span>
      </AnimatePresence>
      <span className="text-[#7A6E60]">{count === 1 ? 'person' : 'people'} viewing now</span>
    </div>
  );
}
