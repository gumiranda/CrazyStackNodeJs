
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
- **Stripe** 💳, **Woovi (PIX)** 💸 e **Pagar.me** 💵 para integração com pagamentos.

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
# Configurações do MongoDB
MONGO_URL=mongodb+srv://seuusuario:suasenha@clusterseilaoqdomongo.mongodb.net/nomedobanco?retryWrites=true&w=majority
MONGO_URL_PROD=mongodb+srv://seuusuario:suasenha@clusterseilaoqdomongo.mongodb.net/nomedobanco?retryWrites=true&w=majority

NODE_ENV=production

JWT_SECRET=dsdsdsdsdsdsd
JWT_REFRESH_SECRET=dsdsdsdsdsdsd

REDIS_PORT=NUMERO_DA_PORTA
REDIS_URL=HOST_DO_REDIS
REDIS_PASSWORD=SENHA_DO_REDIS

GOOGLE_MAPS_API_KEY=SUAGOOGLEMAPSAPIKEY

WOOVI_WEBHOOK_SECRET=SUAWOOVIWEBHOOKSECRET
WOOVI_KEY=SUAWOOVIKEY

PGHOST='ep-black-water-a5s6ziyz.us-east-2.aws.neon.tech'
PGDATABASE='neondb'
PGUSER='neondb_owner'
PGPASSWORD='nvi9XBpaRVQ0'
ENDPOINT_ID='ep-black-water-a5s6ziyz'
PGPORT=5432

FUSORARIOBR="production"
# postgres ou mongodb
DATABASE="postgres"

UPLOAD_PROVIDER="cloudflare_r2"
CLOUDFLARE_R2_ACCESS_KEY_ID=SEU_ACCESS_KEY_DA_CLOUDFLARE
CLOUDFLARE_R2_ACCOUNT_ID=SEU_ACCOUNT_ID_DA_CLOUDFLARE
CLOUDFLARE_R2_BUCKET_NAME=crazystack
CLOUDFLARE_R2_SECRET_ACCESS_KEY=SEU_ACCESS_SECRET_DA_CLOUDFLARE

#rabbitmq ou kafka
MESSAGE_BROKER=rabbitmq
RABBITMQ_URL=SUA_URL_DO_RABBITMQ

PORT=3333
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
```

Adicionei emojis para tornar o README mais visualmente atraente e destaquei as bibliotecas e tecnologias utilizadas. Sinta-se à vontade para modificar conforme necessário!
