import React, { useRef, useCallback } from 'react';

export function useThrottle(fn, delay) {
  const lastCallref = useRef(0);

  return useCallback(
    (...args) => {
      const now = Date.now();
      if (now - lastCallref.current < delay) {
        return;
      }
      lastCallref.current = now;
      fn(...args);
    },
    [fn, delay]
  );
}