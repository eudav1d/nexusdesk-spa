# NexusDesk — Painel de Suporte & Incidentes para Jogos

Projeto desenvolvido como uma Single Page Application (SPA) para resolver um problema comum em centrais de atendimento ao jogador (*Player Support* / *Live Ops*): organizar filas de chamados, triar incidentes críticos e acompanhar o cumprimento de prazos de resolução (SLA) sem lentidão de páginas recarregando ou confusão de planilhas soltas.

---

## 🎮 Sobre a Ideia e o Problema

Em jogos online, quando sai uma atualização ou ocorre um evento no servidor, o suporte costuma receber uma enxurrada de mensagens: compras que não caíram na conta, travamentos no meio de partidas ranqueadas ou perda de acesso por autenticação.

Sem uma triagem rápida baseada em prioridade, tickets urgentes (como cobrança duplicada ou bug generalizado de login) acabam se perdendo no meio de dúvidas simples. 

O **NexusDesk** centraliza essas demandas em um painel interativo com tema escuro (inspirado nas ferramentas operacionais de games), permitindo que a equipe de atendimento:
- Abra novos tickets rapidamente com identificação do jogador (*Player Tag/UID*);
- Classifique o incidente por jogo (*Arena of Valor*, *Evony: TKR*, *Priston Tale*, etc.);
- Acompanhe métricas em tempo real no Dashboard (taxa de resolução, fila pendente e chamados com risco de estourar o SLA);
- Busque e filtre chamados instantaneamente sem recarregar a tela.

---

## 🚀 Por que escolhi o React?

Para a proposta desta aplicação, optei pelo **React** (utilizando o **Vite** como empacotador) pelos seguintes motivos:

1. **Componentização limpa:** Como a interface tem vários elementos repetitivos — como os badges de status e prioridade, cartões de métricas e linhas de tabela —, o React permitiu isolar cada um em componentes reutilizáveis, deixando o código limpo e fácil de manter.
2. **Navegação rápida sem refresh (SPA):** Com o `react-router-dom`, a troca entre o Dashboard, a lista de chamados e a tela de cadastro acontece de forma instantânea. O usuário navega sem esperar a página recarregar, preservando o estado da aplicação.
3. **Gerenciamento de estado simples com Context API:** Em vez de instalar bibliotecas pesadas de estado, usei a própria `Context API` do React com `useState` e `useEffect`. Isso garante que, no momento em que um chamado é adicionado, editado ou resolvido, o Dashboard e a tabela recalculam os dados na hora.
4. **Persistência local (`localStorage`):** Como não havia exigência de backend com banco de dados, utilizei o `localStorage` do navegador integrado ao contexto. Assim, os dados continuam salvos mesmo se a página for fechada ou atualizada.
5. **Tailwind CSS para agilidade:** Escolhi o Tailwind pela produtividade para montar uma interface moderna com tema escuro (*dark mode*), efeitos de vidro (*glassmorphism*) e responsividade para diferentes tamanhos de tela.

---

## ✨ O que a aplicação faz (Funcionalidades)

- **Navegação SPA:** Rotas configuradas para navegação contínua entre Dashboard, Fila e Formulário.
- **Dashboard Operacional:**
  - Contadores de chamados abertos, chamados críticos e taxa de resolução.
  - Barra de progresso com a distribuição de chamados por jogo.
  - Tabela de referência de metas de SLA (de 4h para críticos até 48h para baixos).
- **CRUD Completo:**
  - **Cadastrar:** Formulário com seleção de jogo, categoria, prioridade e descrição.
  - **Listar:** Visualização tabular com badges visuais.
  - **Editar:** Permite alterar dados de chamados já existentes.
  - **Concluir rápido:** Botão de atalho para marcar o chamado como "Resolvido" direto na lista.
  - **Excluir:** Opção de remover o registro com janela de confirmação.
- **Busca e Filtros Dinâmicos:** Filtro por texto (busca por ID, nick do jogador ou assunto) e seletores rápidos por jogo e status.
- **Validação de Campos:** O formulário não permite envio em branco e exige um tamanho mínimo de caracteres no ID e na descrição, exibindo mensagens de erro abaixo dos campos.

---

## 📁 Estrutura de Pastas

Organizei o projeto separando componentes visuais, telas e a camada de dados:

```text
nexusdesk-spa/
├── src/
│   ├── components/       # Componentes reaproveitáveis (badges, logo)
│   ├── context/          # Estado global, funções de CRUD e dados mockados
│   ├── pages/            # Telas da aplicação (Dashboard, Listagem, Formulário)
│   ├── App.jsx           # Estrutura principal e definição das rotas
│   ├── index.css         # Importações do Tailwind CSS
│   └── main.jsx          # Ponto de inicialização do React
├── index.html
├── package.json
└── tailwind.config.js
```

Markdown
## 💻 Como Rodar o Projeto Localmente

Siga o passo a passo abaixo para clonar e executar a aplicação na sua máquina:

### Pré-requisitos
- Ter o **Node.js** instalado (versão 18 ou superior recomendada): [nodejs.org](https://nodejs.org/)
- Ter o **Git** instalado no computador.

---

### Passo a Passo

1. **Clonar o repositório:**
   ```bash
   git clone [https://github.com/eudav1d/nexusdesk-spa.git](https://github.com/eudav1d/nexusdesk-spa.git)
Acessar a pasta do projeto:

Bash
cd nexusdesk-spa
Instalar as dependências do projeto:

Bash
npm install
Iniciar o servidor de desenvolvimento:

Bash
npm run dev
Acessar no navegador:
Após rodar o comando acima, o Vite vai liberar a porta local. Basta segurar Ctrl e clicar no link exibido no terminal ou abrir no navegador:


http://localhost:5173
🛠️ Scripts Disponíveis no Projeto
npm run dev: Roda a aplicação em modo de desenvolvimento com recarregamento rápido (hot reload).

npm run build: Compila e gera os arquivos otimizados para produção na pasta dist/.

npm run preview: Executa localmente o pacote final gerado pelo comando de build.
