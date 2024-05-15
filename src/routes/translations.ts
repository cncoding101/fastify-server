import { FastifyPluginCallback } from "fastify";
import { translationController } from "@/controllers";
import { postSchema, getLangSchema } from "@/schemas/translations";

const routes: FastifyPluginCallback = (server, options, done) => {
  server.post("/", { schema: postSchema }, translationController.post);
  server.get(
    "/languages",
    { schema: getLangSchema },
    translationController.getLang
  );

  done();
};

export default routes;
