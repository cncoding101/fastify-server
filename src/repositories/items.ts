import items from "@/data/items.json";
import { itemEntity } from "@/entities";

const find = () => {
  return items.map((item) => itemEntity.outgoing(item));
};

const findById = (id: number) => {
  const item = items.find((item) => item.id == id);

  return item ? itemEntity.outgoing(item) : null;
};

export { find, findById };
