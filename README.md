## 🛠️ Tecnologias Utilizadas

- **React Native** 0.79.4
- **Expo** ~53.0.12
- **TypeScript** ~5.8.3
- **Expo Router** para navegação
- **Styled Components** para estilização
- **Jest** para testes
- **Testing Library** para testes de componentes

## 📱 Arquitetura

O projeto segue os princípios da **Clean Architecture**, organizando o código em camadas bem definidas:

```
src/
├── business/           # Regras de negócio
│   ├── entities/       # Entidades de domínio
│   ├── usecases/       # Casos de uso
│   ├── repositories/   # Interfaces e implementações
│   └── services/       # Serviços externos
└── mobile/             # Interface do usuário
    ├── components/     # Componentes reutilizáveis
    ├── screens/        # Telas da aplicação
    ├── contexts/       # Contextos React
    └── styles/         # Temas e estilos
```

## Pré-requisitos

Antes de começar, você precisa ter instalado em sua máquina:

- **Node.js** (versão 18 ou superior)
- **Yarn**
- **Expo CLI**
- **Android Studio** (para emulador Android) ou **Xcode** (para emulador iOS - apenas macOS)

### Instalação do Expo CLI

```bash
npm install -g @expo/cli
```

## Instalação

1. **Clone o repositório:**
```bash
git clone https://github.com/seu-usuario/app-bancoxyz.git
cd app-bancoxyz
```

2. **Instale as dependências:**
```bash

# Com yarn
yarn install
```

## Como Executar o Projeto

### Desenvolvimento

Para iniciar o servidor de desenvolvimento:

```bash

# Com yarn
yarn start
```

### Executar em plataformas específicas

**Android:**
```bash

# Com yarn
yarn android
```

**iOS (apenas macOS):**
```bash

# Com yarn
yarn ios
```

**Web:**
```bash
# Com npm
npm run web

# Com yarn
yarn web
```

### 📱 Testando no Dispositivo

1. Instale o app **Expo Go** em seu smartphone:
   - [Android - Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [iOS - App Store](https://apps.apple.com/app/expo-go/id982107779)

2. Execute `yarn start` ou `npm start`

3. Escaneie o QR Code que aparece no terminal ou no navegador

## 🧪 Testes

O projeto inclui uma suíte completa de testes unitários cobrindo:
- Casos de uso (Use Cases)
- Repositórios
- Componentes React
- Validações de negócio

### Executar todos os testes

```bash
# Com yarn
yarn test
```

### Executar testes com coverage

```bash
# Com npm
npm run test:coverage

# Com yarn
yarn test:coverage
```

## 📊 Coverage de Testes

O projeto mantém alta cobertura de testes. Para visualizar o relatório de coverage:

1. Execute: `yarn test:coverage`
2. Abra o arquivo `coverage/lcov-report/index.html` no navegador

**1. Erro de cache do Metro:**
```bash
npx expo start --clear
```

**2. Problemas com dependências:**
```bash
rm -rf node_modules
rm yarn.lock  # ou package-lock.json
yarn install  # ou npm install
```

**3. Erro nos testes:**
```bash
yarn test --clearCache
```