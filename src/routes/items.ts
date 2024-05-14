import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { itemController } from "@/controllers";
import { getByIdSchema, getSchema } from "@/schemas/items";

const routes: FastifyPluginAsyncTypebox = async (server, options) => {
  server.get("/", { schema: getSchema }, itemController.get);
  server.get("/:id", { schema: getByIdSchema }, itemController.getById);
};

export default routes;
