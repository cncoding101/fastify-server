import { Static, Type } from "@sinclair/typebox";

export const Item = Type.Object({
  id: Type.Number(),
  name: Type.String(),
});

export type ItemType = Static<typeof Item>;
