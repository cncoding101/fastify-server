import { handleServerError } from "@/utils/constants/error";
import { itemBusiness } from "@/business";
import {
  FastifyReplyTypebox,
  FastifyRequestTypebox,
} from "@/utils/types/typebox";
import { getByIdSchema, getSchema } from "@/schemas/items";

const get = async (
  req: FastifyRequestTypebox<typeof getSchema>,
  res: FastifyReplyTypebox<typeof getSchema>
) => {
  try {
    const { statusCode, message, data } = await itemBusiness.fetch();
    if (!data) res.status(statusCode).send({ message });

    res.status(statusCode).send({ message, data });
  } catch (err) {
    handleServerError(res, err);
  }
};

const getById = async (
  req: FastifyRequestTypebox<typeof getByIdSchema>,
  res: FastifyReplyTypebox<typeof getByIdSchema>
) => {
  try {
    const { id } = req.params;

    const { statusCode, message, data } = await itemBusiness.fetchById(id);
    if (!data) res.status(statusCode).send({ message });

    res.status(statusCode).send({ message, data });
  } catch (err) {
    handleServerError(res, err);
  }
};

export { get, getById };
