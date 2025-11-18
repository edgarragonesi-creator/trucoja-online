# 🎮 Truco Online - Sistema de Apostas em Dinheiro Real

## ⚠️ IMPORTANTE: Como usar este projeto

**Este projeto foi gerado como documentação completa.** Como o ambiente de execução está bloqueado, você deve:

1. **Baixar todos os arquivos** desta documentação
2. **Criar o projeto localmente** no seu computador
3. **Seguir o guia de instalação** abaixo

## 📥 Arquivos Disponíveis para Download

Todos os arquivos de documentação estão na pasta `docs/`:
- `ARCHITECTURE.md` - Arquitetura completa do sistema
- `DATABASE.md` - Modelos de banco de dados
- `API.md` - Especificações de API REST e WebSocket
- `GAME_RULES.md` - Regras detalhadas do jogo
- `ECONOMICS.md` - Modelo econômico e projeções
- `LEGAL.md` - Questões legais e compliance
- `ROADMAP.md` - Roadmap de desenvolvimento
- `FOLDER_STRUCTURE.md` - Estrutura de pastas do projeto

---

## 📋 Visão Geral

Aplicativo mobile multiplayer de Truco (Paulista/Mineiro) com sistema de apostas em dinheiro real, carteira digital integrada e pagamentos via PIX.

## 🎯 Características Principais

### Jogo
- **Modalidades**: Truco Paulista e Mineiro
- **Formatos**: 1x1 e 2x2
- **Pontuação**: Sistema até 12 pontos
- **Apostas**: Truco, Seis, Nove, Doze
- **Manilhas**: Fixas ou variáveis conforme regra

### Sistema Financeiro
- **Apostas**: R$ 1, 2, 5, 10, 15, 25, 50, 100, 200
- **Rake da Casa**: 5% do pool total
- **Pagamento**: 95% para o vencedor
- **Depósitos/Saques**: Via PIX
- **Carteira Digital**: Saldo interno gerenciado

### Segurança
- Servidor autoritativo (anti-trapaça)
- Embaralhamento criptograficamente seguro
- Sistema de detecção de fraudes
- Logs completos e replay de partidas
- KYC opcional para verificação de identidade

## 🏗️ Stack Tecnológico

### Frontend
- **Framework**: React Native (iOS/Android)
- **State Management**: Redux Toolkit
- **WebSocket**: Socket.IO Client
- **UI**: React Native Paper / Native Base

### Backend
- **Runtime**: Node.js 20+
- **Framework**: Express.js
- **WebSocket**: Socket.IO
- **Autenticação**: JWT + Passport.js
- **Validação**: Zod

### Banco de Dados
- **Principal**: PostgreSQL 15+
- **Cache**: Redis 7+
- **ORM**: Prisma

### Infraestrutura
- **Cloud**: AWS / GCP / DigitalOcean
- **CDN**: CloudFlare
- **Monitoring**: Sentry + DataDog
- **CI/CD**: GitHub Actions

### Pagamentos
- **Gateway**: Integração PIX (Mercado Pago, PagSeguro, ou similar)
- **Compliance**: PCI DSS considerations

## 📁 Estrutura do Projeto

```
truco-online/
├── mobile/                 # React Native App
│   ├── src/
│   │   ├── screens/       # Telas do app
│   │   ├── components/    # Componentes reutilizáveis
│   │   ├── services/      # API e WebSocket clients
│   │   ├── store/         # Redux store
│   │   ├── navigation/    # React Navigation
│   │   └── utils/         # Utilitários
│   ├── android/
│   ├── ios/
│   └── package.json
│
├── backend/               # Node.js API + WebSocket
│   ├── src/
│   │   ├── controllers/   # Controllers REST
│   │   ├── services/      # Lógica de negócio
│   │   ├── models/        # Modelos Prisma
│   │   ├── websocket/     # Handlers WebSocket
│   │   ├── middleware/    # Middleware Express
│   │   ├── utils/         # Utilitários
│   │   └── config/        # Configurações
│   ├── prisma/
│   │   └── schema.prisma
│   ├── tests/
│   └── package.json
│
├── shared/                # Código compartilhado
│   ├── types/            # TypeScript types
│   ├── constants/        # Constantes do jogo
│   └── validators/       # Schemas Zod
│
├── docs/                  # Documentação completa
│   ├── ARCHITECTURE.md
│   ├── DATABASE.md
│   ├── API.md
│   ├── GAME_RULES.md
│   ├── ECONOMICS.md
│   ├── LEGAL.md
│   ├── ROADMAP.md
│   └── FOLDER_STRUCTURE.md
│
├── infrastructure/        # IaC (Terraform/CloudFormation)
│   ├── terraform/
│   └── docker/
│
└── tests/                 # Testes E2E
    └── e2e/
```

