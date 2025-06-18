import React from 'react';
import { useTheme } from '../context/ThemeContext.js';

const TestComponent = () => {
  const {theme, toggleTheme} = useTheme();
  return (
    <>
      <h1>hello</h1>
      <h2>{`` + theme}</h2>
      <button onClick={toggleTheme}>toggle</button>
    </>
  );
};

export default TestComponent;
