import React, { useEffect, useState } from 'react';

function Timer() {
  const [time, setTime] = useState(0);
  const [running, setIsRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [running]);

  function formatTime(time) {
    const mins = String(Math.floor(time / 60)).padStart(2, '0');
    const secs = String(time % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  }

  return (
    <div>
      <div>{formatTime(time)}</div>
      <div>
        <button onClick={() => setIsRunning(true)}>start</button>
        <button onClick={() => setIsRunning(false)}>stop</button>
        <button onClick={() => setTime(0)}>reset</button>
      </div>
    </div>
  );
}

export default Timer;
