import { handleServerError } from "@/utils/constants/error";
import { translationBusiness } from "@/business";
import {
  FastifyReplyTypebox,
  FastifyRequestTypebox,
} from "@/utils/types/typebox";
import { Lang, getLangSchema, postSchema } from "@/schemas/translations";
import { enumValues } from "@/utils/helpers";

const post = async (
  req: FastifyRequestTypebox<typeof postSchema>,
  res: FastifyReplyTypebox<typeof postSchema>
) => {
  try {
    const { statusCode, message, data } = await translationBusiness.fetch(
      req.body
    );
    if (!data) res.status(statusCode).send({ message });

    res.status(statusCode).send({ message, data });
  } catch (err) {
    handleServerError(res, err);
  }
};

const getLang = async (
  req: FastifyRequestTypebox<typeof getLangSchema>,
  res: FastifyReplyTypebox<typeof getLangSchema>
) => {
  res.status(200).send({
    message: "Successfully fetched languages",
    data: enumValues<Lang>(Lang),
  });
};

export { post, getLang };
