import { Static, Type } from "@sinclair/typebox";

export enum Lang {
  DE = "DE",
  SWE = "SWE",
  ENG = "ENG",
}

const translation = Type.Object({
  lang: Type.Optional(
    Type.Object({
      from: Type.Enum(Lang),
      to: Type.Enum(Lang),
    })
  ),
  text: Type.String(),
});

export const postSchema = {
  body: translation,
  response: {
    200: Type.Object({
      message: Type.String(),
      data: Type.Optional(translation),
    }),
  },
};

export const getLangSchema = {
  response: {
    200: Type.Object({
      message: Type.String(),
      data: Type.Array(Type.Enum(Lang)),
    }),
  },
};

export type Translation = Static<typeof translation>;
