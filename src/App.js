import './App.css';
import { Route, Routes } from 'react-router-dom';
import Registration from './components/Registration';
import Login from './components/Login';
import HomePage from './components/HomePage';

function App() {
  return (
    <div className="App">
      {/* <Registration/>
      <Login/> */}
        <Routes>
          <Route path="/" element={<Registration/>} />
          <Route path="/Login" element={<Login/>} />
          <Route path="/HomePage" element={<HomePage/>} />
        </Routes>
    </div>
  );
}

export default App;
