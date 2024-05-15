import { Translation } from "@/schemas/translations";

const LANGUAGES = {
  ENG: "english",
  SWE: "swedish",
  DE: "german",
} as const;

const outgoing = (data: Translation) => {
  const { lang, text } = data;

  return Object.freeze({
    content: `Translate the following sentence from ${
      LANGUAGES[lang.from] ?? LANGUAGES.ENG
    } to ${LANGUAGES[lang.to] ?? LANGUAGES.ENG}: ${text}`,
  });
};

export { outgoing };
