# ⚡ Meu Portfólio Dinâmico | Dynamic Portfolio

> **[PT-BR]** Portfólio pessoal e interativo desenvolvido do zero com HTML5, CSS3 editorial/brutalista, JavaScript Vanilla, consumo dinâmico da API do GitHub e envio de e-mails via SDK do EmailJS.  
> **[EN]** Personal interactive portfolio built from scratch featuring HTML5, editorial/brutalist CSS3, Vanilla JavaScript, dynamic GitHub API integration, and contact emails via EmailJS SDK.

---

## 🌐 Link do Repositório / Repository Link
👉 **GitHub**: [https://github.com/scandolaraprian-rps/meu_portofolio-scandolara](https://github.com/scandolaraprian-rps/meu_portofolio-scandolara)

---

## 🚀 Funcionalidades / Features

### 🇧🇷 Português
- **layout Editorial Minimalista / Brutalista**: Design marcante e responsivo, focado em tipografia refinada e hierarquia clara em dispositivos móveis e desktop.
- **Consumo Dinâmico da API do GitHub**: Requisição assíncrona (`fetch`) que carrega automaticamente os repositórios públicos atualizados do usuário `scandolaraprian-rps`.
- **Barra de Busca Interativa**: Permite buscar e visualizar repositórios públicos de qualquer usuário do GitHub em tempo real.
- **Formulário de Contato Funcional**: Envio direto de mensagens utilizando a integração com o SDK do **EmailJS** (`emailjs.sendForm`).
- **Feedback Visual & Tratamento de Erros**: Mensagens amigáveis para estados de carregamento (*loading*), lista vazia ou falha na requisição API.

### 🇺🇸 English
- **Editorial Minimalist / Brutalist Layout**: A clean, responsive design centered on strong typographic hierarchy across mobile and desktop devices.
- **Dynamic GitHub API Integration**: Asynchronous `fetch` call that automatically retrieves updated public repositories for `scandolaraprian-rps`.
- **Interactive Search Bar**: Real-time search feature to explore public repositories of any GitHub user.
- **Functional Contact Form**: Direct message delivery powered by the **EmailJS** browser SDK (`emailjs.sendForm`).
- **Visual Feedback & Error Handling**: Custom user notifications for loading states, empty repository lists, and API fallback handling.

---

## 🛠️ Tecnologias Utilizadas / Technologies Used

| Tecnologia / Tech | Descrição / Description |
| :--- | :--- |
| **HTML5** | Estruturação semântica e acessível do documento web. |
| **CSS3** | Estilização customizada com CSS Variables, Grid, Flexbox e animações sutis. |
| **JavaScript (ES6+)** | Lógica de interação com o DOM, chamadas assíncronas (`async/await`) e gerenciamento de formulário. |
| **GitHub REST API** | API pública utilizada para obter projetos e dados atualizados dos repositórios. |
| **EmailJS SDK** | Serviço *client-side* para envio de e-mails diretamente do navegador sem necessidade de backend próprio. |
| **Google Fonts** | Tipografias selecionadas (*Inter*, *Playfair Display* e *JetBrains Mono*). |

---

## 💻 Como Visualizar e Rodar Localmente / How to Run Locally

### Pré-requisitos / Prerequisites
Apenas um navegador web moderno (Google Chrome, Firefox, Edge, Safari) e um servidor local simples (ou a extensão Live Server no VS Code).

### Passos / Steps

1. **Clonar o repositório / Clone the repository:**
   ```bash
   git clone https://github.com/scandolaraprian-rps/meu_portofolio-scandolara.git
   ```

2. **Acessar a pasta do projeto / Enter the directory:**
   ```bash
   cd meu_portofolio-scandolara
   ```

3. **Executar localmente / Run locally:**
   - **Opção A**: Abra o arquivo `index.html` diretamente no seu navegador.
   - **Opção B (Recomendada)**: Utilize a extensão **Live Server** do VS Code ou execute um servidor HTTP simples em Python/Node:
     ```bash
     # Usando Python 3
     python -m http.server 3000
     ```
     Acesse `http://localhost:3000` no seu navegador.

---

## ⚙️ Configuração das Chaves do EmailJS (Opcional) / EmailJS Setup (Optional)

Para conectar o seu próprio formulário de e-mail no arquivo `app.js`:

1. Crie uma conta gratuita no site oficial do [EmailJS](https://www.emailjs.com/).
2. Crie um *Email Service* e um *Email Template*.
3. Atualize as variáveis no topo do arquivo `app.js`:
   ```javascript
   const EMAILJS_PUBLIC_KEY = 'SUA_PUBLIC_KEY';
   const EMAILJS_SERVICE_ID = 'SEU_SERVICE_ID';
   const EMAILJS_TEMPLATE_ID = 'SEU_TEMPLATE_ID';
   ```

---

## 📫 Contato / Contact

Sinta-se à vontade para entrar em contato, discutir oportunidades ou explorar conexões profissionais!

- **Email**: [scandolaraprian@gmail.com](mailto:scandolaraprian@gmail.com)
- **GitHub**: [github.com/scandolaraprian-rps](https://github.com/scandolaraprian-rps)

---

Link para demonstração: https://portofoliorps.netlify.app/

<p align="center">
  <i>Desenvolvido com 💻 e foco em código limpo por <b>Rian P.S. (scandolaraprian-rps)</b>.</i>
</p>
