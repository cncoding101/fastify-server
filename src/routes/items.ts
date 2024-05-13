import { FastifyPluginCallback } from "fastify";
import items from "../data/items.json";
import { ItemType } from "../schemas/items";

const routes: FastifyPluginCallback = (server, options, done) => {
  server.get("/items", async (req, res) => {
    return items;
  });

  server.get<{ Params: { id: number }; Reply: ItemType | null }>(
    "/:id",
    async (req, res) => {
      const { id } = req.params;

      const item = items.find((x) => x.id == id);

      return item ?? null;
    }
  );

  done();
};

export default routes;
