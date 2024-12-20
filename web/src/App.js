import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import PacientForm from './PacientForm.js';
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
        <Route path="/" element={null}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
