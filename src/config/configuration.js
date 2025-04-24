import dotenv from "dotenv";
import path from "path";
import Joi from "joi";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../../.env") });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("production", "development", "test")
      .required(),
    PORT: Joi.number().default(8080).description("Port number"),
    ANTHROPIC_KEY: Joi.string().required().description("Anthropic Key"),
    SUPABASE_PUBLIC_KEY: Joi.string()
      .required()
      .description("Supabase Public Key"),
    SUPABASE_URL: Joi.string().required().description("Supabase URL"),
    JWT_SECRET: Joi.string().required().description("JWT Secret"),
    MODEL_NAME: Joi.string()
      .default("claude-3-5-haiku-20241022")
      .description("Model Name"),
  })
  .unknown(true);

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  anthropicKey: envVars.ANTHROPIC_KEY,
  supabaseUrl: envVars.SUPABASE_URL,
  supabaseKey: envVars.SUPABASE_PUBLIC_KEY,
  jwtSecret: envVars.JWT_SECRET,
  model_name: envVars.MODEL_NAME,
};

export default config;
