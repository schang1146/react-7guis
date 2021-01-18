import React, { useEffect, useRef, useState } from 'react';
import styles from './Timer.module.css';

function ProgressBar({ progress }) {
  return (
    <div className={styles['progress-bar']}>
      <div className={styles['progress']} style={{ width: `${progress * 100 < 100 ? progress * 100 : 100}%` }} />
    </div>
  );
}

function Timer() {
  const intervalId = useRef(null);
  const [timeElapsed, setTimeElapsed] = useState(0.0);
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    intervalId.current = setInterval(() => {
      setTimeElapsed((timeElapsed) => timeElapsed + 100);
    }, 100);
  }, []);

  useEffect(() => {
    if (timeElapsed / 1000 >= timer) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    } else {
      if (intervalId.current === null) {
        intervalId.current = setInterval(() => {
          setTimeElapsed((timeElapsed) => timeElapsed + 100);
        }, 100);
      }
    }
  }, [timeElapsed, timer]);

  const reset = () => {
    clearInterval(intervalId.current);
    intervalId.current = null;
    setTimeElapsed(0.0);
  };

  return (
    <div>
      <h2>Timer</h2>
      Elapsed Time: <ProgressBar {...{ progress: timeElapsed / 1000 / timer }} />
      {`${Math.round(timeElapsed / 100) / 10}`}s
      <br />
      Duration:{' '}
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
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default Timer;
