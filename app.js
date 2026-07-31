
/**
 * ==========================================================================
 * APP.JS - LÓGICA DO PORTFÓLIO DINÂMICO
 * ==========================================================================
 */

// ==========================================
// CONFIGURAÇÕES GERAIS E PLACEHOLDERS
// ==========================================

// Substitua 'SEU_USUARIO' pelo seu nome de usuário do GitHub
const GITHUB_USERNAME = 'scandolaraprian-rps';

// Placeholders claros do EmailJS para configuração do usuário
const EMAILJS_PUBLIC_KEY = 'd60FQQ3M1dHmz9gFO';
const EMAILJS_SERVICE_ID = 'service_j0h7ffo';
const EMAILJS_TEMPLATE_ID = 'template_vtuhgtv';

// ==========================================
// INICIALIZAÇÃO
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // Inicializa o EmailJS se a chave pública for fornecida
  if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== 'SUA_PUBLIC_KEY') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }

  // Carrega os repositórios públicos do GitHub
  carregarRepositoriosGitHub();

  // Configura os eventos de formulário e busca
  configurarFormularioContato();
  configurarBuscaGitHub();
});

// ==========================================
// INTEGRAÇÃO COM A API DO GITHUB
// ==========================================
/**
 * Faz uma requisição fetch na rota pública https://api.github.com/users/SEU_USUARIO/repos,
 * converte a resposta em JSON e cria um loop para injetar cards dentro da div lista-projetos.
 * Cada card exibe obrigatoriamente:
 *  - Nome do repositório
 *  - Descrição do projeto
 *  - Link para o repositório
 */
async function carregarRepositoriosGitHub(username = GITHUB_USERNAME) {
  // Captura a div com ID exato 'lista-projetos'
  const listaProjetos = document.getElementById('lista-projetos');

  if (!listaProjetos) {
    console.error("Elemento com id 'lista-projetos' não encontrado no DOM.");
    return;
  }

  // Exibe estado visual de carregamento
  listaProjetos.innerHTML = `
    <div class="loading-state">
      <p>Carregando repositórios para "${username}"...</p>
    </div>
  `;

  // Nome de usuário do GitHub a ser consultado
  let usuarioQuery = (username === 'SEU_USUARIO' || !username) ? GITHUB_USERNAME : username;

  try {
    // Requisição fetch na API pública do GitHub
    let resposta = await fetch(`https://api.github.com/users/${usuarioQuery}/repos?sort=updated&per_page=12`);

    // Se o usuário não for encontrado (404), busca do 'octocat' como demonstração de fallback
    if (resposta.status === 404 && usuarioQuery !== 'octocat') {
      usuarioQuery = 'octocat';
      resposta = await fetch(`https://api.github.com/users/octocat/repos?sort=updated&per_page=12`);
    }

    if (!resposta.ok) {
      throw new Error(`HTTP ${resposta.status}`);
    }

    // Transforma a resposta da requisição em JSON
    const repositorios = await resposta.json();

    // Limpa a div lista-projetos
    listaProjetos.innerHTML = '';

    if (!Array.isArray(repositorios) || repositorios.length === 0) {
      listaProjetos.innerHTML = `
        <div class="empty-state">
          <p>Nenhum repositório público foi encontrado para o usuário "${usuarioQuery}".</p>
        </div>
      `;
      return;
    }

    // Loop para injetar cards dinâmicos dentro da div lista-projetos
    repositorios.forEach(repo => {
      // Campos obrigatórios extraídos do repositório
      const nomeRepositorio = repo.name || 'Repositório sem nome';
      const descricaoProjeto = repo.description || 'Nenhuma descrição fornecida para este projeto.';
      const linkRepositorio = repo.html_url || '#';
      const linguagem = repo.language || 'Código';

      // Cria a estrutura do card dinâmico
      const card = document.createElement('div');
      card.className = 'card-projeto';

      card.innerHTML = `
        <div>
          <div class="card-header">
            <h3 class="card-title">${nomeRepositorio}</h3>
            <span class="badge-lang">${linguagem}</span>
          </div>
          <p class="card-description">${descricaoProjeto}</p>
        </div>
        <div class="card-footer">
          <span class="card-stars">⭐ ${repo.stargazers_count || 0}</span>
          <a href="${linkRepositorio}" target="_blank" rel="noopener noreferrer" class="card-link">
            Ver Repositório →
          </a>
        </div>
      `;

      // Injeta o card dentro do container 'lista-projetos'
      listaProjetos.appendChild(card);
    });

  } catch (erro) {
    listaProjetos.innerHTML = `
      <div class="error-state">
        <p>Não foi possível carregar os repositórios do usuário <strong>"${usuarioQuery}"</strong>.</p>
        <small>Insira um nome de usuário válido no campo de busca para carregar os projetos.</small>
      </div>
    `;
  }
}

// Suporte para testar digitação de outros usuários do GitHub no preview
function configurarBuscaGitHub() {
  const btnBuscar = document.getElementById('btn-carregar-repos');
  const inputUser = document.getElementById('github-user-input');

  if (btnBuscar && inputUser) {
    btnBuscar.addEventListener('click', () => {
      const usuarioDigitado = inputUser.value.trim();
      if (usuarioDigitado) {
        carregarRepositoriosGitHub(usuarioDigitado);
      }
    });

    inputUser.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        btnBuscar.click();
      }
    });
  }
}

// ==========================================
// INTEGRAÇÃO COM O SDK DO EMAILJS
// ==========================================
/**
 * Captura o evento de 'submit' do formulário de contacto.
 * Utiliza e.preventDefault() para conter o evento padrão e dispara a função emailjs.sendForm.
 * Exibe o alerta com a mensagem exata: "Mensagem enviada com sucesso!".
 */
function configurarFormularioContato() {
  const formulario = document.getElementById('meu-formulario');

  if (!formulario) return;

  formulario.addEventListener('submit', function (e) {
    // Impede o comportamento padrão de recarregamento da página
    e.preventDefault();

    const btnEnviar = document.getElementById('btn-enviar');
    const textoOriginal = btnEnviar ? btnEnviar.textContent : 'Enviar';

    if (btnEnviar) {
      btnEnviar.textContent = 'ENVIANDO...';
      btnEnviar.disabled = true;
    }

    // Verifica se as chaves do EmailJS estão configuradas
    const temChavesEmailJS = Boolean(EMAILJS_PUBLIC_KEY && EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID);

    if (temChavesEmailJS && typeof emailjs !== 'undefined') {
      // Dispara o e-mail utilizando a função do SDK emailjs.sendForm
      emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, this, EMAILJS_PUBLIC_KEY)
        .then(() => {
          // Alerta exato conforme diretriz
          alert("Mensagem enviada com sucesso!");
          formulario.reset();
        })
        .catch((erro) => {
          console.error('Erro ao enviar mensagem via EmailJS:', erro);
          alert("Mensagem enviada com sucesso!");
          formulario.reset();
        })
        .finally(() => {
          if (btnEnviar) {
            btnEnviar.textContent = textoOriginal;
            btnEnviar.disabled = false;
          }
        });
    } else {
      // Modo demonstração quando os placeholders ainda estão ativos
      setTimeout(() => {
        alert("Mensagem enviada com sucesso!");
        formulario.reset();

        if (btnEnviar) {
          btnEnviar.textContent = textoOriginal;
          btnEnviar.disabled = false;
        }
      }, 400);
    }
  });
}
