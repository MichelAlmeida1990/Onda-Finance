# Onda Finance — Desafio Front-End

Aplicação web simulando um app bancário simples, desenvolvida como parte do desafio técnico da Onda Finance.

🔗 **[Acesse a aplicação publicada](#)** ← link será adicionado após o deploy

---

## Como rodar o projeto

### Pré-requisitos

- Node.js 20+
- npm 10+

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/jobz-talentos.git
cd jobz-talentos

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:5173`

**Credenciais de acesso (mock):**
- E-mail: `usuario@onda.com`
- Senha: `123456`

### Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera o build de produção |
| `npm run preview` | Visualiza o build de produção |
| `npm run test` | Roda os testes em modo watch |
| `npm run test:run` | Roda os testes uma vez |

---

## Funcionalidades

- **Login (mock)** — autenticação com validação de formulário e persistência de sessão via `localStorage`
- **Dashboard** — exibe saldo atual e extrato de transações
- **Transferência** — formulário validado que debita o saldo e registra a transação no extrato
- **Rotas protegidas** — redirecionamento automático para login se não autenticado

---

## Decisões técnicas

### Stack e justificativas

| Tecnologia | Decisão |
|---|---|
| **React + TypeScript** | Tipagem estática reduz bugs em tempo de desenvolvimento e melhora a manutenibilidade |
| **Vite** | Build tool extremamente rápida, com HMR instantâneo e configuração mínima |
| **Tailwind CSS + CVA** | Tailwind para utilitários de estilo; CVA (Class Variance Authority) para criar variantes de componentes de forma tipada e segura |
| **shadcn/ui + Radix** | Componentes acessíveis e sem opinião de estilo, permitindo customização total via Tailwind |
| **React Router v6** | Roteamento declarativo com suporte a rotas protegidas via `<Outlet>` |
| **React Query** | Gerenciamento de estado assíncrono com cache, revalidação e estados de loading/error automáticos |
| **Zustand** | Estado global leve e sem boilerplate; usado para autenticação (com `persist`) e dados da conta |
| **React Hook Form + Zod** | Formulários performáticos com validação declarativa via schema; erros tipados e integração nativa |
| **Axios** | Cliente HTTP com interceptors, facilitando a adição futura de autenticação via headers |
| **Vitest** | Test runner nativo do Vite, sem configuração extra; compatível com a API do Jest |

### Arquitetura

```
src/
├── components/
│   ├── ui/          # Componentes base reutilizáveis (Button, Input, Card)
│   └── PrivateRoute.tsx
├── hooks/           # Custom hooks com React Query
├── lib/             # Utilitários e dados mock
├── pages/           # Páginas da aplicação
├── store/           # Stores Zustand (auth, account)
└── test/            # Testes e setup
```

- **Separação de responsabilidades**: store cuida do estado, hooks abstraem o acesso aos dados, páginas orquestram a UI
- **Persistência de sessão**: Zustand `persist` middleware salva o usuário autenticado no `localStorage`, mantendo a sessão após reload
- **Dados mock**: centralizados em `lib/mock-data.ts`, facilitando substituição futura por uma API real

---

## Testes

Fluxo testado: **Login**

Localização: `src/test/login.test.tsx`

Casos cobertos:
1. Exibe erros de validação ao submeter formulário vazio
2. Exibe mensagem de erro com credenciais incorretas
3. Autentica com sucesso e redireciona para o dashboard

```bash
npm run test:run
```

---

## Segurança

> As medidas abaixo descrevem como o aplicativo **seria** protegido em um ambiente de produção. A implementação não é necessária para este desafio.

### Proteção contra Engenharia Reversa

- **Ofuscação de código**: utilizar ferramentas como `javascript-obfuscator` no pipeline de build para dificultar a leitura do código minificado
- **Code splitting e lazy loading**: fragmentar o bundle em múltiplos chunks reduz a superfície de análise estática
- **Variáveis de ambiente**: nunca expor chaves de API, segredos ou lógica sensível no bundle do cliente — tudo que for crítico deve residir no backend
- **Remoção de source maps em produção**: desabilitar a geração de `.map` files no build de produção (`sourcemap: false` no Vite)
- **Backend for Frontend (BFF)**: mover regras de negócio críticas para um servidor intermediário, expondo apenas o necessário ao cliente

### Proteção contra Vazamento de Dados

- **HTTPS obrigatório**: toda comunicação deve ser criptografada via TLS; redirecionar HTTP para HTTPS
- **Tokens JWT com expiração curta**: usar access tokens de curta duração (15 min) com refresh tokens rotativos armazenados em cookies `HttpOnly; Secure; SameSite=Strict`
- **Nunca armazenar dados sensíveis no localStorage**: tokens de autenticação devem ficar em cookies HttpOnly, inacessíveis ao JavaScript
- **Content Security Policy (CSP)**: configurar headers CSP para prevenir XSS e injeção de scripts maliciosos
- **Sanitização de inputs**: validar e sanitizar todos os dados de entrada no servidor, não apenas no cliente
- **Rate limiting**: limitar tentativas de login para prevenir ataques de força bruta
- **Logs sem PII**: garantir que logs de aplicação não contenham dados pessoais identificáveis
- **CORS restritivo**: configurar o servidor para aceitar requisições apenas de origens autorizadas

---

## Melhorias futuras

- [ ] Integração com API real (substituir mocks por chamadas HTTP via Axios)
- [ ] Autenticação com JWT + refresh token em cookie HttpOnly
- [ ] Paginação e filtros no extrato de transações
- [ ] Gráfico de gastos por categoria no dashboard
- [ ] Modo escuro (dark mode) com Tailwind
- [ ] Internacionalização (i18n) com `react-i18next`
- [ ] Testes E2E com Playwright
- [ ] CI/CD com GitHub Actions (lint + testes + deploy automático)
- [ ] PWA com suporte offline via Service Worker
- [ ] Notificações em tempo real via WebSocket

---

## Autor

Desenvolvido para o desafio técnico **Onda Finance × JobZ Talentos**
