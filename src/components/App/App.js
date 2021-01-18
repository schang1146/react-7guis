import Counter from '../Counter/Counter';
import FlightBooker from '../FlightBooker/FlightBooker';
import TempConverter from '../TempConverter/TempConverter';
import './App.css';

function App() {
  return (
    <div className='App'>
      <h1>7Guis: A GUI Programming Benchmark</h1>
      <Counter />
      <FlightBooker />
      <TempConverter />
    </div>
  );
}

export default App;
