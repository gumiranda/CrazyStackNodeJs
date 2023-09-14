/* eslint-disable @typescript-eslint/no-explicit-any */
import { signupAdapter, loginAdapter } from "./authAdapter";
import { signupPostSchema, loginPostSchema } from "./authSchema";
/*
fastify.addHook('preValidation', async (request, reply) => {
  // check if the request is authenticated
  if (!request.isAuthenticated()) {
    await reply.code(401).send("not authenticated");
  }
})
*/
async function auth(fastify: any, options: any) {
  fastify.post("/auth/signup", signupPostSchema, signupAdapter());
  fastify.post("/auth/login", loginPostSchema, loginAdapter());
  fastify.get(
    "/socket",
    { websocket: true },
    function wsHandler(connection: any, req: any) {
      // bound to fastify server

      connection.socket.on("message", async (message: any) => {
        try {
          const payload = JSON.parse(message.toString());
          console.log({ payload });
          if (payload.route_id && payload.lat && payload.lng) {
            // Assuming this.newPointsQueue and this.routesDriverService are available in your scope
            broadcast(payload, fastify);
            //await this.newPointsQueue.add(payload, { attempts: 1 });
            //await this.routesDriverService.createOrUpdate(payload);

            // You can send a response back to the client if needed
            connection.socket.send("Message processed successfully");
          } else {
            connection.socket.send("Invalid payload");
          }
        } catch (error) {
          console.error("Error processing message:", error);
          connection.socket.send("Error processing message");
        }
      });
    }
  );
}
export { auth };

function broadcast(message: any, fastify: any) {
  for (const client of fastify.websocketServer.clients) {
    client.send(JSON.stringify(message));
  }
}
