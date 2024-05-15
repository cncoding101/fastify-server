import { Static, Type } from "@sinclair/typebox";

const item = Type.Object({
  id: Type.Number(),
  itemName: Type.String(),
  description: Type.Optional(Type.String()),
});

export const getSchema = {
  response: {
    200: Type.Object({
      message: Type.String(),
      data: Type.Optional(Type.Array(item)),
    }),
  },
};

export const getByIdSchema = {
  params: Type.Object({
    id: Type.Number(),
  }),
  response: {
    200: Type.Object({
      message: Type.String(),
      data: Type.Optional(item),
    }),
  },
};

export type Item = Static<typeof item>;
