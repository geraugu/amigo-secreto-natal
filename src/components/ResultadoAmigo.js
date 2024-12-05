import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { buscarResultadoPorHash } from '../services/sorteioService';

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

const RulesSection = styled.div`
  margin-top: 20px;
`;

const LoadingMessage = styled.div`
  color: #666;
  margin: 20px 0;
`;

function ResultadoAmigo() {
  const [amigoSecreto, setAmigoSecreto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [dadosSorteio, setDadosSorteio] = useState(null);
  const { hash } = useParams();

  useEffect(() => {
    const buscarAmigo = async () => {
      try {
        const resultado = await buscarResultadoPorHash(hash);
        if (resultado) {
          setAmigoSecreto(resultado.amigoSecreto);
          setDadosSorteio(resultado.dadosSorteio);
        } else {
          setErro('Resultado não encontrado');
        }
      } catch (error) {
        console.error('Erro ao buscar resultado:', error);
        setErro('Erro ao buscar o resultado');
      } finally {
        setLoading(false);
      }
    };

    buscarAmigo();
  }, [hash]);

  if (loading) {
    return (
      <ResultadoContainer>
        <LoadingMessage>Carregando seu amigo secreto...</LoadingMessage>
      </ResultadoContainer>
    );
  }

  if (erro || !amigoSecreto) {
    return (
      <ResultadoContainer>
        <h1>😕 Ops!</h1>
        <p>{erro || 'Link inválido ou sorteio não encontrado'}</p>
      </ResultadoContainer>
    );
  }

  return (
    <ResultadoContainer>
      <h1>🎄 {dadosSorteio?.titulo || 'Amigo Secreto'} 🎅</h1>
      <AmigoSecreto>
        <h2>Seu amigo secreto é:</h2>
        <p>{amigoSecreto.nome}</p>
      </AmigoSecreto>

      {dadosSorteio?.regras && (
        <RulesSection>
          <h3>📜 Regras do Amigo Secreto</h3>
          <p>💰 Valor máximo: R$ {dadosSorteio.valorLimite}</p>
          <p>{dadosSorteio.regras}</p>
        </RulesSection>
      )}
    </ResultadoContainer>
  );
}

export default ResultadoAmigo;
