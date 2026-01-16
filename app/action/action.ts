"use server";

import { openrouter } from "@/lib/openrouter";
import { generateText } from "ai";
import { log } from "console";

export async function generateProjectName(prompt: string) {
  try {
    const { text } = await generateText({
      model: openrouter.chat("google/gemini-2.5-flash-lite"),
      system: `You are an AI assistant that generated very very short project names based on the user's prompt. 
            -Keep it under words appropriately.
            -Capitalize the words appropriately.
            -Do not include special characters.`,
      prompt: prompt,
    });
    return text?.trim() || "Untitled Project";
  } catch (error) {
    console.log(error);
    return "Untitled Project";
  }
}
