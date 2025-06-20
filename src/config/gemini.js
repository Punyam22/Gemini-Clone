import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyDZwJ_RvfO6mqfaA-hlE06AzlnSIT1g39g";

const genAI = new GoogleGenerativeAI(API_KEY);

async function runChat(prompt) {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      temperature: 0.7,
      topK: 1,
      topP: 1,
      maxOutputTokens: 1024,
    },
  });

  const result = await model.generateContentStream([prompt]);
    
  let fullResponse = "";

  for await (const chunk of result.stream) {
    const chunkText = await chunk.text();
    fullResponse += chunkText;
  }

  return fullResponse;
}

export default runChat;
