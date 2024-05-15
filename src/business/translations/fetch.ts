import { openAiService } from "@/services";
import { Translation } from "@/schemas/translations";

export default async (translation: Translation) => {
  const result = await openAiService.post(translation);
  if (!result)
    return {
      statusCode: 400,
      message: "Failed to translate text",
    };

  return {
    statusCode: 200,
    message: "Successfully translated the text",
    data: result,
  };
};
