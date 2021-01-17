import { useState } from 'react';

function isNumeric(str) {
  if (typeof str !== 'string') {
    return false;
  }
  return !isNaN(str) && !isNaN(parseFloat(str));
}

function TempConverter() {
  const [celsius, setCelsius] = useState('0');
  const [fahrenheit, setFahrenheit] = useState('32');

  const handleTempChange = (e, unitChanged) => {
    if (isNumeric(e.target.value.slice(-1))) {
      if (unitChanged === 'C') {
        setCelsius(parseInt(e.target.value).toString()); // set `celsius` to user input
        setFahrenheit(Math.round(parseInt(e.target.value) * (9 / 5) + 32)); // calculate `fahrenheit` = `celsius` * (9 / 5) + 32
      } else if (unitChanged === 'F') {
        setFahrenheit(parseInt(e.target.value).toString()); // set `fahrenheit` to user input
        setCelsius(Math.round(((parseInt(e.target.value) - 32) * 5) / 9)); // calculate `celsius` = (`fahrenheit` - 32) * (5 / 9 )
      }
    }
  };

  return (
    <div>
      <h2>Temperature Converter</h2>
      <input value={celsius} onChange={(e) => handleTempChange(e, 'C')} /> Celsius =
      <input value={fahrenheit} onChange={(e) => handleTempChange(e, 'F')} /> Fahrenheit
    </div>
  );
}

export default TempConverter;
