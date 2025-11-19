# 🎄 Amigo Secreto de Natal

Uma aplicação web moderna para organizar sorteios de Amigo Secreto de forma fácil e divertida!

## 🎯 Funcionalidades

- **Personalização do Evento**
  - Defina um título personalizado para seu amigo secreto
  - Configure o valor máximo do presente (ou deixe sem limite)
  - Gere regras divertidas automaticamente usando IA
  - Interface moderna e intuitiva

- **Cadastro de Participantes**
  - Adicione participantes apenas com o nome
  - Interface simples e intuitiva
  - Mínimo de 2 participantes para realizar o sorteio

- **Sorteio Automático**
  - Sorteio aleatório e justo
  - Garante que ninguém tire a si mesmo
  - Gera links únicos para cada participante

- **Compartilhamento Seguro**
  - Links individuais e únicos para cada participante
  - Botão de cópia rápida para nome e link
  - Inclui regras e valor do presente no resultado
  - Acesso ao resultado de qualquer dispositivo

- **Armazenamento em Nuvem**
  - Dados salvos com segurança no Firebase
  - Resultados acessíveis a qualquer momento
  - Não depende do navegador ou dispositivo original

## 🚀 Como Usar

1. **Acesse a Aplicação**
   - Visite: [https://amigosecreto-2e997.web.app](https://amigosecreto-2e997.web.app)

2. **Configure seu Amigo Secreto**
   - Defina um título especial para o evento
   - Estabeleça um valor máximo para os presentes (opcional)
   - Gere regras divertidas com um clique

3. **Cadastre os Participantes**
   - Digite o nome de cada participante
   - Clique em "Adicionar Participante"
   - Repita para todos os participantes

4. **Realize o Sorteio**
   - Com todos cadastrados, clique em "Realizar Sorteio"
   - Aguarde o processamento
   - Os links serão gerados automaticamente

5. **Compartilhe os Links**
   - Use o botão "Copiar Informações" para cada participante
   - Envie o link individualmente para cada pessoa
   - Cada participante só verá seu próprio amigo secreto

## 🛠️ Configuração Local

1. Clone o repositório
   ```bash
   git clone https://github.com/geraugu/amigo-secreto-natal.git
   cd amigo-secreto-natal
   ```

2. Instale as dependências
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente
   - Copie o arquivo `.env.example` para `.env`
   - Preencha com suas credenciais:
     - Firebase config (apiKey, authDomain, etc.)
     - Google Gemini API Key

4. Execute o projeto
   ```bash
   npm start
   ```

5. Para fazer deploy no Firebase
   ```bash
   npm run build
   firebase deploy
   ```

## 🛠️ Tecnologias Utilizadas

- **React.js** - Framework JavaScript
- **Firebase** - Backend e Hosting
  - Firestore - Banco de dados NoSQL
  - Firebase Hosting - Hospedagem da aplicação
- **React Router** - Navegação entre páginas
- **Styled Components** - Estilização CSS-in-JS
- **Google Gemini AI** (gemini-2.5-flash) - Geração de regras com IA
- **UUID** - Geração de identificadores únicos

## 🔒 Privacidade e Segurança

- Apenas nomes são armazenados
- Links únicos e seguros
- Sem necessidade de login
- Dados protegidos no Firebase

## 🆕 Atualizações Recentes

### v1.1.0 (Nov 2025)
- ✨ **Migração para novo SDK da Google**: Atualizado de `@google/generative-ai` para `@google/genai` (v1.30.0)
- 🤖 **Modelo de IA atualizado**: Usando `gemini-2.5-flash` para melhor performance
- 💬 **Formatação para WhatsApp**: Texto gerado otimizado para compartilhamento no WhatsApp
- 🔧 **Correções**:
  - Corrigido problema de deploy no Firebase Hosting
  - Atualizadas regras de segurança do Firestore
  - Melhorada limpeza de formatação markdown no texto copiado

## 🤝 Como Contribuir

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autor

- [Geraldo Augusto de Morais Figueiredo](https://github.com/geraugu)

---

Feito com ❤️ para tornar os sorteios de Amigo Secreto mais divertidos!
