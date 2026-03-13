Migrar CrazyStackNodeJs para Bun.js + Elysia

 Context

 O projeto Barberix (sistema de agendamentos online) roda em Node.js + Fastify 5 + TypeScript. O objetivo e migrar
  para Bun.js + Elysia para aproveitar a performance nativa do Bun (TS nativo, password hashing built-in, testes
 built-in) e a DX do Elysia (type-safe, end-to-end).

 A arquitetura Clean Architecture com feature slices (src/slices/) e framework-agnostica — o Fastify so aparece na
  camada de infraestrutura. Isso torna a migracao viavel com mudancas concentradas em ~40 arquivos, sem tocar na
 logica de negocio (~440 arquivos intactos).

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

 bun add elysia @elysiajs/cors @elysiajs/swagger
 bun remove fastify @fastify/cors @fastify/helmet @fastify/multipart @fastify/rate-limit @fastify/request-context
 @fastify/swagger @fastify/swagger-ui @fastify/under-pressure @fastify/mongodb @gquittet/graceful-server

 3.2 src/index.ts — Reescrever completo

 - Criar instancia Elysia com plugins (cors, swagger)
 - Registrar rotas com prefixo /api via .group()
 - Headers de seguranca via onAfterHandle (substitui helmet)
 - Graceful shutdown via process.on("SIGTERM"/"SIGINT")

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

 Trocar request.file() do Fastify por body.file do Elysia (Web API File/Blob). Trocar requestContext.get() por
 store.

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

 3.8 Schemas — Manter JSON Schema existente

 Os controllers ja validam via ValidationComposite. Schemas servem so pro Swagger. Migrar pra Typebox do Elysia
 fica como melhoria futura.

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

 elysia, @elysiajs/cors, @elysiajs/swagger, jose, bun-types

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
 - import { jest } from "@jest/globals"  →  import { describe, it, expect, beforeAll, afterAll, beforeEach,
 afterEach, mock, spyOn } from "bun:test"
 - jest.fn()                             →  mock(() => {})
 - jest.fn().mockResolvedValue(x)        →  mock(() => Promise.resolve(x))
 - jest.mock("mod", ...)                 →  mock.module("mod", ...)

 5.3 Testes de integracao (*.test.ts nos routers)

 Trocar fastify.inject() por app.handle(new Request(...)) do Elysia.

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

 1. Fase 1: bun run src/index.ts — servidor inicia (ainda com Fastify)
 2. Fase 2: Testar login/signup com hashes existentes no banco
 3. Fase 3: Testar todos endpoints — health, auth (signup/login), CRUD autenticado, upload
 4. Fase 5: bun test — todos os 181 testes passam

 Ordem de execucao recomendada

 Fase 3 (framework) primeiro, ja que e a maior mudanca e as outras dependem dela. Fases 1 e 2 sao pre-requisitos.
 Fase 4 e 5 sao cleanup.

 Sequencia: 1 → 2 → 3 → 4 (cleanup) → 5 (testes)
