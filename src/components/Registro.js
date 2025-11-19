import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateRules } from '../services/geminiService';
import {
  Container,
  Title,
  SubTitle,
  Section,
  InputGroup,
  Input,
  TextArea,
  Button,
  ListContainer,
  ListItem,
  InfoBox,
  LoadingSpinner
} from '../styles/Components';
import styled from 'styled-components';

const HelpText = styled.span`
  font-size: 0.85rem;
  color: #999;
  margin-top: 4px;
  display: block;
`;

const RemoveButton = styled.button`
  background: #e74c3c;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 600;

  &:hover {
    background: #c0392b;
    transform: scale(1.05);
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
    if (nome.trim()) {
      const novoParticipante = { nome: nome.trim() };
      setParticipantes([...participantes, novoParticipante]);
      setNome('');
    }
  };

  const removerParticipante = (index) => {
    setParticipantes(participantes.filter((_, i) => i !== index));
  };

  const gerarRegrasPersonalizadas = async () => {
    if (!titulo || valorLimite === '') {
      alert('Por favor, preencha o título e o valor limite antes de gerar as regras.');
      return;
    }
    setCarregandoRegras(true);
    try {
      const regras = await generateRules(titulo, valorLimite, informacoesAdicionais);
      setRegrasPersonalizadas(regras);
    } catch (error) {
      console.error('Erro ao gerar regras:', error);
      alert('Erro ao gerar regras. Tente novamente.');
    } finally {
      setCarregandoRegras(false);
    }
  };

  const realizarSorteio = () => {
    if (participantes.length < 2) {
      alert('Adicione pelo menos 2 participantes para realizar o sorteio.');
      return;
    }

    const dadosSorteio = {
      titulo,
      valorLimite,
      regras: regrasPersonalizadas,
      participantes
    };
    localStorage.setItem('dadosSorteio', JSON.stringify(dadosSorteio));
    navigate('/sorteio');
  };

  return (
    <Container>
      <Title>🎄 {titulo} 🎅</Title>
      <SubTitle>Configure seu amigo secreto de forma fácil e divertida!</SubTitle>

      <Section>
        <SubTitle>⚙️ Configurações do Evento</SubTitle>

        <InputGroup>
          <label htmlFor="titulo">Título do Evento</label>
          <Input
            id="titulo"
            type="text"
            placeholder="Ex: Amigo Secreto da Família"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </InputGroup>

        <InputGroup>
          <label htmlFor="valor">Valor Máximo do Presente (R$)</label>
          <Input
            id="valor"
            type="number"
            placeholder="Digite 0 para sem limite"
            value={valorLimite}
            onChange={(e) => setValorLimite(e.target.value)}
            min="0"
          />
          <HelpText>Digite 0 se não quiser estabelecer um limite de valor</HelpText>
        </InputGroup>

        <InputGroup>
          <label htmlFor="info">Informações Adicionais (opcional)</label>
          <Input
            id="info"
            type="text"
            placeholder="Ex: Somente para adultos, Evitar bebidas alcoólicas..."
            value={informacoesAdicionais}
            onChange={(e) => setInformacoesAdicionais(e.target.value)}
          />
          <HelpText>Adicione orientações especiais para o sorteio</HelpText>
        </InputGroup>

        <Button
          type="button"
          onClick={gerarRegrasPersonalizadas}
          disabled={carregandoRegras}
          secondary
        >
          {carregandoRegras ? '⏳ Gerando...' : '✨ Gerar Regras com IA'}
        </Button>

        {carregandoRegras && <LoadingSpinner />}

        {regrasPersonalizadas && (
          <InputGroup>
            <label htmlFor="regras">Regras Geradas (você pode editar)</label>
            <TextArea
              id="regras"
              value={regrasPersonalizadas}
              onChange={(e) => setRegrasPersonalizadas(e.target.value)}
              placeholder="As regras geradas aparecerão aqui..."
            />
          </InputGroup>
        )}
      </Section>

      <Section>
        <SubTitle>👥 Participantes</SubTitle>

        {participantes.length === 0 && (
          <InfoBox>
            Adicione pelo menos 2 participantes para realizar o sorteio
          </InfoBox>
        )}

        <form onSubmit={adicionarParticipante}>
          <InputGroup>
            <label htmlFor="nome">Nome do Participante</label>
            <Input
              id="nome"
              type="text"
              placeholder="Ex: João Silva"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </InputGroup>
          <Button type="submit">🎁 Adicionar Participante</Button>
        </form>

        {participantes.length > 0 && (
          <>
            <SubTitle style={{ marginTop: '30px', fontSize: '1rem' }}>
              {participantes.length} Participante{participantes.length !== 1 ? 's' : ''} Cadastrado{participantes.length !== 1 ? 's' : ''}
            </SubTitle>
            <ListContainer>
              {participantes.map((p, index) => (
                <ListItem key={index}>
                  <div className="participant-name">
                    <span className="icon">🎁</span>
                    {p.nome}
                  </div>
                  <RemoveButton onClick={() => removerParticipante(index)}>
                    🗑️ Remover
                  </RemoveButton>
                </ListItem>
              ))}
            </ListContainer>
          </>
        )}
      </Section>

      {participantes.length >= 2 && (
        <Button onClick={realizarSorteio} success>
          🎲 Realizar Sorteio Agora!
        </Button>
      )}
    </Container>
  );
}

export default Registro;
