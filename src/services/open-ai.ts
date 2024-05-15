import OpenAI from "openai";
import sanitizedEnv from "@/config/sanitizer";
import { Translation } from "@/schemas/translations";
import { translationEntity, openAiEntity } from "@/entities";

const openai = new OpenAI({ apiKey: sanitizedEnv.OPEN_AI });

const post = async (translation: Translation) => {
  const { content } = openAiEntity.outgoing(translation);
  const result = await openai.chat.completions.create({
    messages: [{ role: "user", content }],
    model: "gpt-3.5-turbo",
  });

  return result ? translationEntity.outgoing(result) : null;
};

export { post };
