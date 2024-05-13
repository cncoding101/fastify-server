import fastify from "fastify";
import cors from "@fastify/cors";
import translationRoutes from "./routes/translations";
import itemRoutes from "./routes/items";
import path from "path";

const server = fastify({ logger: true });

server.register(cors);
server.register(import("@fastify/static"), {
  root: path.join(__dirname, path.join("static")),
  prefix: "/static/",
});

server.register(itemRoutes, { prefix: "/items" });
server.register(translationRoutes, { prefix: "/translations" });

server.get("/ping", async () => {
  return "pong\n";
});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server listening at ${address}`);
});
