import React, { useState, useEffect } from 'react';

export function useDebounce(val, delay) {
  const [debounceInput, setdebounceInput] = useState('');

  useEffect(() => {
    const timeoutInterval = setTimeout(() => {
      setdebounceInput(val);
    }, delay);
    return () => clearInterval(timeoutInterval);
  }, [val]);

  return debounceInput;
}
