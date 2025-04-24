import { createClient } from "@supabase/supabase-js";
import config from "./configuration.js";
import { Anthropic } from "@anthropic-ai/sdk";

export const supabase = createClient(config.supabaseUrl, config.supabaseKey);

export const anthropic = new Anthropic({
  apiKey: config.anthropicKey,
  maxRetries: 3,
});
