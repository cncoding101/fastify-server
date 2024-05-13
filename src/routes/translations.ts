import { FastifyPluginCallback } from "fastify";

const routes: FastifyPluginCallback = (server, options, done) => {
  server.post("/", async (req, res) => {
    return {};
  });

  done();
};

export default routes;
