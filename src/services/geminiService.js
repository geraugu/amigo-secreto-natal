import { GoogleGenAI } from '@google/genai';

const genAI = new GoogleGenAI({
  apiKey: process.env.REACT_APP_GEMINI_API_KEY
});

export const generateRules = async (title, priceLimit, additionalInfo = '') => {
  try {
    const valorTexto = parseInt(priceLimit) === 0
      ? "sem limite de valor definido"
      : `valor limite de presente de R$ ${priceLimit}`;

    const infoAdicional = additionalInfo
      ? `\nConsiderações especiais: ${additionalInfo}`
      : '';

    const prompt = `Gere um texto divertido e engraçado em português para um amigo secreto com o título "${title}" e ${valorTexto}.${infoAdicional}

    IMPORTANTE: O texto será enviado pelo WhatsApp, então use APENAS a formatação do WhatsApp:
    - Use *texto* para negrito
    - Use _texto_ para itálico
    - NÃO use ## ou ### para títulos
    - NÃO use ** para negrito
    - NÃO use markdown

    O texto deve incluir algumas regras criativas e bem-humoradas sobre a troca de presentes, incorporando as considerações especiais se fornecidas.
    Mantenha o texto conciso, com no máximo 4 parágrafos curtos.`;

    const result = await genAI.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt
    });

    return result.text;
  } catch (error) {
    console.error('Erro ao gerar regras:', error);
    return 'Não foi possível gerar as regras personalizadas. Use as regras padrão.';
  }
};
