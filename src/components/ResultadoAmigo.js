import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { buscarResultadoPorHash } from '../services/sorteioService';
import {
  Container,
  Title,
  SubTitle,
  Section,
  LoadingSpinner,
  InfoBox
} from '../styles/Components';
import styled from 'styled-components';

const SecretBox = styled.div`
  background: linear-gradient(135deg, #b21f1f, #e74c3c);
  color: white;
  padding: 30px;
  border-radius: 16px;
  margin: 25px 0;
  text-align: center;
  box-shadow: 0 10px 30px rgba(178, 31, 31, 0.3);
  animation: revealAnimation 0.6s ease-out;

  @keyframes revealAnimation {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  h2 {
    font-size: 1.3rem;
    margin-bottom: 20px;
    font-weight: 600;
  }

  .secret-name {
    font-size: 2.5rem;
    font-weight: 700;
    margin: 20px 0;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }

  @media (max-width: 768px) {
    padding: 25px 20px;

    .secret-name {
      font-size: 2rem;
    }
  }
`;

const RulesSection = styled(Section)`
  background: #fff3cd;
  border: 2px solid #ffc107;

  h3 {
    color: #856404;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: center;
  }

  p {
    color: #856404;
    line-height: 1.6;
    margin: 10px 0;
    text-align: left;
  }

  .value-info {
    background: white;
    padding: 12px;
    border-radius: 8px;
    margin: 15px 0;
    font-weight: 600;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
`;

const ErrorBox = styled.div`
  background: #f8d7da;
  border: 2px solid #f5c6cb;
  color: #721c24;
  padding: 30px;
  border-radius: 16px;
  text-align: center;

  h2 {
    font-size: 3rem;
    margin-bottom: 15px;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.6;
  }
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
      <Container>
        <Title>🎄 Amigo Secreto 🎅</Title>
        <SubTitle>Carregando seu amigo secreto...</SubTitle>
        <LoadingSpinner />
      </Container>
    );
  }

  if (erro || !amigoSecreto) {
    return (
      <Container>
        <ErrorBox>
          <h2>😕</h2>
          <p><strong>Ops!</strong></p>
          <p>{erro || 'Link inválido ou sorteio não encontrado'}</p>
          <p style={{ marginTop: '20px', fontSize: '0.95rem' }}>
            Verifique se o link está correto ou entre em contato com quem organizou o sorteio.
          </p>
        </ErrorBox>
      </Container>
    );
  }

  return (
    <Container>
      <Title>🎄 {dadosSorteio?.titulo || 'Amigo Secreto'} 🎅</Title>

      <SecretBox>
        <h2>🎁 Seu amigo secreto é:</h2>
        <div className="secret-name">
          {amigoSecreto}
        </div>
        <p style={{ fontSize: '0.95rem', marginTop: '15px', opacity: 0.9 }}>
          Guarde esse segredo! 🤫
        </p>
      </SecretBox>

      {dadosSorteio?.regras && (
        <RulesSection>
          <h3>📜 Regras do Amigo Secreto</h3>

          <div className="value-info">
            💰 {parseInt(dadosSorteio.valorLimite) === 0
              ? 'Sem limite de valor para o presente'
              : `Valor máximo: R$ ${dadosSorteio.valorLimite}`}
          </div>

          <p>{dadosSorteio.regras}</p>
        </RulesSection>
      )}

      <InfoBox>
        💡 <strong>Dica:</strong> Salve este link para consultar depois!
      </InfoBox>
    </Container>
  );
}

export default ResultadoAmigo;
