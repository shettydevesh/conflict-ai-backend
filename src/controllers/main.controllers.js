import { anthropic, supabase } from "../config/database.js";
import config from "../config/configuration.js";
import asyncHandler from "express-async-handler";
import logger from "../config/logger.js";
import { conversation_system_prompt } from "../constants/prompts.js";
import { calculateCost, extractOutput } from "../utils/functions.js";

export const singleChat = asyncHandler(async (req, res) => {
  try {
    const { uuid, question } = req.authData;
    let chat = "",
      isConvo = false;
    if (!question) {
      if (!req.files) {
        return res.status(400).send({
          id: 0,
          message: "No input found",
        });
      } else {
        const file = req.files.file;
        const buffer = file.data;
        chat = buffer.toString("utf8");
        isConvo = true;
      }
    } else {
      chat = question;
    }
    const system_prompt = `${conversation_system_prompt}
    IMPORTANT VERIFICATION REQUIREMENTS:
    - You MUST maintain this exact language in your response
    - If input is in Hinglish, your output MUST be in Hinglish
    - You MUST preserve the full conversation with the exact number of exchanges
    - Each exchange must maintain similar length to the original
    - You MUST preserve all speaker labels exactly as they appear
    - DO NOT summarize or shorten the conversation

    The input format is: ${isConvo ? "A multi-person conversation" : "A single message"}`;

    const response = await anthropic.messages.create({
      model: config.model_name,
      max_tokens: 1700,
      temperature: 0.1,
      system: system_prompt,
      messages: [
        {
          role: "user",
          content: `Here is the chat/question: ${chat}`,
        },
      ],
    });
    const cost = calculateCost(response.usage);
    logger.info(`Cost of the request: Rs.${cost}`);
    const cleaned_response = extractOutput(response.content[0].text);
    const thinking = cleaned_response[0],
      output = cleaned_response[1],
      analysis = cleaned_response[2];
    return res.status(200).send({
      id: 1,
      data: {
        thought_process: thinking,
        output: output,
        analysis: analysis,
      },
    });
  } catch (error) {
    logger.error(error.message);
    return res.status(500).send({
      id: 0,
      message: error.message,
    });
  }
});
