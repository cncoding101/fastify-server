import { itemRepository } from "@/repositories";

export default async (id: number) => {
  const result = await itemRepository.findById(id);
  if (!result)
    return {
      statusCode: 400,
      message: "Failed to fetch item",
    };

  return {
    statusCode: 200,
    message: "Successfully fetched item",
    data: result,
  };
};
