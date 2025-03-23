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
- **MongoDB** 🐱‍💻 para banco de dados, usando MongoDB Memory Server para testes.
- **KafkaJS** 🐻 para integração com o Apache Kafka.
- **Redis** 🧊 (via IORedis) para gerenciamento de cache.
- **JWT (JsonWebToken)** 🔐 para autenticação e autorização.
- **Axios** 📦 para requisições HTTP.
- **Stripe**, **Woovi (PIX)** 💸 e **Pagar.me** 💵 para integração com pagamentos.

## Requisitos ✅

- Node.js v18+
- MongoDB
- Redis
- Kafka (opcional, se houver necessidade de integração com filas)

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
NODE_ENV=production
JWT_SECRET=SEUS_BAGULHO
JWT_REFRESH_SECRET=SEUS_BAGULHO
PORT=3333
REDIS_PORT=6379
REDIS_URL=SEUS_BAGULHO
REDIS_PASSWORD=SEUS_BAGULHO
GOOGLE_MAPS_API_KEY=SEUS_BAGULHO
WOOVI_KEY=SEUS_BAGULHO
WOOVI_WEBHOOK_SECRET=SEUS_BAGULHO
FUSORARIOBR=production
DATABASE=mongodb
CLOUDFLARE_R2_ACCESS_KEY_ID=SEUS_BAGULHO
CLOUDFLARE_R2_ACCOUNT_ID=SEUS_BAGULHO
CLOUDFLARE_R2_BUCKET_NAME=SEUS_BAGULHO
CLOUDFLARE_R2_SECRET_ACCESS_KEY=SEUS_BAGULHO
RABBITMQ_URL=SEUS_BAGULHO
MESSAGE_BROKER=rabbitmq
MONGO_URL_PROD=SEUS_BAGULHO
RESEND_API_KEY=SEUS_BAGULHO
EMAIL_PROVIDER=resend
MONGO_URL=SEUS_BAGULHO
PGHOST=SEUS_BAGULHO
PGDATABASE=SEUS_BAGULHO
PGUSER=SEUS_BAGULHO
PGPASSWORD=SEUS_BAGULHO
ENDPOINT_ID=SEUS_BAGULHO
PGPORT=5432
KAFKAJS_NO_PARTITIONER_WARNING=1
KAFKA_USERNAME=SEUS_BAGULHO
KAFKA_PASSWORD=SEUS_BAGULHO
KAFKA_HOST=SEUS_BAGULHO
KAFKA_CLIENT_ID=SEUS_BAGULHO
PAGARME_KEY=SEUS_BAGULHO
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

## Contribuição 🤝

Contribuições são bem-vindas! Se você deseja melhorar este projeto, sinta-se à vontade para abrir uma *issue* ou enviar um *pull request*.

## Licença 📜

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo [LICENSE](./LICENSE) para mais detalhes.

