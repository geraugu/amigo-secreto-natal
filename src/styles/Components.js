import styled from 'styled-components';
import { fadeIn } from './GlobalStyles';

export const Container = styled.div`
  background: rgba(255, 255, 255, 0.95);
  width: 100%;
  max-width: 600px;
  border-radius: 24px;
  padding: 40px 30px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 0.6s ease-out;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 30px 20px;
    border-radius: 20px;
  }
`;

export const Title = styled.h1`
  color: #b21f1f;
  font-size: 2.2rem;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: 700;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

export const SubTitle = styled.h2`
  color: #444;
  font-size: 1.1rem;
  margin-bottom: 20px;
  font-weight: 600;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const Section = styled.div`
  background: #f8f9fa;
  padding: 25px;
  border-radius: 16px;
  margin-bottom: 25px;
  border: 1px solid #e9ecef;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const InputGroup = styled.div`
  margin-bottom: 20px;
  text-align: left;

  label {
    display: block;
    margin-bottom: 8px;
    color: #666;
    font-size: 0.9rem;
    font-weight: 600;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  border: 2px solid #eee;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s;
  box-sizing: border-box;
  outline: none;
  font-family: 'Poppins', sans-serif;
  background: white;

  &:focus {
    border-color: #b21f1f;
    box-shadow: 0 0 0 4px rgba(178, 31, 31, 0.1);
  }

  &::placeholder {
    color: #aaa;
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 14px 16px;
  border: 2px solid #eee;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s;
  box-sizing: border-box;
  outline: none;
  font-family: 'Poppins', sans-serif;
  background: white;
  resize: vertical;
  min-height: 100px;

  &:focus {
    border-color: #b21f1f;
    box-shadow: 0 0 0 4px rgba(178, 31, 31, 0.1);
  }

  &::placeholder {
    color: #aaa;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 16px;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s, filter 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: 'Poppins', sans-serif;
  background: ${props => props.secondary ? '#2d3436' : props.success ? '#27ae60' : props.danger ? '#e74c3c' : '#b21f1f'};
  color: white;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
    filter: brightness(1.1);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 14px;
    font-size: 0.95rem;
  }
`;

export const SmallButton = styled(Button)`
  width: auto;
  padding: 10px 20px;
  font-size: 0.9rem;
  min-width: 120px;
`;

export const ListContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 20px;
  max-height: 400px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #b21f1f;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #931919;
  }
`;

export const ListItem = styled.li`
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  color: #333;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateX(4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &:last-child {
    margin-bottom: 0;
  }

  .participant-name {
    display: flex;
    align-items: center;
    gap: 12px;
    font-weight: 600;
  }

  .icon {
    background: #ffeaa7;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    padding: 14px;
    font-size: 0.95rem;

    .icon {
      width: 32px;
      height: 32px;
      font-size: 1rem;
    }
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;

    button {
      width: 100%;
    }
  }
`;

export const SuccessBox = styled.div`
  background: #d4edda;
  border: 1px solid #c3e6cb;
  color: #155724;
  padding: 16px;
  border-radius: 12px;
  margin-top: 20px;
  text-align: center;
  font-weight: 600;
`;

export const InfoBox = styled.div`
  background: #d1ecf1;
  border: 1px solid #bee5eb;
  color: #0c5460;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 0.95rem;
`;

export const ErrorMessage = styled.div`
  background: #f8d7da;
  border: 1px solid #f5c6cb;
  color: #721c24;
  padding: 12px 16px;
  border-radius: 12px;
  margin-top: 10px;
  font-size: 0.9rem;
  text-align: center;
`;

export const LoadingSpinner = styled.div`
  border: 3px solid #f3f3f3;
  border-top: 3px solid #b21f1f;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 20px auto;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
