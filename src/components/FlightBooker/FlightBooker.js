import React, { useState } from 'react';
import styles from './FlightBooker.module.css';

function isDatesSequential(before, after) {
  const beforeList = before.split('.');
  const afterList = after.split('.');
  for (let i = beforeList.length - 1; i > 0; i--) {
    if (parseInt(beforeList[i]) < parseInt(afterList[i])) {
      return true;
    } else if (parseInt(beforeList[i]) > parseInt(afterList[i])) {
      return false;
    }
  }
  return true;
}

function isNumeric(str) {
  if (typeof str !== 'string') {
    return false;
  }
  return !isNaN(str) && !isNaN(parseFloat(str));
}

function isValidDate(dateString) {
  const [day, month, year] = dateString.split('.');
  if (!isNumeric(month) || month < 1 || month > 12) {
    return false;
  }
  if (!isNumeric(day) || day < 1 || day > daysInMonth(month, year)) {
    return false;
  }
  if (!isNumeric(year) || year < 1) {
    return false;
  }
  return true;
}

function daysInMonth(month, year) {
  if (typeof month !== 'string' || !isNumeric(month)) {
    return -1;
  }
  if (typeof year !== 'string' || !isNumeric(year)) {
    return -1;
  }
  switch (parseInt(month)) {
    case 2:
      if (parseInt(year) % 400 === 0) {
        return 29;
      } else if (parseInt(year) % 100 === 0) {
        return 28;
      } else if (parseInt(year) % 4 === 0) {
        return 29;
      } else {
        return 28;
      }
    case 4:
    case 6:
    case 9:
    case 11:
      return 30;
    default:
      return 31;
  }
}

function FlightBooker() {
  const [flightType, setFlightType] = useState('oneWay');
  const [departure, setDeparture] = useState('27.03.2014');
  const [arrival, setArrival] = useState('27.03.2014');

  const handlerBookFlight = () => {
    if (flightType === 'oneWay') {
      alert(`You have booked a one-way flight on ${departure}.`);
    } else if (flightType === 'return') {
      alert(`You have booked a two-way flight leaving on ${departure} and returning on ${arrival}.`);
    }
  };

  const isValidDeparture = (departure) => {
    return isValidDate(departure);
  };

  const isValidArrival = (arrival, departure) => {
    if (flightType === 'oneWay') {
      return true;
    }
    return isValidDate(arrival) && isDatesSequential(departure, arrival);
  };

  return (
    <div>
      <h2>Flight Booker</h2>
      <select name='flightType' onChange={(e) => setFlightType(e.target.value)}>
        <option value='oneWay'>one-way flight</option>
        <option value='return'>return flight</option>
      </select>
      <br />
      <input value={departure} className={`${isValidDeparture(departure) ? '' : styles.invalid}`} onChange={(e) => setDeparture(e.target.value)} />
      <br />
      <input value={arrival} className={`${isValidArrival(arrival, departure) ? '' : styles.invalid}`} onChange={(e) => setArrival(e.target.value)} disabled={flightType === 'oneWay' ? true : false} />
      <br />
      <button onClick={handlerBookFlight} disabled={!isValidDate(departure, 'departure') || !isValidDate(arrival, 'arrival', departure) ? true : false}>
        Book
      </button>
    </div>
  );
}

export default FlightBooker;
