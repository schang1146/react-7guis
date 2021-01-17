import React, { useState } from 'react';

function FlightBooker() {
  const [flightType, setFlightType] = useState('oneWay');
  const [departure, setDeparture] = useState('27.03.2014');
  const [arrival, setArrival] = useState('27.03.2014');

  const handleBookFlight = () => {
    if (flightType === 'oneWay') {
      alert(`You have booked a one-way flight on ${departure}.`);
    } else if (flightType === 'return') {
      alert(`You have booked a two-way flight leaving on ${departure} and returning on ${arrival}.`);
    }
  };

  return (
    <div>
      <h2>Flight Booker</h2>
      <select name='flightType' onChange={(e) => setFlightType(e.target.value)}>
        <option value='oneWay'>one-way flight</option>
        <option value='return'>return flight</option>
      </select>
      <br />
      <input value={departure} onChange={(e) => setDeparture(e.target.value)} />
      <br />
      <input value={arrival} onChange={(e) => setArrival(e.target.value)} disabled={flightType === 'oneWay' ? true : false} />
      <br />
      <button onClick={handleBookFlight}>Book</button>
    </div>
  );
}

export default FlightBooker;
