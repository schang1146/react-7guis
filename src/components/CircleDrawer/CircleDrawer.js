import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './CircleDrawer.module.css';

function ModalAdjustDiameter({ isModalVisible, circle = null, updateCircle }) {
  console.log({ isModalVisible, circle, updateCircle });
  return (
    <div className={`${styles.modal} ${isModalVisible ? '' : styles.hidden}`}>
      <p>{`Adjust diameter of circle at (${circle !== null ? circle.x : 0}, ${circle !== null ? circle.y : 0})`}</p>
      <input type='range' min='5' max='100' value={circle !== null ? circle.d : 0} onChange={(e) => updateCircle(e.target.value)} />
    </div>
  );
}

function CircleDrawer() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.addEventListener('click', (e) => {
      console.log('left click');
      e.preventDefault();
      const [x, y] = getMouseCoord(e);
      setUndoStack((h) => [...h, { x, y, d: 25 }]);
      setRedoStack([]);
      drawCircle(x, y, 25);
    });
  }, []);

  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const handlerIsMouseInCircle = useCallback(
    (e) => {
      const mouseX = e.offsetX;
      const mouseY = e.offsetY;
      let closestIdx = -1;
      let closestDist = -1;
      for (let idx in undoStack) {
        const { x: circleX, y: circleY, d: circleDiameter } = undoStack[idx];
        const currentDist = (circleX - mouseX) ** 2 + (circleY - mouseY) ** 2;
        if (currentDist <= (circleDiameter / 2) ** 2) {
          if (closestDist === -1 || closestDist > currentDist) {
            closestIdx = idx;
            closestDist = currentDist;
          }
        }
      }
      if (closestIdx !== -1) {
        const { x, y, d } = undoStack[closestIdx];
        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        fillCircle(x, y, d);
        for (let { x, y, d } of undoStack) {
          drawCircle(x, y, d);
        }
      } else {
        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        for (let { x, y, d } of undoStack) {
          drawCircle(x, y, d);
        }
      }
      return closestIdx;
    },
    [undoStack]
  );
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.addEventListener('mousemove', handlerIsMouseInCircle);

    return function cleanup() {
      canvas.removeEventListener('mousemove', handlerIsMouseInCircle);
    };
  }, [handlerIsMouseInCircle]);

  const [selectedCircleId, setSelectedCircleId] = useState(-1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handlerModal = useCallback(
    (e) => {
      e.preventDefault();
      const closestCircle = handlerIsMouseInCircle(e);
      if (isModalVisible) {
        setIsModalVisible(false);
        setSelectedCircleId(null);
      } else if (closestCircle !== -1) {
        if (!isModalVisible) {
          setIsModalVisible(true);
          setSelectedCircleId(closestCircle);
        }
      }
    },
    [isModalVisible, handlerIsMouseInCircle]
  );
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.addEventListener('contextmenu', handlerModal);

    return function cleanup() {
      canvas.removeEventListener('contextmenu', handlerModal);
    };
  }, [handlerModal]);
  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    for (let { x, y, d } of undoStack) {
      drawCircle(x, y, d);
    }
  });

  const drawCircle = (x, y, d) => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.arc(x, y, d / 2, 0, Math.PI * 2, true);
    ctx.stroke();
  };

  const fillCircle = (x, y, d) => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.arc(x, y, d / 2, 0, Math.PI * 2, true);
    ctx.fillStyle = 'gray';
    ctx.fill();
  };

  const updateCircle = (d) => {
    const newUndoStack = JSON.parse(JSON.stringify(undoStack));
    newUndoStack[selectedCircleId].d = d;
    setUndoStack(newUndoStack);
  };

  const getMouseCoord = (e) => {
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - canvasRect.left;
    const y = e.clientY - canvasRect.top;
    return [x, y];
  };

  const clear = () => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    setUndoStack([]);
  };

  const redo = () => {
    if (redoStack.length !== 0) {
      let newUndoStack = JSON.parse(JSON.stringify(undoStack));
      newUndoStack.push(redoStack[redoStack.length - 1]);
      setUndoStack(newUndoStack);

      let newRedoStack = JSON.parse(JSON.stringify(redoStack)).slice(0, redoStack.length - 1);
      setRedoStack(newRedoStack);

      const { x, y, d } = newUndoStack[newUndoStack.length - 1];
      drawCircle(x, y, d);
    }
  };

  const undo = () => {
    if (undoStack.length !== 0) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      let newUndoStack = JSON.parse(JSON.stringify(undoStack)).slice(0, undoStack.length - 1);
      setUndoStack(newUndoStack);

      let newRedoStack = JSON.parse(JSON.stringify(redoStack));
      newRedoStack.push(undoStack[undoStack.length - 1]);
      setRedoStack(newRedoStack);

      for (let { x, y, d } of newUndoStack) {
        drawCircle(x, y, d);
      }
    }
  };

  return (
    <div>
      <h2>Circle Drawer</h2>
      <button onClick={undo}>Undo</button>
      <button onClick={redo}>Redo</button>
      <button onClick={clear}>Clear</button>
      <button onClick={() => console.log(undoStack, redoStack)}>Debug</button>
      <br />
      <canvas ref={canvasRef} className={styles.canvas} />
      <ModalAdjustDiameter isModalVisible={isModalVisible} circle={selectedCircleId !== -1 ? undoStack[parseInt(selectedCircleId)] : null} updateCircle={updateCircle} />
    </div>
  );
}

export default CircleDrawer;
