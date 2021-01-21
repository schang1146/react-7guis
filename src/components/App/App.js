import Counter from '../Counter/Counter';
import TempConverter from '../TempConverter/TempConverter';
import FlightBooker from '../FlightBooker/FlightBooker';
import Timer from '../Timer/Timer';
import CircleDrawer from '../CircleDrawer/CircleDrawer';
import './App.css';

function App() {
  return (
    <div className='App'>
      <h1>7Guis: A GUI Programming Benchmark</h1>
      <Counter />
      <TempConverter />
      <FlightBooker />
      <Timer />
      <CircleDrawer />
    </div>
  );
}

export default App;
