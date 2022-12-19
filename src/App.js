import './App.css';
import { Route, Routes } from 'react-router-dom';
import Registration from './components/Registration';
import Login from './components/Login';
import HomePage from './components/HomePage';
import AdminHomePage from './components/AdminHomePage';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Registration/>} />
          <Route path="/Login" element={<Login/>} />
          <Route path="/HomePage" element={<HomePage/>} />
          <Route path="/AdminHomePage" element={<AdminHomePage/>} />
        </Routes>
    </div>
  );
}

export default App;
