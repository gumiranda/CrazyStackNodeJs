export const userHandler = (fastify: any) => async (request: any, reply: any) => {
  const userInserted = await fastify.mongo.db.collection("test").insertOne(request.body);
  reply.send(userInserted);
};
