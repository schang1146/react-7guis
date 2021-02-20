import Counter from '../Counter/Counter';
import TempConverter from '../TempConverter/TempConverter';
import FlightBooker from '../FlightBooker/FlightBooker';
import Timer from '../Timer/Timer';
import Crud from '../Crud/Crud';
import CircleDrawer from '../CircleDrawer/CircleDrawer';
import Cells from '../Cells/Cells';
import './App.css';

function App() {
  return (
    <div className='App'>
      <h1>7Guis: A GUI Programming Benchmark</h1>
      <Counter />
      <TempConverter />
      <FlightBooker />
      <Timer />
      <Crud />
      <CircleDrawer />
      <Cells />
    </div>
  );
}

export default App;
