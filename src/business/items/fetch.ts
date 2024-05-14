import { itemRepository } from "@/repositories";

export default async () => {
  const result = await itemRepository.find();
  if (!result)
    return {
      statusCode: 400,
      message: "Failed to fetch items",
    };

  return {
    statusCode: 200,
    message: "Successfully fetched items",
    data: result,
  };
};
