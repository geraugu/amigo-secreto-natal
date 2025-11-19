import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { salvarSorteio } from '../services/sorteioService';

const Button = styled.button`
  background-color: #ff6b6b;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 20px 0;

  &:hover {
    background-color: #4ecdc4;
  }
`;

const CopyButton = styled.button`
  background-color: #4ecdc4;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 8px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45b8b0;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: default;
  }
`;

const LinksList = styled.div`
  margin: 20px 0;
  text-align: left;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
`;

const LinkItem = styled.div`
  margin: 10px 0;
  padding: 15px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const LinkText = styled.code`
  background-color: #f0f0f0;
  padding: 4px 8px;
  border-radius: 4px;
  word-break: break-all;
  display: block;
  margin: 8px 0;
`;

const RulesBox = styled.div`
  margin: 20px 0;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
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
    }
  }, []);

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

      // Salvar no Firebase
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

    // Função para limpar markdown e converter para formatação do WhatsApp
    const limparFormatacao = (texto) => {
      if (!texto) return '';

      return texto
        // Remove ## (títulos)
        .replace(/^#{1,6}\s+/gm, '')
        // Converte **negrito** para *negrito* (WhatsApp)
        .replace(/\*\*(.*?)\*\*/g, '*$1*')
        // Converte __negrito__ para *negrito*
        .replace(/__(.*?)__/g, '*$1*')
        // Remove formatação de código `code`
        .replace(/`(.*?)`/g, '$1')
        // Remove links markdown [texto](url) deixando só o texto
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        // Limpa múltiplas quebras de linha
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
      <div>
        <h1>🎄 {dadosSorteio.titulo} 🎅</h1>
        <h2>Sorteio Realizado com Sucesso!</h2>
        
        {dadosSorteio.regras && (
          <RulesBox>
            <h3>📜 Regras do Amigo Secreto</h3>
            <p>💰 {parseInt(dadosSorteio.valorLimite) === 0 ? 'Sem limite de valor para o presente' : `Valor máximo: R$ ${dadosSorteio.valorLimite}`}</p>
            <p>{dadosSorteio.regras}</p>
          </RulesBox>
        )}
        
        <p>Aqui estão os links para cada participante:</p>
        
        <LinksList>
          {resultadoSorteio.map((participante, index) => (
            <LinkItem key={index}>
              <strong>{participante.nome}:</strong>
              <br />
              <LinkText>
                {`${baseUrl}/resultado/${participante.hash}`}
              </LinkText>
              <CopyButton 
                onClick={() => copiarInformacoes(participante, index)}
                disabled={copiado[index]}
              >
                {copiado[index] ? '✓ Copiado!' : 'Copiar Informações'}
              </CopyButton>
            </LinkItem>
          ))}
        </LinksList>

        <Button onClick={() => navigate('/')}>
          Voltar para o Início
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h1>🎄 Preparando o Sorteio 🎅</h1>
      <h2>Participantes Confirmados:</h2>
      {participantes.map((p, index) => (
        <div key={index}>{p.nome}</div>
      ))}

      <Button 
        onClick={realizarSorteioSecreto} 
        disabled={salvando}
      >
        {salvando ? 'Realizando Sorteio...' : 'Realizar Sorteio Secreto 🎁'}
      </Button>
    </div>
  );
}

export default Sorteio;
