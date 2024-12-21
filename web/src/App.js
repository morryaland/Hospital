import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppHeader from './AppHeader';
import PacientForm from './PacientForm';
import PacientShow from './PacientShow';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppHeader />}>
          <Route path="pacient">
            <Route index element={<PacientForm />}/>
            <Route path="*" element={<PacientShow id={window.location.href.replace( /.*\//g, '')}/>}/>
          </Route>
          <Route path="*" element={<p>Error 404</p>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
