import React, { useState, useEffect, useRef } from 'react';
import { useThrottle } from '../hooks/useThrottle.jsx';
import { useDebounce } from '../hooks/useDebounce.jsx';

const DebounceThrottel = () => {
  const [inputval, setInputval] = useState('');
  const debouceInput = useDebounce(inputval, 1000);

  useEffect(() => {
    if (debouceInput) {
      console.log(debouceInput);
    }
  }, [debouceInput]);

  function handleInput(e) {
    setInputval(e.target.value);
  }

  function handleClick(a1) {
    console.log('clicked', a1);
  }

  const throttledClick = useThrottle(handleClick, 1000);

  return (
    <>
      <input type="text" onChange={handleInput} />
      <button onClick={() => throttledClick('test')}>Click more</button>
    </>
  );
};

export default DebounceThrottel;
