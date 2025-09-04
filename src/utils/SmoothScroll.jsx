"use client";

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

const SmoothScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    window.lenis = lenis;

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    const forceResize = () => {
      lenis.resize();
      setTimeout(() => lenis.resize(), 300); // In case layout shifts again
      setTimeout(() => lenis.resize(), 1000); // Failsafe resize
    };

    // On load
    window.addEventListener('load', forceResize);
    window.addEventListener('resize', lenis.resize);

    // 🔁 Also call after first render
    requestAnimationFrame(() => {
      forceResize();
    });

    return () => {
      lenis.destroy();
      window.removeEventListener('load', forceResize);
      window.removeEventListener('resize', lenis.resize);
    };
  }, []);

  return null;
};

export default SmoothScroll;
