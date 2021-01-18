import React, { useState } from 'react';

function Counter() {
  const [counter, setCounter] = useState(0);

  return (
    <div>
      <h2>Counter</h2>
      <input readOnly value={counter} />
      <button
        onClick={() => {
          setCounter(counter + 1);
        }}
      >
        Count
      </button>
    </div>
  );
}

export default Counter;
