import { createGlobalStyle, keyframes } from 'styled-components';

// Animação suave de entrada
export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d);
    min-height: 100vh;
    padding: 20px;
  }

  #root {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    min-height: calc(100vh - 40px);
    padding: 20px 0;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  button {
    font-family: 'Poppins', sans-serif;
  }

  input, textarea {
    font-family: 'Poppins', sans-serif;
  }
`;
