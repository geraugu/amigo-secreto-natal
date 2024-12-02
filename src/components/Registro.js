import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 10px;
  border: 2px solid #4ecdc4;
  border-radius: 8px;
  font-size: 16px;
`;

const Button = styled.button`
  background-color: #ff6b6b;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4ecdc4;
  }
`;

const ParticipantesList = styled.div`
  margin-top: 20px;
  text-align: left;
`;

function Registro() {
  const [nome, setNome] = useState('');
  const [participantes, setParticipantes] = useState([]);
  const navigate = useNavigate();

  const adicionarParticipante = (e) => {
    e.preventDefault();
    if (nome) {
      const novoParticipante = { nome };
      setParticipantes([...participantes, novoParticipante]);
      setNome('');
    }
  };

  const realizarSorteio = () => {
    if (participantes.length >= 2) {
      localStorage.setItem('participantes', JSON.stringify(participantes));
      navigate('/sorteio');
    } else {
      alert('Adicione pelo menos 2 participantes');
    }
  };

  return (
    <div>
      <h1>🎄 Amigo Secreto de Natal 🎅</h1>
      <Form onSubmit={adicionarParticipante}>
        <Input 
          type="text" 
          placeholder="Nome do Participante" 
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <Button type="submit">Adicionar Participante</Button>
      </Form>

      <ParticipantesList>
        <h2>Participantes Cadastrados:</h2>
        {participantes.map((p, index) => (
          <div key={index}>
            {p.nome}
          </div>
        ))}
      </ParticipantesList>

      {participantes.length >= 2 && (
        <Button onClick={realizarSorteio}>
          Realizar Sorteio 🎁
        </Button>
      )}
    </div>
  );
}

export default Registro;
