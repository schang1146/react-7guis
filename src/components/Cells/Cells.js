import { useEffect, useState } from 'react';
import _ from 'lodash';

function TableHeader({ width }) {
  let header = [<th>{/* Empty for top left corner */}</th>];
  for (let charCode = 65; charCode < 65 + width; charCode++) {
    header.push(<th key={String.fromCharCode(charCode)}>{String.fromCharCode(charCode)}</th>);
  }
  return <tr>{header}</tr>;
}

function Cells() {
  const [activeElement, setActiveElement] = useState(null);
  const [tableWidth, setTableWidth] = useState(3);
  const [tableHeight, setTableHeight] = useState(10);

  const initTable = () => {
    let table = [];
    for (let i = 0; i < tableHeight; i++) {
      let row = [];
      for (let j = 0; j < tableWidth; j++) {
        row.push('');
      }
      table.push(row);
    }
    return table;
  };

  const [tableState, setTableState] = useState(initTable());

  const handleTextChange = (e) => {
    const [row, col] = e.target.id.split(',');
    let tableStateCopy = _.cloneDeep(tableState);
    tableStateCopy[parseInt(row)][parseInt(col)] = e.target.value;
    setTableState(tableStateCopy);
  };

  const parseCell = (data) => {
    if (data[0] === '=') {
      return '';
    } else {
      return data;
    }
  };

  const setCell = (e) => {
    setActiveElement(null);
    console.log(e.target.value);
  };

  return (
    <div>
      <h2>Cells</h2>
      <table style={{ margin: '0 auto' }}>
        <thead>
          <TableHeader width={tableWidth} />
        </thead>
        <tbody>
          {tableState.map((row, rowId) => {
            return (
              <tr>
                <td>{rowId}</td>
                {row.map((data, colId) => {
                  return (
                    <td key={`${rowId},${colId}`}>
                      <input
                        id={`${rowId},${colId}`}
                        value={activeElement === document.activeElement ? data : parseCell(data)}
                        onChange={(e) => handleTextChange(e)}
                        onBlur={(e) => setCell(e)}
                        onFocus={(e) => {
                          setActiveElement(e.target);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.target.blur();
                          }
                        }}
                      />
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Cells;
