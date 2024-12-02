import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registro from './components/Registro';
import Sorteio from './components/Sorteio';
import ResultadoAmigo from './components/ResultadoAmigo';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Arial', sans-serif;
    background-color: #f0f4f8;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #ff6b6b, #4ecdc4);
  }
`;

const AppContainer = styled.div`
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  padding: 30px;
  width: 100%;
  max-width: 500px;
  text-align: center;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <AppContainer>
          <Routes>
            <Route path="/" element={<Registro />} />
            <Route path="/sorteio" element={<Sorteio />} />
            <Route path="/resultado/:hash" element={<ResultadoAmigo />} />
          </Routes>
        </AppContainer>
      </Router>
    </>
  );
}

export default App;
