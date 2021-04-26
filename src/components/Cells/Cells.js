import { useEffect, useState } from 'react';
import _ from 'lodash';
import { evaluate } from 'mathjs';

function TableHeader({ width }) {
  let header = [<th key='top-left'>{/* Empty for top left corner */}</th>];
  for (let charCode = 65; charCode < 65 + width; charCode++) {
    header.push(<th key={String.fromCharCode(charCode)}>{String.fromCharCode(charCode)}</th>);
  }
  return (
    <thead>
      <tr>{header}</tr>
    </thead>
  );
}

function TableBody({ width, height }) {
  const [active, setActive] = useState(null);

  const initState = () => {
    let table = [];
    for (let i = 0; i < height; i++) {
      let row = [];
      for (let j = 0; j < width; j++) {
        row.push('');
      }
      table.push(row);
    }
    return table;
  };

  // const [state, setState] = useState(initState());
  let state = initState();
  const setState = (id, value) => {
    let [rowId, colId] = id.split(',');
    state[parseInt(rowId)][parseInt(colId)] = value;
  };
  const getState = (id) => {
    let [rowId, colId] = id.split(',');
    return state[parseInt(rowId)][parseInt(colId)];
  };

  let tableBody = [];
  for (let rowId = 0; rowId < height; rowId++) {
    let row = [];
    row.push(<td>{rowId}</td>);
    for (let colId = 0; colId < width; colId++) {
      row.push(<Cell id={`${rowId},${colId}`} isActive={active === `${rowId},${colId}` ? true : false} setActive={setActive} setState={setState} getState={getState} />);
    }
    tableBody.push(row);
  }
  return (
    <tbody>
      {tableBody.map((row) => {
        return <tr>{row}</tr>;
      })}
    </tbody>
  );
}

function Cell({ id, isActive, setActive, setState, getState }) {
  const [value, setValue] = useState('');

  const handlerTextChange = (e) => {
    setValue(e.target.value);
  };

  const parseCell = (data, seenIds = new Set()) => {
    if (seenIds.has(id)) {
      return '#REF!';
    }
    if (data[0] === '=') {
      let output = '';
      let cp = 1;
      while (cp < data.length) {
        if (data[cp].match(/[a-zA-Z]/)) {
          let colRef = data[cp].charCodeAt(0) - 65;
          let rowRef = '';
          if (cp + 1 < data.length && data[cp + 1].match(/[0-9]/)) {
            rowRef += data[cp + 1];
            cp++;
          }
          if (cp + 1 < data.length && data[cp + 1].match(/[0-9]/)) {
            rowRef += data[cp + 1];
            cp++;
          }
          if (rowRef === '') {
            return '#ERROR!';
          } else {
            seenIds.add(id);
            let parsedCell = parseCell(getState(`${rowRef},${colRef}`));
            if (parsedCell === '#REF!') {
              return '#REF!';
            } else {
              console.log(parsedCell);
              output += parsedCell;
            }
          }
        } else if (data[cp].match(/[0-9-+/*()]/)) {
          output += data[cp];
        }
        cp++;
      }
      setState(output);
      return evaluate(output);
    } else {
      return data;
    }
  };

  return (
    <td>
      <input
        value={isActive ? value : parseCell(value)}
        onChange={handlerTextChange}
        onFocus={() => {
          setActive(id);
        }}
        onBlur={() => {
          setActive(null);
        }}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            e.target.blur();
          }
        }}
      />
    </td>
  );
}

function Cells() {
  const [tableWidth, setTableWidth] = useState(3);
  const [tableHeight, setTableHeight] = useState(2);

  return (
    <div>
      <h2>Cells</h2>
      <table style={{ margin: '0 auto' }}>
        <TableHeader width={tableWidth} />
        <TableBody width={tableWidth} height={tableHeight} />
      </table>
    </div>
  );
}

export default Cells;
