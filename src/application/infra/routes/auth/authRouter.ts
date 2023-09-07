import { signupAdapter, loginAdapter } from "./authAdapter";
import { signupPostSchema, loginPostSchema } from "./authSchema";

async function auth(fastify: any, options: any) {
  fastify.post("/auth/signup", signupPostSchema, signupAdapter());
  fastify.post("/auth/login", loginPostSchema, loginAdapter());
  fastify.get(
    "/socket",
    { websocket: true },
    function wsHandler(connection: any, req: any) {
      // bound to fastify server

      connection.socket.on("message", (message: any) => {
        // message.toString() === 'hi from client'
        console.log(message.toString());
        connection.socket.send("hi from server");
      });
    }
  );
}
export { auth };
