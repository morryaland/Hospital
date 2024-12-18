import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import PacientForm from './PacientForm.js';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App-header">
        <Link to="pacient">Регистрация пациентов</Link>
        <Link to="hospitalizacion">Госпитализация</Link>
        <Link to="event">Направление пациентов</Link>
      </div>
      <Routes>
        <Route path="pacient" element={<PacientForm/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
