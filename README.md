
# CrazyStack Typescript Node.js - Sistema de Agendamentos Online 🚀

Este repositório faz parte do bootcamp **CrazyStack** do **DevDoido** e implementa uma API completa para gerenciamento de agendamentos online utilizando **Node.js**. O projeto foi desenvolvido com foco em escalabilidade, segurança e alta performance.

## Sumário 📚

- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Comandos Disponíveis](#comandos-disponíveis)
- [Scripts de Teste](#scripts-de-teste)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Tecnologias Utilizadas 🛠️

Este projeto utiliza as seguintes tecnologias:

- **Node.js** 🟢 para a criação do servidor.
- **Fastify** ⚡ como framework de servidor web, com suporte a WebSockets.
- **MongoDB/PostgreSQL** 🐱‍💻 para banco de dados não relacional ou relacional, você escolhe!
- **RabbitMQ** 🐻 para processamento de jobs paralelos via mensageria
- **Redis** 🧊 (via IORedis) para gerenciamento de cache.
- **JWT (JsonWebToken)** 🔐 para autenticação e autorização.
- **Axios** 📦 para requisições HTTP.
- **Stripe** 💳, **Woovi (PIX)** 💸 e **Pagar.me** 💵 para integração com pagamentos.

## Requisitos ✅

- Node.js v18+
- MongoDB
- Redis
- Kafka ou RabbitMQ

## Instalação 🛠️

1. Clone o repositório:

   ```bash
   git clone https://github.com/gumiranda/CrazyStackNodeJs.git
   ```

2. Acesse a pasta do projeto:

   ```bash
   cd CrazyStackNodeJs
   ```

3. Instale as dependências:

   ```bash
   yarn
   ```

4. Compile o projeto (caso esteja usando TypeScript):

```bash
  yarn build
```

5. Rode o projeto:

```bash
  yarn start
```

## Configuração ⚙️

Crie um arquivo `.env` na raiz do projeto e defina as variáveis de ambiente necessárias. Aqui está um exemplo de configuração:

```env
NODE_ENV = production;
JWT_SECRET = SEUS_BAGULHO;
JWT_REFRESH_SECRET = SEUS_BAGULHO;
PORT = 3333;
REDIS_PORT = 6379;
REDIS_URL = SEUS_BAGULHO;
REDIS_PASSWORD = SEUS_BAGULHO;
GOOGLE_MAPS_API_KEY = SEUS_BAGULHO;
WOOVI_KEY = "SEUS_BAGULHO";
WOOVI_WEBHOOK_SECRET = "SEUS_BAGULHO";
FUSORARIOBR = "inactive"; //mudar pra production se rodar local 
DATABASE = "mongodb"; // postgres or mongodb
CLOUDFLARE_R2_ACCESS_KEY_ID = SEUS_BAGULHO;
CLOUDFLARE_R2_ACCOUNT_ID = SEUS_BAGULHO;
CLOUDFLARE_R2_BUCKET_NAME = SEUS_BAGULHO;
CLOUDFLARE_R2_SECRET_ACCESS_KEY = SEUS_BAGULHO;
RABBITMQ_URL = SEUS_BAGULHO;
MESSAGE_BROKER = rabbitmq;
MONGO_URL_PROD = "SEUS_BAGULHO";
RESEND_API_KEY = SEUS_BAGULHO;
EMAIL_PROVIDER = resend;

MONGO_URL = "SEUS_BAGULHO";

PGHOST = "SEUS_BAGULHO";
PGDATABASE = "SEUS_BAGULHO";
PGUSER = "SEUS_BAGULHO";
PGPASSWORD = "SEUS_BAGULHO";
ENDPOINT_ID = "SEUS_BAGULHO";
PGPORT = 5432;

KAFKAJS_NO_PARTITIONER_WARNING = 1;
KAFKA_USERNAME = SEUS_BAGULHO;
KAFKA_PASSWORD = SEUS_BAGULHO;
KAFKA_HOST = SEUS_BAGULHO;
KAFKA_CLIENT_ID = SEUS_BAGULHO;
PAGARME_KEY = SEUS_BAGULHO;

```


## Comandos Disponíveis 🖥️

- `yarn start`: Inicia a API em produção.
- `yarn build`: Remove a pasta `dist` e compila o TypeScript.
- `yarn test`: Executa os testes com o Jest.
- `yarn format`: Formata o código utilizando Prettier.
- `yarn generate`: Executa o Plop para gerar componentes ou rotas automaticamente.

## Scripts de Teste 🧪

- `yarn test:db`: Testa a integração com o banco de dados.
- `yarn test:all`: Executa todos os testes.
- `yarn test:spec`: Testa arquivos específicos.
- `yarn test:t`: Testes personalizados.
- `yarn test:v`: Testes com output detalhado.


# Deploy da sua PRÓPRIA API Node.js

## Passo a Passo

### 1. Clonar o Template
- Clone o template do projeto a partir do repositório: [CrazyStackNodeJs](https://github.com/gumiranda/CrazyStackNodeJs)

### 2. Instalação das Dependências
- Baixe o repositório
- Rode o comando:
  ```bash
  yarn
  ```
- Crie o arquivo `.env` a partir do arquivo `env.example`

---

## Configuração do Banco de Dados não relacional

### 3. Criar Conta no MongoDB Atlas
- Acesse: [MongoDB Atlas](https://www.mongodb.com/lp/cloud/atlas/try4-reg)
- Crie sua conta e um novo cluster.
- Permita acesso de qualquer IP através do link:
  [Network Access](https://cloud.mongodb.com/v2/67dfe86414db796e800078bc#/security/network/accessList/addToAccessList)

### 4. Variáveis de Ambiente para o MongoDB
- Defina as seguintes variáveis no arquivo `.env`:
  ```bash
  DATABASE=mongodb
  MONGO_URL=<URL do banco de teste>
  MONGO_URL_PROD=<URL do banco de produção>
  ```

---

## Configuração do RabbitMQ

### 5. Criar Conta no CloudAMQP
- Acesse: [CloudAMQP](https://customer.cloudamqp.com/signup)
- Crie uma nova instância: [Create Instance](https://customer.cloudamqp.com/instance/create)
- Atualize o arquivo `.env` com a variável:
  ```bash
  RABBITMQ_URL=<URL do RabbitMQ>
  ```

### 6. Criar Tópicos no RabbitMQ
- No gerenciador do RabbitMQ, crie os seguintes tópicos:
  - `newOwner`
  - `resendEmailVerification`
  - `updatePosition`
  - `routeDriverFinished`
  - `sendEmailVerification`

---

## Autenticação com JWT

### 7. Gerar Secret JWT
- Gere um secret de 64 caracteres em: [JWT Secret Generator](https://jwtsecret.com/generate)

---

## Armazenamento na Cloudflare R2

### 8. Criar Conta na Cloudflare
- Acesse: [Cloudflare](https://dash.cloudflare.com/login)
- Crie um bucket no armazenamento R2
- Gere um token de API com permissão de leitura/gravação

### 9. Variáveis de Ambiente Cloudflare R2
- Adicione ao arquivo `.env`:
  ```bash
  CLOUDFLARE_R2_SECRET_ACCESS_KEY=<Chave de acesso secreta>
  CLOUDFLARE_R2_BUCKET_NAME=<Nome do bucket>
  CLOUDFLARE_R2_ACCESS_KEY_ID=<ID da chave de acesso>
  CLOUDFLARE_R2_ACCOUNT_ID=<ID da conta>
  ```

---

## Outras Integrações

### 10. Configurar Resend
- Acesse: [Resend API Keys](https://resend.com/api-keys)
- Crie uma chave de API e adicione ao `.env`

### 11. Configurar Google Maps API
- Acesse: [Google Maps API](https://console.cloud.google.com/apis/credentials)
- Crie uma chave de API e adicione ao `.env`:
  ```bash
  GOOGLE_MAPS_API_KEY=<Sua chave de API>
  ```

### 12. Configurar Redis no Upstash
- Acesse: [Upstash](https://console.upstash.com/login)
- Crie um banco de dados e adicione ao `.env`:
  ```bash
  REDIS_URL=<URL do Redis>
  REDIS_PASSWORD=<Senha do Redis>
  ```

---

## Deploy no Fly.io

### 13. Criar Conta no Fly.io
- Acesse: [Fly.io](https://fly.io/dashboard/personal/new-launch)
- Adicione um cartão de crédito e conecte o GitHub
- Rode o comando para instalar o Flyctl:
  ```bash
  brew install flyctl
  ```
- Lance a aplicação:
  ```bash
  fly launch
  fly deploy
  ```

---

## Configuração do PIX na Woovi

### 14. Criar Conta na Woovi
- Acesse: [Woovi](https://app.woovi.com/home/start)
- Crie um novo webhook com o evento de cobrança paga
- Adicione o `WOOVI_KEY` ao arquivo `.env`
- Crie a webhook de cobrança paga apontando pra url do fly.io no endpoint `/api/webhooks/add`
- Atualize o env com a variável `WOOVI_WEBHOOK_SECRET`

---

## Teste da API
- Verifique se a API está funcionando acessando a URL de documentação:
  ```bash
  fly open /docs
  ```

## Criando Usuário no Swagger
- Acesse o Swagger da aplicação e crie um novo usuário para testar a configuração no /signup.


## Contribuição 🤝

Contribuições são bem-vindas! Se você deseja melhorar este projeto, sinta-se à vontade para abrir uma *issue* ou enviar um *pull request*.

## Licença 📜

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo [LICENSE](./LICENSE) para mais detalhes.
```

Adicionei emojis para tornar o README mais visualmente atraente e destaquei as bibliotecas e tecnologias utilizadas. Sinta-se à vontade para modificar conforme necessário!
