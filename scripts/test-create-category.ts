/**
 * Script para testar o endpoint POST /api/category/add
 *
 * Uso: bun run scripts/test-create-category.ts
 *
 * Pré-requisitos: Servidor rodando (bun run dev)
 */

const BASE_URL = "http://localhost:3333/api";

const signupPayload = {
  email: "test.categoria@gmail.com",
  name: "Teste Categoria",
  role: "admin",
  password: "123456",
  passwordConfirmation: "123456",
  coord: { type: "Point", coordinates: [-46.693419, -23.568704] },
};

const loginPayload = {
  email: "test-categoria@test.com",
  password: "123456",
  passwordConfirmation: "123456",
};

async function testCreateCategory() {
  console.log("=== Teste: Criar Categoria ===\n");

  // 1. Signup (ignora se usuário já existir)
  console.log("1. Criando usuário (signup)...");
  const signupRes = await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(signupPayload),
  });
  if (signupRes.ok) {
    console.log("   Usuário criado.");
  } else {
    const err = await signupRes.json().catch(() => ({}));
    if (err?.mensagem?.includes?.("already in use") || signupRes.status === 409) {
      console.log("   Usuário já existe, continuando...");
    } else {
      console.error("❌ Signup falhou:", signupRes.status, err);
      return;
    }
  }

  // 2. Login
  console.log("\n2. Fazendo login...");
  const loginRes = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginPayload),
  });

  if (!loginRes.ok) {
    const err = await loginRes.json().catch(() => ({}));
    console.error("❌ Login falhou:", loginRes.status, err);
    return;
  }

  const { accessToken } = await loginRes.json();
  console.log("✅ Login OK, token obtido\n");

  // 2. Criar categoria
  const categoryPayload = { name: "Categoria Teste" };
  console.log("2. Criando categoria:", categoryPayload);

  const createRes = await fetch(`${BASE_URL}/category/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(categoryPayload),
  });

  const body = await createRes.json().catch(() => ({}));

  if (createRes.ok) {
    console.log("✅ Categoria criada com sucesso!");
    console.log("   Resposta:", JSON.stringify(body, null, 2));
  } else {
    console.log("❌ Erro ao criar categoria:", createRes.status, body);
  }
}

testCreateCategory().catch(console.error);
