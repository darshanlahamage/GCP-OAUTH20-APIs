import './App.css';
import { Routes, Route } from 'react-router-dom';
import Signup from './screens/Signup';
import MainScreen from './screens/MainScreen';

function App() {

  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="mainscreen" element={<MainScreen />} />
    </Routes>
  </div>
  );
}

export default App;