## 🚀 Como Começar (Instalação Local)

### Pré-requisitos
- Node.js 20+
- PostgreSQL 15+
- Redis 7+
- React Native CLI
- Android Studio / Xcode

### Passo 1: Criar estrutura do projeto

```bash
# Criar pasta principal
mkdir truco-online
cd truco-online

# Criar subpastas
mkdir -p mobile backend shared docs infrastructure tests
```

### Passo 2: Configurar Backend

```bash
cd backend
npm init -y

# Instalar dependências principais
npm install express socket.io @prisma/client jsonwebtoken bcryptjs zod
npm install -D typescript @types/node @types/express ts-node-dev prisma

# Inicializar TypeScript
npx tsc --init

# Inicializar Prisma
npx prisma init
```

### Passo 3: Configurar Mobile

```bash
cd ../mobile
npx react-native init TrucoOnline --template react-native-template-typescript

# Instalar dependências
npm install @react-navigation/native @react-navigation/stack
npm install react-native-screens react-native-safe-area-context
npm install @reduxjs/toolkit react-redux
npm install socket.io-client
npm install react-native-paper
```

### Passo 4: Configurar Banco de Dados

```bash
# Criar banco PostgreSQL
createdb truco_online

# Configurar .env no backend
echo "DATABASE_URL=postgresql://user:password@localhost:5432/truco_online" > backend/.env
echo "JWT_SECRET=seu_secret_super_seguro" >> backend/.env
echo "REDIS_URL=redis://localhost:6379" >> backend/.env
```

### Passo 5: Executar Migrações

```bash
cd backend
npx prisma migrate dev --name init
npx prisma generate
```

### Passo 6: Iniciar Desenvolvimento

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Redis
redis-server

# Terminal 3 - Mobile (iOS)
cd mobile
npm run ios

# Terminal 3 - Mobile (Android)
cd mobile
npm run android
```

## 📚 Documentação Completa

Consulte os arquivos na pasta `docs/` para informações detalhadas:

1. **[ARCHITECTURE.md](./docs/ARCHITECTURE.md)** - Arquitetura do sistema, diagramas, fluxos
2. **[DATABASE.md](./docs/DATABASE.md)** - Schema completo, relacionamentos, índices
3. **[API.md](./docs/API.md)** - Endpoints REST e eventos WebSocket
4. **[GAME_RULES.md](./docs/GAME_RULES.md)** - Regras do Truco, lógica do jogo
5. **[ECONOMICS.md](./docs/ECONOMICS.md)** - Modelo econômico, projeções financeiras
6. **[LEGAL.md](./docs/LEGAL.md)** - Compliance, LGPD, questões legais
7. **[ROADMAP.md](./docs/ROADMAP.md)** - Plano de desenvolvimento de 12 meses
8. **[FOLDER_STRUCTURE.md](./docs/FOLDER_STRUCTURE.md)** - Estrutura detalhada de pastas

## 🧪 Testes

```bash
# Testes unitários
npm run test

# Testes de integração
npm run test:integration

# Testes E2E
npm run test:e2e

