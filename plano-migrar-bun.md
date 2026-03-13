 Migrar CrazyStackNodeJs para Bun.js + Elysia

 Context

 O projeto Barberix (sistema de agendamentos online) roda em Node.js + Fastify 5 + TypeScript. O
 objetivo e migrar para Bun.js + Elysia para aproveitar a performance nativa do Bun (TS nativo,
 password hashing built-in, testes built-in) e a DX do Elysia (type-safe, end-to-end).

 A arquitetura Clean Architecture com feature slices (src/slices/) e framework-agnostica — o Fastify
 so aparece na camada de infraestrutura. Isso torna a migracao viavel com mudancas concentradas em ~40
  arquivos, sem tocar na logica de negocio (~440 arquivos intactos).

 ---
 Fase 0: Pre-flight — Validacao de compatibilidade

 Antes de qualquer mudanca, rodar bun install no projeto atual para verificar:

 0.1 Deps com bindings nativos (N-API/node-gyp)

 - bcrypt usa binding nativo que pode falhar no Bun. Como sera removido na Fase 2, executar Fase 1 e 2
  juntas (sem gap) para nao travar com bcrypt quebrado.
 - Se bun install falhar no bcrypt, adicionar bcrypt ao trustedDependencies no package.json ou usar
 --ignore-scripts temporariamente.

 0.2 MongoDB Connection Pooling

 - Testar conexao MongoDB isolada sob Bun antes de migrar o framework:
 // test-mongo-bun.ts (script temporario)
 import { MongoClient } from "mongodb";
 const client = new MongoClient("mongodb://localhost:27017");
 await client.connect();
 const db = client.db("test");
 console.log(await db.listCollections().toArray());
 await client.close();
 - Verificar se MongoHelper (singleton com connection pooling) funciona corretamente.
 - O MongoHelper.connect() retorna o MongoClient — garantir que sessions/transactions continuam
 funcionando.

 0.3 Arquivos .env

 - Bun carrega .env automaticamente sem dotenv, mas o comportamento com .env.production, .env.test
 etc. e diferente:
   - Bun carrega .env e .env.local por padrao
   - .env.production / .env.test nao sao carregados automaticamente (diferente do dotenv com scripts
 customizados)
 - Verificar se env.ts (Zod schema) continua parseando corretamente em todos os ambientes
 - Se necessario, carregar manualmente no src/index.ts:
 import { file } from "bun";
 // Bun ja carrega .env, mas se precisar de .env.production:
 // import.meta.env ou process.env ja estarao populados

 ---
 Fase 1: Runtime — Node.js para Bun

 1.1 tsconfig.json — Atualizar para Bun

 {
   "compilerOptions": {
     "target": "ESNext",
     "module": "ESNext",
     "moduleResolution": "bundler",
     "types": ["bun-types"],
     "baseUrl": "./src",
     "paths": { "@/*": ["*"] },
     "strict": true,
     "skipLibCheck": true,
     "esModuleInterop": true,
     "forceConsistentCasingInFileNames": true,
     "noImplicitOverride": true,
     "removeComments": true,
     "emitDecoratorMetadata": true,
     "experimentalDecorators": true,
     "outDir": "dist"
   },
   "include": ["src"]
 }

 1.2 Deletar src/application/infra/config/module-alias.ts

 - Remover import "./application/infra/config/module-alias" do src/index.ts
 - Bun resolve @/* nativamente via tsconfig.json paths

 1.3 Instalar Bun types

 bun add -d bun-types

 ---
 Fase 2: Crypto — bcrypt e JWT

 2.1 src/application/infra/crypto/adapters/bcryptAdapter.ts

 Trocar bcrypt por Bun.password (compativel com hashes existentes no banco):
 import { Encrypter, HashComparer } from "@/application/infra/crypto/protocols";

 export class BcryptAdapter implements Encrypter, HashComparer {
   constructor(private readonly salt: number) {}
   async encrypt(value: string): Promise<string> {
     return Bun.password.hash(value, { algorithm: "bcrypt", cost: this.salt });
   }
   async compare(password: string, hashedText: string): Promise<boolean> {
     return Bun.password.verify(password, hashedText);
   }
 }

 2.2 src/application/infra/crypto/adapters/jwtAdapter.ts

 Trocar jsonwebtoken por jose:
 import { SignJWT, jwtVerify } from "jose";
 import { TokenDecrypter, TokenGenerator } from "@/application/infra/crypto/protocols";

 export class JwtAdapter implements TokenDecrypter, TokenGenerator {
   private secretKey: Uint8Array;
   constructor(secret: string, private readonly expirationTime: string) {
     this.secretKey = new TextEncoder().encode(secret);
   }
   async decrypt(value: string): Promise<string> {
     const { payload } = await jwtVerify(value, this.secretKey);
     return payload as any;
   }
   async generate(_id: string): Promise<string> {
     return new SignJWT({ _id })
       .setProtectedHeader({ alg: "HS256" })
       .setExpirationTime(this.expirationTime)
       .sign(this.secretKey);
   }
 }

 2.3 src/application/infra/middlewares/auth/authMiddleware.ts

 Trocar jwt.verify por jose:
 import { jwtVerify } from "jose";
 // ...
 private async verifyToken(token: string, secret: string): Promise<any> {
   try {
     const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
     return payload;
   } catch { return null; }
 }

 2.4 Mesmo para refreshTokenMiddleware.ts (mesma mudanca de jwt.verify)

 2.5 Deps

 bun add jose
 bun remove bcrypt @types/bcrypt jsonwebtoken @types/jsonwebtoken

 ---
 Fase 3: Framework — Fastify para Elysia

 3.1 Instalar Elysia e plugins

 bun add elysia @elysiajs/cors @elysiajs/swagger elysia-rate-limit
 bun remove fastify @fastify/cors @fastify/helmet @fastify/multipart @fastify/rate-limit
 @fastify/request-context @fastify/swagger @fastify/swagger-ui @fastify/under-pressure
 @fastify/mongodb @gquittet/graceful-server

 3.2 src/index.ts — Reescrever completo

 - Criar instancia Elysia com plugins (cors, swagger, rate-limit)
 - Rate limiting: elysia-rate-limit com { max: 1000, duration: 600_000 } (1000 req / 10 min)
   - Alternativa para producao: delegar rate limit ao reverse proxy (Nginx/Cloudflare) — mais robusto
 para multi-tenant/white-label
 - Registrar rotas com prefixo /api via .group()
 - Headers de seguranca via onAfterHandle (substitui helmet)
 - Graceful shutdown completo — chamar na ordem:
   a. app.stop() — fecha o Elysia e para de aceitar conexoes
   b. MongoHelper.disconnect() / client.close() — fecha pool MongoDB
   c. closePool() — fecha pool PostgreSQL
   d. process.exit(0)
 const shutdown = async () => {
   console.log("O pai ta ficando off");
   await app.stop();
   await MongoHelper.disconnect();
   await closePool();
   process.exit(0);
 };
 process.on("SIGTERM", shutdown);
 process.on("SIGINT", shutdown);

 3.3 src/application/adapters/router-adapter.ts — Reescrever

 Trocar @fastify/request-context por contexto Elysia via store:
 import { HttpRequest } from "@/application/helpers";
 import { Controller } from "@/application/infra/contracts";

 export const adaptRoute = (controller: Controller) => {
   return async ({ body, params, query, headers, set, store }: any) => {
     const httpRequest: HttpRequest = {
       body, params, headers, query,
       userId: store?.userId ?? null,
       userLogged: store?.userLogged ?? null,
       daysToNextPayment: store?.daysToNextPayment ?? null,
     };
     const { statusCode, data } = await controller.handle(httpRequest);
     set.status = statusCode;
     return data;
   };
 };

 3.4 src/application/adapters/middleware-adapter.ts — Reescrever

 Usar beforeHandle do Elysia e propagar contexto via store:
 import { Middleware } from "@/application/infra/contracts";
 import { HttpRequest } from "@/application/helpers";

 export const adaptMiddleware = (middleware: Middleware) => {
   return async ({ headers, set, store }: any) => {
     const httpRequest: HttpRequest = { headers };
     const httpResponse = await middleware.handle(httpRequest);
     if (httpResponse.statusCode === 200) {
       store.userId = httpResponse.data?.userId;
       store.userLogged = httpResponse.data?.userLogged;
       store.daysToNextPayment = httpResponse.data?.daysToNextPayment;
     } else if (httpResponse?.data) {
       set.status = httpResponse.statusCode;
       return httpResponse.data; // short-circuit
     } else {
       set.status = 500;
       return { error: "Internal Server Error" };
     }
   };
 };

 3.5 src/application/adapters/upload-photo-adapter.ts — Reescrever

 Trocar request.file() do Fastify por body.file do Elysia (Web API File/Blob). Trocar
 requestContext.get() por store.

 IMPORTANTE: O Elysia precisa de t.File() do Typebox no schema da rota para parsear multipart
 corretamente. Sem isso, body.file vem undefined. Isso e uma excecao a decisao de "manter JSON Schema"
  — para upload, Typebox e obrigatorio:

 // No uploadPhotoRouter.ts
 import { t } from "elysia";

 export const uploadRoutes = new Elysia()
   .state("userId", null as string | null)
   .state("userLogged", null as any)
   .state("daysToNextPayment", null as any)
   .onBeforeHandle(authLogged())
   .post("/upload", adaptUploadPhotoRoute(makeAddPhotoController()), {
     body: t.Object({
       file: t.File(),
     }),
   });

 Alem disso, o CloudflareR2UploadProvider.uploadFile() recebe stream do Fastify multipart. Com Elysia,
  recebe File (Web API Blob). Atualizar para aceitar ambos:
 async uploadFile(file: any, expiresIn: number) {
   const body = file instanceof Blob ? file.stream() : file.file;
   // ... resto do upload
 }

 3.6 Reescrever 10 Router files — Mesma transformacao mecanica

 Padrao atual (Fastify):
 async function user(fastify: any) {
   fastify.addHook("preHandler", authLogged());
   fastify.post("/user/add", addUserPostSchema, addUserAdapter());
   // ...
 }

 Padrao novo (Elysia):
 import { Elysia } from "elysia";

 export const user = new Elysia()
   .state("userId", null as string | null)
   .state("userLogged", null as any)
   .state("daysToNextPayment", null as any)
   .onBeforeHandle(authLogged())
   .post("/user/add", addUserAdapter())
   .get("/user/load", loadUserAdapter())
   .get("/user/loadByPage", loadUserByPageAdapter())
   .get("/user/loadByGeoNear", loadUserByGeoNearAdapter())
   .delete("/user/delete", deleteUserAdapter())
   .patch("/user/update", updateUserAdapter());

 Rotas sem auth (auth, public, health):
 export const auth = new Elysia()
   .post("/auth/signup", signupAdapter())
   .post("/auth/login", loginAdapter())
   // ...

 Arquivos de rota afetados:
 - src/application/infra/routes/auth/authRouter.ts
 - src/application/infra/routes/user/userRouter.ts
 - src/application/infra/routes/appointment/appointmentRouter.ts
 - src/application/infra/routes/category/categoryRouter.ts
 - src/application/infra/routes/owner/ownerRouter.ts
 - src/application/infra/routes/service/serviceRouter.ts
 - src/application/infra/routes/photo/photoRouter.ts
 - src/application/infra/routes/photo/uploadPhotoRouter.ts
 - src/application/infra/routes/request/requestRouter.ts
 - src/application/infra/routes/public/publicRouter.ts
 - src/application/infra/routes/health/ (health check)

 3.7 src/application/infra/routes/index.ts

 Manter como array de plugins Elysia (compativel com .use()).

 3.8 Schemas — Manter JSON Schema existente (exceto upload)

 Os controllers ja validam via ValidationComposite. Schemas servem so pro Swagger. Migrar pra Typebox
 do Elysia fica como melhoria futura.
 Excecao: Rota de upload PRECISA de t.File() do Typebox (ver 3.5).

 3.9 Headers de seguranca (substitui @fastify/helmet)

 No src/index.ts, adicionar onAfterHandle com headers:
 - X-Content-Type-Options: nosniff
 - X-Frame-Options: DENY
 - Strict-Transport-Security: max-age=15552000
 - Referrer-Policy: no-referrer

 ---
 Fase 4: package.json — Limpeza final

 Remover

 fastify, @fastify/*, @gquittet/graceful-server,
 bcrypt, @types/bcrypt, jsonwebtoken, @types/jsonwebtoken,
 module-alias, @types/module-alias, ts-node, tsconfig-paths,
 core-js, jest, @types/jest, ts-jest, jest-*, @shelf/jest-mongodb,
 jest-mock-extended, dotenv

 Adicionar

 elysia, @elysiajs/cors, @elysiajs/swagger, elysia-rate-limit, jose, bun-types

 Scripts finais

 {
   "start": "bun run src/index.ts",
   "dev": "bun --watch run src/index.ts",
   "test": "bun test",
   "test:db": "bun test --bail 1",
   "format": "prettier --write \"**/*.{ts,tsx,json,md}\""
 }

 Remover _moduleAliases

 ---
 Fase 5: Testes — Jest para bun:test

 5.1 Deletar configs Jest

 - jest.config.js, jest-all-config.js, jest-db-config.js, jest-mongodb-config.js, jest-spec-config.js,
  jest-test-config.js

 5.2 Em cada arquivo .spec.ts / .test.ts (~181 arquivos)

 Transformacao mecanica:
 - import { jest } from "@jest/globals"  →  import { describe, it, expect, beforeAll, afterAll,
 beforeEach, afterEach, mock, spyOn } from "bun:test"
 - jest.fn()                             →  mock(() => {})
 - jest.fn().mockResolvedValue(x)        →  mock(() => Promise.resolve(x))
 - jest.mock("mod", ...)                 →  mock.module("mod", ...)

 5.3 Testes de integracao (*.test.ts nos routers)

 Trocar fastify.inject() por app.handle(new Request(...)) do Elysia.

 5.4 Cuidado: mock.module() do Bun e experimental

 - mock.module() do Bun nao funciona igual ao jest.mock() em todos os cenarios:
   - Nao faz hoisting automatico (jest.mock sobe pro topo do arquivo)
   - Nao funciona bem com modulos ja importados
   - Pode falhar com re-exports e barrel files
 - Estrategia: Como a arquitetura usa injecao de dependencia via factories (controllers recebem
 useCases, useCases recebem repositories), a maioria dos testes unitarios ja usa DI explicita — nao
 depende de jest.mock().
 - Para os testes que usam jest.mock() pesadamente: avaliar caso a caso se precisa refatorar para DI
 explicita ou se mock.module() funciona.
 - Se mock.module() causar problemas demais, considerar manter Jest rodando via Bun (bunx jest) como
 fallback temporario.

 ---
 O que NAO muda (~440 arquivos)

 - src/slices/*/entities/ — Entidades de dominio
 - src/slices/*/useCases/ — Logica de negocio
 - src/slices/*/repositories/ — Repositorios (exceto import paths)
 - src/slices/*/controllers/ — Controllers (usam HttpRequest/HttpResponse abstratos)
 - src/application/helpers/ — HTTP helpers, date utils, validation
 - src/application/errors/ — Error classes
 - src/application/decorators/ — LogController
 - src/application/infra/database/ — MongoDB e PostgreSQL (drivers compativeis com Bun)
 - src/application/infra/storage/ — Cloudflare R2 (AWS SDK compativel)
 - src/application/infra/config/env.ts — Zod + process.env (Bun suporta)
 - src/application/infra/config/whiteLabel.ts — Config estatica
 - src/application/infra/contracts/ — Interfaces abstratas

 ---
 Verificacao

 1. Fase 0: bun install sem erros + script de teste MongoDB conecta
 2. Fase 1: bun run src/index.ts — servidor inicia (ainda com Fastify)
 3. Fase 2: Testar login/signup — hashes existentes no banco continuam funcionando com
 Bun.password.verify
 4. Fase 3: Testar todos endpoints — health, auth (signup/login), CRUD autenticado, upload de foto
   - Verificar rate limiting esta ativo
   - Verificar headers de seguranca nas responses
   - Verificar graceful shutdown fecha MongoDB + PostgreSQL
 5. Fase 5: bun test — testes passam. Testes com mock.module() que falharem precisam de refactor para
 DI.

 Ordem de execucao

 Sequencia: 0 (validacao) → 1+2 juntas (runtime+crypto, sem gap por causa do bcrypt nativo) → 3
 (framework) → 4 (cleanup) → 5 (testes)
