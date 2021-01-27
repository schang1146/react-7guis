function Cells() {
  const tableWidth = 3;
  const tableHeight = 10;

  let tableHeader = [<th>{'/'}</th>];
  for (let charCode = 65; charCode < 65 + tableWidth; charCode++) {
    tableHeader.push(<th>{String.fromCharCode(charCode)}</th>);
  }

  let tableContents = [];
  for (let row = 0; row < tableHeight; row++) {
    tableContents.push([]);
    tableContents[row].push(row);
    for (let col = 0; col < tableWidth; col++) {
      tableContents[row].push(<input />);
    }
  }

  return (
    <div>
      <h2>Cells</h2>
      <table>
        <tr>{tableHeader}</tr>
        {tableContents.map((row) => {
          return (
            <tr>
              {row.map((col) => {
                return <td>{col}</td>;
              })}
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default Cells;
