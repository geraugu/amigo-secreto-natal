import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const ResultadoContainer = styled.div`
  background-color: #f0f4f8;
  border-radius: 15px;
  padding: 20px;
  text-align: center;
`;

const AmigoSecreto = styled.div`
  background-color: #4ecdc4;
  color: white;
  padding: 15px;
  border-radius: 10px;
  margin-top: 20px;
`;

function ResultadoAmigo() {
  const [amigoSecreto, setAmigoSecreto] = useState(null);
  const { hash } = useParams();

  useEffect(() => {
    const resultadoSorteio = JSON.parse(localStorage.getItem('resultadoSorteio') || '[]');
    const participanteEncontrado = resultadoSorteio.find(p => p.hash === hash);
    
    if (participanteEncontrado) {
      setAmigoSecreto(participanteEncontrado.amigoSecreto);
    }
  }, [hash]);

  if (!amigoSecreto) {
    return <div>Link inválido ou sorteio não realizado</div>;
  }

  return (
    <ResultadoContainer>
      <h1>🎄 Seu Amigo Secreto 🎅</h1>
      <AmigoSecreto>
        <h2>Seu amigo secreto é:</h2>
        <p>{amigoSecreto.nome}</p>
      </AmigoSecreto>
    </ResultadoContainer>
  );
}

export default ResultadoAmigo;
