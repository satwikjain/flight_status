import './App.css';
import FlightStatus from './components/FlightStatus';
import Notification from './components/Notification';

function App() {
  return (
    <>
    <h1>Flight Status and Notifications</h1>
      <FlightStatus />
      <Notification />
    </>
  );
}

export default App;
