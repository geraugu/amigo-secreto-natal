import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { salvarSorteio } from '../services/sorteioService';
import {
  Container,
  Title,
  SubTitle,
  Section,
  Button,
  SmallButton,
  ListContainer,
  ListItem,
  SuccessBox,
  LoadingSpinner
} from '../styles/Components';
import styled from 'styled-components';

const LinkText = styled.code`
  background-color: #f0f0f0;
  padding: 8px 12px;
  border-radius: 8px;
  word-break: break-all;
  display: block;
  margin: 12px 0;
  font-size: 0.85rem;
  color: #333;
  border: 1px solid #e0e0e0;
`;

const ParticipantBox = styled.div`
  background: #f8f9fa;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 25px;

  h3 {
    color: #b21f1f;
    margin-bottom: 15px;
    font-size: 1.2rem;
    text-align: center;
  }
`;

const ParticipantGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 12px;
  margin-top: 15px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }
`;

const ParticipantChip = styled.div`
  background: white;
  padding: 12px;
  border-radius: 8px;
  text-align: center;
  font-weight: 600;
  color: #333;
  border: 2px solid #e9ecef;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:before {
    content: "🎁";
    font-size: 1.2rem;
  }
`;

const RulesDisplay = styled.div`
  background: #fff3cd;
  border: 2px solid #ffc107;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 25px;

  h3 {
    color: #856404;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  p {
    color: #856404;
    line-height: 1.6;
    margin: 10px 0;
  }

  .value-info {
    background: white;
    padding: 12px;
    border-radius: 8px;
    margin: 15px 0;
    font-weight: 600;
  }
`;

function Sorteio() {
  const [participantes, setParticipantes] = useState([]);
  const [resultadoSorteio, setResultadoSorteio] = useState([]);
  const [sorteioRealizado, setSorteioRealizado] = useState(false);
  const [copiado, setCopiado] = useState({});
  const [salvando, setSalvando] = useState(false);
  const [dadosSorteio, setDadosSorteio] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const dadosArmazenados = JSON.parse(localStorage.getItem('dadosSorteio') || '{}');
    if (dadosArmazenados.participantes) {
      setParticipantes(dadosArmazenados.participantes);
      setDadosSorteio(dadosArmazenados);
    } else {
      navigate('/');
    }
  }, [navigate]);

  const realizarSorteioSecreto = async () => {
    setSalvando(true);
    try {
      const participantesEmbaralhados = [...participantes];
      for (let i = participantesEmbaralhados.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [participantesEmbaralhados[i], participantesEmbaralhados[j]] =
        [participantesEmbaralhados[j], participantesEmbaralhados[i]];
      }

      const resultado = participantesEmbaralhados.map((participante, index) => ({
        ...participante,
        amigoSecreto: participantesEmbaralhados[(index + 1) % participantesEmbaralhados.length],
        hash: uuidv4()
      }));

      await salvarSorteio({
        ...dadosSorteio,
        resultados: resultado
      });

      setResultadoSorteio(resultado);
      setSorteioRealizado(true);
    } catch (error) {
      alert('Erro ao realizar o sorteio. Por favor, tente novamente.');
      console.error(error);
    } finally {
      setSalvando(false);
    }
  };

  const copiarInformacoes = async (participante, index) => {
    const baseUrl = window.location.origin + '/amigo-secreto-natal/#';
    const link = `${baseUrl}/resultado/${participante.hash}`;

    const limparFormatacao = (texto) => {
      if (!texto) return '';
      return texto
        .replace(/^#{1,6}\s+/gm, '')
        .replace(/\*\*(.*?)\*\*/g, '*$1*')
        .replace(/__(.*?)__/g, '*$1*')
        .replace(/`(.*?)`/g, '$1')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
    };

    let textoCopiar = `🎄 *${dadosSorteio.titulo}* 🎅\n\nO amigo secreto do *${participante.nome}* é o ${link}\n\n`;

    if (dadosSorteio.regras) {
      textoCopiar += `📜 *Regras do Amigo Secreto:*\n`;
      textoCopiar += `💰 ${parseInt(dadosSorteio.valorLimite) === 0 ? 'Sem limite de valor para o presente' : `Valor máximo: R$ ${dadosSorteio.valorLimite}`}\n\n`;
      textoCopiar += limparFormatacao(dadosSorteio.regras);
    }

    try {
      await navigator.clipboard.writeText(textoCopiar);
      setCopiado(prev => ({ ...prev, [index]: true }));

      setTimeout(() => {
        setCopiado(prev => ({ ...prev, [index]: false }));
      }, 2000);
    } catch (err) {
      alert('Erro ao copiar. Tente selecionar e copiar manualmente.');
    }
  };

  if (sorteioRealizado) {
    const baseUrl = window.location.origin + '/amigo-secreto-natal/#';

    return (
      <Container>
        <Title>🎄 {dadosSorteio.titulo} 🎅</Title>
        <SuccessBox>
          ✅ Sorteio Realizado com Sucesso!
        </SuccessBox>

        {dadosSorteio.regras && (
          <RulesDisplay>
            <h3>📜 Regras do Amigo Secreto</h3>
            <div className="value-info">
              💰 {parseInt(dadosSorteio.valorLimite) === 0
                ? 'Sem limite de valor para o presente'
                : `Valor máximo: R$ ${dadosSorteio.valorLimite}`}
            </div>
            <p>{dadosSorteio.regras}</p>
          </RulesDisplay>
        )}

        <Section>
          <SubTitle>📧 Links para Compartilhar</SubTitle>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: '20px' }}>
            Envie o link individual para cada participante. Cada pessoa verá apenas seu próprio amigo secreto!
          </p>

          <ListContainer>
            {resultadoSorteio.map((participante, index) => (
              <ListItem key={index}>
                <div style={{ flex: 1 }}>
                  <div className="participant-name">
                    <span className="icon">🎁</span>
                    <strong>{participante.nome}</strong>
                  </div>
                  <LinkText>
                    {`${baseUrl}/resultado/${participante.hash}`}
                  </LinkText>
                </div>
                <SmallButton
                  onClick={() => copiarInformacoes(participante, index)}
                  disabled={copiado[index]}
                  success={copiado[index]}
                >
                  {copiado[index] ? '✓ Copiado!' : '📋 Copiar'}
                </SmallButton>
              </ListItem>
            ))}
          </ListContainer>
        </Section>

        <Button onClick={() => navigate('/')}>
          🏠 Voltar para o Início
        </Button>
      </Container>
    );
  }

  return (
    <Container>
      <Title>🎲 Preparando o Sorteio</Title>
      <SubTitle>Confirme os participantes antes de realizar o sorteio</SubTitle>

      <ParticipantBox>
        <h3>✅ Participantes Confirmados ({participantes.length})</h3>
        <ParticipantGrid>
          {participantes.map((p, index) => (
            <ParticipantChip key={index}>
              {p.nome}
            </ParticipantChip>
          ))}
        </ParticipantGrid>
      </ParticipantBox>

      {salvando && (
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <LoadingSpinner />
          <p style={{ color: '#666', marginTop: '10px' }}>Realizando o sorteio...</p>
        </div>
      )}

      <Button
        onClick={realizarSorteioSecreto}
        disabled={salvando}
        success
      >
        {salvando ? '⏳ Realizando Sorteio...' : '🎁 Realizar Sorteio Secreto!'}
      </Button>

      <Button onClick={() => navigate('/')} secondary>
        ← Voltar
      </Button>
    </Container>
  );
}

export default Sorteio;