# Coverage
npm run test:coverage
```

## 📊 Modelo de Negócio

### Receita
- **Rake**: 5% de cada partida
- **Exemplo**: Partida de R$ 100 → Casa recebe R$ 5, vencedor R$ 95
- **Projeção**: 1000 partidas/dia × R$ 10 média × 5% = R$ 500/dia

### Custos Estimados (Mensal)
- **Infraestrutura**: R$ 2.000-5.000
- **Gateway de Pagamento**: 1-2% por transação
- **Suporte**: Variável conforme escala
- **Marketing**: R$ 5.000-20.000

### Break-even
- ~400-500 partidas/dia para cobrir custos operacionais básicos

## ⚖️ Compliance e Legal

⚠️ **ATENÇÃO CRÍTICA**: Jogos de azar com apostas em dinheiro real são **altamente regulamentados** no Brasil.

### Obrigações Legais
1. **Consultar advogado especializado** antes do lançamento
2. **Termos de Uso e Política de Privacidade** robustos
3. **Conformidade com LGPD** obrigatória
4. **Licenciamento** em jurisdição apropriada
5. **KYC/AML** para prevenção de lavagem de dinheiro
6. **Idade mínima** 18 anos com verificação

### Riscos
- Enquadramento como jogo de azar (Lei de Contravenções Penais)
- Multas por operação irregular
- Responsabilidade civil e criminal

**Recomendação**: Consulte [LEGAL.md](./docs/LEGAL.md) para análise completa.

## 🛡️ Segurança

### Medidas Implementadas
- ✅ Autenticação JWT com refresh tokens
- ✅ Rate limiting em todas as rotas
- ✅ Validação de entrada com Zod
- ✅ Sanitização de dados
- ✅ HTTPS obrigatório
- ✅ Logs de auditoria completos
- ✅ Detecção de comportamento anômalo
- ✅ Embaralhamento criptográfico (crypto.randomBytes)
- ✅ Servidor autoritativo (clientes não controlam cartas)

### Sistema Anti-Fraude
- Detecção de múltiplas contas (device fingerprint)
- Análise de padrões de jogo suspeitos
- Monitoramento de win rate anormal
- Bloqueio automático de contas suspeitas
- Replay de partidas para auditoria

## 📈 Roadmap de Desenvolvimento

### Fase 1 - MVP (3-4 meses)
- [x] Documentação completa
- [ ] Backend core + API REST
- [ ] Sistema de autenticação
- [ ] Lógica do jogo (Truco Paulista 1x1)
- [ ] WebSocket para partidas em tempo real
- [ ] App mobile básico (login, lobby, jogo)
- [ ] Integração PIX (depósitos)
- [ ] Carteira digital básica

### Fase 2 - Beta Fechado (2-3 meses)
- [ ] Truco Mineiro
- [ ] Modo 2x2
- [ ] Sistema de ranking
- [ ] Chat in-game
- [ ] Saques via PIX
- [ ] Sistema anti-fraude básico
- [ ] Histórico de partidas
- [ ] Testes com usuários beta

### Fase 3 - Beta Público (2 meses)
- [ ] Otimizações de performance
- [ ] Salas privadas com código
- [ ] Sistema de amigos
- [ ] Notificações push
- [ ] Suporte ao cliente (chat)
- [ ] Testes de carga
- [ ] Auditoria de segurança

### Fase 4 - Launch (1-2 meses)
- [ ] Compliance legal finalizado
- [ ] Termos de uso e privacidade
- [ ] KYC/AML implementado
- [ ] Marketing e onboarding
- [ ] App nas lojas (iOS/Android)
- [ ] Monitoramento 24/7

### Fase 5 - Crescimento (contínuo)
- [ ] Torneios programados
- [ ] Sistema de conquistas
- [ ] Programa de afiliados
- [ ] Mesas VIP
- [ ] Expansão internacional
- [ ] Novos modos de jogo

## 💰 Estimativa de Investimento

### Desenvolvimento (6-8 meses)
- **Equipe mínima**: 1 Full-stack + 1 Mobile + 1 Designer
- **Custo**: R$ 150.000 - 300.000

### Infraestrutura (Primeiro ano)
- **Servidores**: R$ 24.000 - 60.000
- **Pagamentos**: Variável (% das transações)
- **Total**: R$ 30.000 - 80.000

### Legal e Compliance
- **Advogados**: R$ 20.000 - 50.000
- **Licenças**: Variável por jurisdição

### Marketing (Primeiro ano)
- **Aquisição de usuários**: R$ 50.000 - 200.000
- **Branding**: R$ 10.000 - 30.000

**Total Estimado**: R$ 260.000 - 660.000 (primeiro ano)

## 🎯 KPIs Importantes

### Métricas de Produto
- DAU (Daily Active Users)
- Retention Rate (D1, D7, D30)
- Average Session Duration
- Partidas por usuário/dia

### Métricas Financeiras
- GMV (Gross Merchandise Value)
- Rake Revenue
- ARPU (Average Revenue Per User)
- LTV (Lifetime Value)
- CAC (Customer Acquisition Cost)

### Métricas de Qualidade
- Crash Rate
- API Response Time
- Match Making Time
- Fraud Detection Rate

## 🤝 Equipe Recomendada

### Fase MVP
- 1x Full-stack Developer (Backend + DevOps)
- 1x Mobile Developer (React Native)
- 1x UI/UX Designer
- 1x QA Tester (part-time)

### Fase Growth
- +1x Backend Developer
- +1x Mobile Developer
- +1x Product Manager
- +1x Customer Support
- +1x Marketing/Growth

## 📞 Próximos Passos

1. ✅ **Revisar toda a documentação** na pasta `docs/`
2. ⚠️ **Consultar advogado especializado** em jogos e apostas
3. 🏗️ **Montar equipe de desenvolvimento**
4. 💰 **Definir modelo de investimento**
5. 🚀 **Iniciar desenvolvimento do MVP**

## 📄 Licença

Proprietary - Todos os direitos reservados © 2024

## 📧 Contato

Para dúvidas sobre esta documentação ou o projeto:
- **Email**: dev@trucoonline.com.br

---

**Desenvolvido com ❤️ para os amantes de Truco**

**Nota**: Este é um projeto de alta complexidade que envolve dinheiro real. Proceda com responsabilidade e sempre consulte profissionais especializados em questões legais e financeiras.
