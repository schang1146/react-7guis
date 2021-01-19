import React, { useState } from 'react';

function Crud() {
  const [state, setState] = useState({
    names: [
      {
        forename: 'Hans',
        surname: 'Emil',
      },
      {
        forename: 'Max',
        surname: 'Mustermann',
      },
      {
        forename: 'Roman',
        surname: 'Tisch',
      },
    ],
  });
  const [prefixFilter, setPrefixFilter] = useState('');
  const [forename, setForename] = useState('');
  const [surname, setSurname] = useState('');
  const [selected, setSelected] = useState(null);

  const postName = (forename, surname) => {
    let newNames = JSON.parse(JSON.stringify(state.names));
    let newName = { forename: forename, surname: surname };
    newNames.push(newName);
    setState({ names: newNames });
  };

  const putName = (forename, surname, id) => {
    let newNames = JSON.parse(JSON.stringify(state.names));
    let newName = { forename: forename, surname: surname };
    newNames[id] = newName;
    setState({ names: newNames });
  };

  const deleteName = (id) => {
    let newNames = JSON.parse(JSON.stringify(state.names));
    newNames.splice(id, 1);
    setState({ names: newNames });
  };

  const handlerPostName = () => {
    if (forename !== '' && surname !== '') {
      postName(forename, surname);
      setForename('');
      setSurname('');
    } else {
      alert(`Enter a forename and a surname!`);
    }
  };

  const handlerPutName = () => {
    if (forename === '' && surname === '') {
      alert(`Enter a forename and/or a surname!`);
    } else if (selected !== null) {
      putName(forename === '' ? state.names[selected].forename : forename, surname === '' ? state.names[selected].surname : surname, selected);
      setForename('');
      setSurname('');
    } else {
      alert(`Select a name to update!`);
    }
  };

  const handlerDeleteName = () => {
    if (selected !== null) {
      deleteName(selected);
    } else {
      alert(`Select a name to delete!`);
    }
  };

  return (
    <div>
      <h2>CRUD</h2>
      Filter prefix: <input value={prefixFilter} onChange={(e) => setPrefixFilter(e.target.value)} />
      <br />
      <select size={state.names.length} onChange={(e) => setSelected(e.target.value)}>
        {state.names
          .filter((name) => {
            if (prefixFilter === '') {
              return true;
            } else {
              return prefixFilter.toLowerCase() === name.surname.slice(0, prefixFilter.length).toLowerCase();
            }
          })
          .map((name, idx) => {
            return (
              <option value={idx}>
                {name.surname}, {name.forename}
              </option>
            );
          })}
      </select>
      <br />
      Name:{' '}
      <input
        value={forename}
        onChange={(e) => {
          setForename(e.target.value);
        }}
      />
      <br />
      Surname: <input value={surname} onChange={(e) => setSurname(e.target.value)} />
      <br />
      <button onClick={handlerPostName}>Create</button>
      <button onClick={handlerPutName}>Update</button>
      <button onClick={handlerDeleteName}>Delete</button>
    </div>
  );
}

export default Crud;
