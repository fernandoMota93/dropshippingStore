# Dropshipping Store

Um projeto **Vue.js** e **Firebase** responsivo para gerenciamento de produtos em uma loja sem estoque.

## 📖 Introdução

Este projeto foi desenvolvido para simplificar a criação e gestão de uma loja de dropshipping. Ele utiliza **Vue.js** via CDN, o que elimina a necessidade de configurações complexas e permite maior facilidade de hospedagem e redução de custos com servidores. A escolha pelo Firebase como backend proporciona escalabilidade, segurança e integração com serviços como autenticação e banco de dados em tempo real.

**Vantagens de usar a CDN para Vue.js:**
- **Menor custo de hospedagem:** O uso da CDN reduz o consumo de recursos no servidor.
- **Carregamento rápido:** Recursos distribuídos globalmente pela CDN.
- **Configuração simples:** Ideal para projetos rápidos e pequenos, sem necessidade de gerenciadores de pacotes como npm.

---

## 🚀 Funcionalidades
- Gerenciamento de produtos em uma loja de dropshipping.
- Autenticação segura por email e senha usando **Firebase Authentication**.
- Banco de dados não relacional para armazenar produtos, usuários e configurações utilizando **Firestore**.
- Navegação com **Vue Router**.
- Layout responsivo para desktop e dispositivos móveis.

---

## 🔧 Configuração do Firebase

1. **Crie um projeto no Firebase**
   - Acesse o [Firebase Console](https://console.firebase.google.com/).
   - Clique em "Adicionar projeto" e siga as instruções.

2. **Habilite os serviços necessários**
   - **Authentication**:
     - Vá em "Authentication" > "Métodos de Login".
     - Ative o método de "Email/Senha".
   - **Firestore**:
     - Vá em "Firestore Database".
     - Clique em "Criar Banco de Dados" e escolha o modo de produção ou teste (para desenvolvimento, escolha teste).
   - **Configuração da Web**:
     - Clique no ícone de configuração "Adicionar app" e selecione "Web".
     - Copie as configurações geradas para o app.

3. **Configuração do Projeto Vue.js**
   - Substitua o conteúdo do arquivo `firebaseConfig.js` pelo seguinte:
     ```javascript
     const firebaseConfig = {
       apiKey: "SUA_API_KEY",
       authDomain: "SEU_AUTH_DOMAIN",
       projectId: "SEU_PROJECT_ID",
       storageBucket: "SEU_STORAGE_BUCKET",
       messagingSenderId: "SEU_MESSAGING_SENDER_ID",
       appId: "SEU_APP_ID"
     };

     // Inicialização do Firebase
     firebase.initializeApp(firebaseConfig);
     const auth = firebase.auth();
     const db = firebase.firestore();

     export { auth, db };
     ```

---

## 🖥️ Uso Local

1. **Clonar o Repositório**
   ```bash
   git clone https://github.com/seu-usuario/dropshipping-store.git
   cd dropshipping-store
