import React, { useState } from 'react';

function FlightBooker() {
  const [flightType, setFlightType] = useState('oneWay');
  const [departure, setDeparture] = useState('27.03.2014');
  const [arrival, setArrival] = useState('27.03.2014');

  return (
    <div>
      <h2>Flight Booker</h2>
      <select name='flightType' onChange={(e) => setFlightType(e.target.value)}>
        <option value='oneWay'>one-way flight</option>
        <option value='return'>return flight</option>
      </select>
      <br />
      <input value={departure} />
      <br />
      <input value={arrival} disabled={flightType === 'oneWay' ? true : false} />
      <br />
      <button>Book</button>
    </div>
  );
}

export default FlightBooker;
