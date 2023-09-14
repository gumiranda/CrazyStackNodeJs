async function chatRouter(fastify: any, options: any) {
  fastify.get("/chat", { websocket: true }, function wsHandler(connection: any, req: any) {
    // bound to fastify server

    connection.socket.on("message", async (message: any) => {
      try {
        const payload = JSON.parse(message.toString());
        console.log({ payload });
        if (payload.route_id && payload.lat && payload.lng) {
          broadcast(payload, fastify);
          connection.socket.send("Message processed successfully");
        } else {
          connection.socket.send("Invalid payload");
        }
      } catch (error) {
        console.error("Error processing message:", error);
        connection.socket.send("Error processing message");
      }
    });
  });
}

function broadcast(message: any, fastify: any) {
  for (const client of fastify.websocketServer.clients) {
    client.send(JSON.stringify(message));
  }
}
