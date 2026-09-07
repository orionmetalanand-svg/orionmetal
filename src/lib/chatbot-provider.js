import { getChatbotResponse } from "@/lib/chatbot-knowledge";

/**
 * Chatbot provider abstraction.
 * Replace `getReply` implementation to connect RAG, Gemini, OpenAI, or company documents.
 */
export const chatbotProvider = {
  name: "knowledge-base",

  async getReply(message) {
    return getChatbotResponse(message);
  },
};
