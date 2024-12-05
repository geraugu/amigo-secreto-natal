import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

export const generateRules = async (title, priceLimit, additionalInfo = '') => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const valorTexto = parseInt(priceLimit) === 0 
      ? "sem limite de valor definido" 
      : `valor limite de presente de R$ ${priceLimit}`;

    const infoAdicional = additionalInfo 
      ? `\nConsiderações especiais: ${additionalInfo}` 
      : '';

    const prompt = `Gere um texto divertido e engraçado em português para um amigo secreto com o título "${title}" e ${valorTexto}.${infoAdicional}
    O texto deve incluir algumas regras criativas e bem-humoradas sobre a troca de presentes, incorporando as considerações especiais se fornecidas.
    Mantenha o texto conciso, com no máximo 4 parágrafos.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Erro ao gerar regras:', error);
    return 'Não foi possível gerar as regras personalizadas. Use as regras padrão.';
  }
};
