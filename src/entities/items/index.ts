import { Item } from "@/schemas/items";

export interface IData {
  id: number;
  name: string;
  description?: string;
}

export type IOutgoing = Omit<IData, "id">;

const outgoing = (data: IData): Item => {
  const { id, name, description } = data;

  return Object.freeze({ id, itemName: name, description });
};

export { outgoing };
