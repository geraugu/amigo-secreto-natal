import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { generateRules } from '../services/geminiService';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 30px;
`;

const Input = styled.input`
  padding: 15px;
  border: 2px solid #4ecdc4;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #ff6b6b;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 16px;
  color: #2c3e50;
  font-weight: 500;
`;

const HelpText = styled.span`
  font-size: 14px;
  color: #666;
  margin-top: 4px;
`;

const Button = styled.button`
  background-color: #ff6b6b;
  color: white;
  border: none;
  padding: 15px;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;

  &:hover {
    background-color: #4ecdc4;
    transform: translateY(-2px);
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
    transform: none;
  }
`;

const ParticipantesList = styled.div`
  margin-top: 30px;
  text-align: left;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
`;

const ConfigSection = styled.div`
  margin: 30px 0;
  padding: 25px;
  background-color: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);

  h2 {
    color: #2c3e50;
    margin-bottom: 20px;
    font-size: 1.5em;
  }
`;

const RulesBox = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  border-left: 4px solid #4ecdc4;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  line-height: 1.6;
`;

const MainTitle = styled.h1`
  color: #2c3e50;
  font-size: 2.5em;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
`;

const ParticipanteItem = styled.div`
  background-color: white;
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  display: flex;
  align-items: center;
  gap: 10px;

  &:before {
    content: "🎁";
    font-size: 1.2em;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 15px;
  border: 2px solid #4ecdc4;
  border-radius: 8px;
  font-size: 16px;
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #ff6b6b;
  }
`;

function Registro() {
  const [nome, setNome] = useState('');
  const [participantes, setParticipantes] = useState([]);
  const [titulo, setTitulo] = useState('Amigo Secreto de Natal');
  const [valorLimite, setValorLimite] = useState('');
  const [regrasPersonalizadas, setRegrasPersonalizadas] = useState('');
  const [carregandoRegras, setCarregandoRegras] = useState(false);
  const [informacoesAdicionais, setInformacoesAdicionais] = useState('');
  const navigate = useNavigate();

  const adicionarParticipante = (e) => {
    e.preventDefault();
    if (nome) {
      const novoParticipante = { nome };
      setParticipantes([...participantes, novoParticipante]);
      setNome('');
    }
  };

  const gerarRegrasPersonalizadas = async () => {
    if (!titulo || !valorLimite) return;
    setCarregandoRegras(true);
    try {
      const regras = await generateRules(titulo, valorLimite, informacoesAdicionais);
      setRegrasPersonalizadas(regras);
    } catch (error) {
      console.error('Erro ao gerar regras:', error);
    } finally {
      setCarregandoRegras(false);
    }
  };

  const realizarSorteio = () => {
    if (participantes.length >= 2) {
      const dadosSorteio = {
        titulo,
        valorLimite,
        regras: regrasPersonalizadas,
        participantes
      };
      localStorage.setItem('dadosSorteio', JSON.stringify(dadosSorteio));
      navigate('/sorteio');
    } else {
      alert('Adicione pelo menos 2 participantes');
    }
  };

  return (
    <div>
      <MainTitle>🎄 {titulo} 🎅</MainTitle>
      
      <ConfigSection>
        <h2>Configurações do Amigo Secreto</h2>
        <InputGroup>
          <Label htmlFor="titulo">Título do Evento</Label>
          <Input
            id="titulo"
            type="text"
            placeholder="Ex: Amigo Secreto da Família"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="valor">Valor Máximo do Presente</Label>
          <Input
            id="valor"
            type="number"
            placeholder="Digite 0 se não quiser estabelecer um limite de valor"
            value={valorLimite}
            onChange={(e) => setValorLimite(e.target.value)}
            min="0"
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="info">Informações Adicionais (opcional)</Label>
          <Input
            id="info"
            type="text"
            placeholder="Ex: Somente para crianças, Não pode bebidas alcoólicas..."
            value={informacoesAdicionais}
            onChange={(e) => setInformacoesAdicionais(e.target.value)}
          />
        </InputGroup>

        <Button 
          type="button" 
          onClick={gerarRegrasPersonalizadas}
          disabled={carregandoRegras}
        >
          {carregandoRegras ? '✨ Gerando regras...' : '✨ Gerar Regras Divertidas'}
        </Button>
        
        {regrasPersonalizadas && (
          <InputGroup>
            <Label htmlFor="regras">Regras Geradas (você pode editar)</Label>
            <TextArea
              id="regras"
              value={regrasPersonalizadas}
              onChange={(e) => setRegrasPersonalizadas(e.target.value)}
            />
          </InputGroup>
        )}
      </ConfigSection>

      <Form onSubmit={adicionarParticipante}>
        <InputGroup>
          <Label htmlFor="nome">Nome do Participante</Label>
          <Input 
            id="nome"
            type="text" 
            placeholder="Ex: João" 
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <HelpText>Digite o nome do participante</HelpText>
        </InputGroup>
        <Button type="submit">🎁 Adicionar Participante</Button>
      </Form>

      {participantes.length > 0 && (
        <ParticipantesList>
          <h2>Participantes Cadastrados:</h2>
          {participantes.map((p, index) => (
            <ParticipanteItem key={index}>
              {p.nome}
            </ParticipanteItem>
          ))}
        </ParticipantesList>
      )}

      {participantes.length >= 2 && (
        <Button onClick={realizarSorteio}>
          🎲 Realizar Sorteio
        </Button>
      )}
    </div>
  );
}

export default Registro;
