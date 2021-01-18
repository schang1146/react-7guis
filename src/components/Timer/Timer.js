import React, { useEffect, useState } from 'react';

function ProgressBar() {
  return <div>Progress Bar!</div>;
}

function Timer() {
  const [startTime, setStartTime] = useState(Date.now());
  const [currentTime, setCurrentTime] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  const [timer, setTimer] = useState(20);

  useEffect(() => {
    setInterval(() => {
      setCurrentTime(Date.now());
    }, 100);
  }, []);

  return (
    <div>
      <h2>Timer</h2>
      Elapsed Time: <ProgressBar />
      <br />
      {`${Math.round((currentTime - startTime) / 100) / 10}`}s
      <br />
      Duration{' '}
      <input
        type='range'
        min='5'
        max='60'
        value={timer}
        onChange={(e) => {
          setTimer(e.target.value);
        }}
      />
      <br />
      <button
        onClick={() => {
          setStartTime(Date.now());
        }}
      >
        Reset
      </button>
    </div>
  );
}

export default Timer;
