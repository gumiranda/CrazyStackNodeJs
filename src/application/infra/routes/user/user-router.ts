async function user(fastify: any, options: any) {
  const bodyJsonSchema = {
    type: "object",
    required: ["requiredKey"],
    properties: {
      someKey: { type: "string" },
      someOtherKey: { type: "number" },
      requiredKey: {
        type: "array",
        maxItems: 3,
        items: { type: "integer" },
      },
      nullableKey: { type: ["number", "null"] }, // or { type: 'number', nullable: true }
      multipleTypesKey: { type: ["boolean", "number"] },
      multipleRestrictedTypesKey: {
        oneOf: [
          { type: "string", maxLength: 5 },
          { type: "number", minimum: 10 },
        ],
      },
      enumKey: {
        type: "string",
        enum: ["John", "Foo"],
      },
      notTypeKey: {
        not: { type: "array" },
      },
    },
  };
  const queryStringJsonSchema = {
    type: "object",
    properties: {
      ids: {
        type: "array",
        default: [],
      },
    },
  };
  const paramsJsonSchema = {
    type: "object",
    properties: {
      par1: { type: "string" },
      par2: { type: "number" },
    },
  };

  const headersJsonSchema = {
    type: "object",
    properties: {
      test: { type: "string" },
    },
    required: ["test"],
  };

  const opts = {
    schema: {
      querystring: queryStringJsonSchema,
      body: bodyJsonSchema,
      params: paramsJsonSchema,
      headers: headersJsonSchema,
      response: {
        200: {
          type: "object",
          properties: {
            acknowledged: { type: "boolean" },
            insertedId: { type: "string" },
          },
        },
      },
    },
  };
  fastify.post("/user", opts, async (request: any, reply: any) => {
    const userInserted = await fastify.mongo.db.collection("test").insertOne(request.body);
    reply.send(userInserted);
  });
  fastify.get("/user/:id", async (request: any, reply: any) => {
    // Or this.mongo.client.db('mydb').collection('users')
    const users = await fastify.mongo.db.collection("test");

    // if the id is an ObjectId format, you need to create a new ObjectId
    const _id = fastify.mongo.ObjectId(request.params.id);
    const user = await users.findOne({ _id });
    reply.send(user);
  });
  fastify.get("/users", async (request: any, reply: any) => {
    // Or this.mongo.client.db('mydb').collection('users')
    const users = await fastify.mongo.db.collection("test").find({}).toArray();
    reply.send(users);
  });
}
export { user };
