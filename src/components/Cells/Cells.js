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
  let tableBody = [];
  for (let rowId = 0; rowId < height; rowId++) {
    let row = [];
    row.push(<td>{rowId}</td>);
    for (let colId = 0; colId < width; colId++) {
      row.push(<Cell />);
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

function Cell() {
  return (
    <td>
      <input />
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
