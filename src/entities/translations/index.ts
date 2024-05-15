import openai from "openai";
import { Translation } from "@/schemas/translations";

const outgoing = (data: openai.ChatCompletion): Translation => {
  const { choices } = data;

  return Object.freeze({
    text: choices[0].message.content,
  });
};

export { outgoing };
