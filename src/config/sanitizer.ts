import "dotenv/config";
import Ajv from "ajv";
import envSchema from "env-schema";

type Env = {
  [K in keyof typeof schema.properties]: (typeof schema.properties)[K]["type"] extends "string"
    ? string
    : number;
};

const ajv = new Ajv({
  allErrors: true,
  removeAdditional: true,
  useDefaults: true,
  coerceTypes: true,
  allowUnionTypes: true,
});

const schema = {
  type: "object",
  properties: {
    OPEN_AI: { type: "string" },
    PORT: { type: "number" },
  },
  required: ["OPEN_AI"],
} as const;

const config = envSchema<Env>({
  schema,
  dotenv: true,
  ajv,
});

export default config;
