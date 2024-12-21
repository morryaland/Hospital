import { Link, Outlet } from "react-router-dom";
import './App.css';

function AppHeader()
{
  return (
      <div className="App-header">
        <Link to="pacient">Регистрация пациентов</Link>
        <Link to="hospitalizacion">Госпитализация</Link>
        <Link to="event">Направление пациентов</Link>
        <Outlet />
      </div>);
}

export default AppHeader;
