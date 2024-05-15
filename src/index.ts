import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import path from "path";
import santizedEnv from "@/config/sanitizer";
import translationRoutes from "./routes/translations";
import itemRoutes from "./routes/items";

const port = santizedEnv.PORT || 8080;

const startServer = async () => {
  try {
    const server = fastify({
      logger: true,
    }).withTypeProvider<TypeBoxTypeProvider>();
    server.register(cors);
    server.register(helmet, { crossOriginResourcePolicy: false });
    server.register(import("@fastify/swagger"));
    server.register(import("@fastify/swagger-ui"), {
      routePrefix: "/documentation",
      uiConfig: {
        docExpansion: "full",
        deepLinking: false,
      },
      uiHooks: {
        onRequest: function (request, reply, next) {
          next();
        },
        preHandler: function (request, reply, next) {
          next();
        },
      },
      staticCSP: true,
      transformStaticCSP: (header) => header,
      transformSpecification: (swaggerObject, request, reply) => {
        return swaggerObject;
      },
      transformSpecificationClone: true,
    });
    server.register(import("@fastify/static"), {
      root: path.join(__dirname, path.join("static")),
      prefix: "/static/",
    });

    server.register(itemRoutes, { prefix: "/items" });
    server.register(translationRoutes, { prefix: "/translations" });
    server.setErrorHandler((error, request, reply) => {
      server.log.error(error);
    });

    server.get("/ping", async () => {
      return "pong\n";
    });

    await server.listen({ port });
    server.swagger();
  } catch (err) {
    console.error(err);
  }
};

process.on("unhandledRejection", (e) => {
  console.error(e);
  process.exit(1);
});

startServer();
