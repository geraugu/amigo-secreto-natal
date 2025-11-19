import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Registro from './components/Registro';
import Sorteio from './components/Sorteio';
import ResultadoAmigo from './components/ResultadoAmigo';
import { GlobalStyle } from './styles/GlobalStyles';

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<Registro />} />
          <Route path="/sorteio" element={<Sorteio />} />
          <Route path="/resultado/:hash" element={<ResultadoAmigo />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
