'use server';
import Groq from 'groq-sdk';
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});
export async function generateChatResponse(chatMessage) {
  console.log(chatMessage);
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [...chatMessage],
      model: 'llama3-8b-8192'
    });
    // Print the completion returned by the LLM.
    const tokens = chatCompletion.usage.total_tokens;
    return {
      message: {
        role: 'system',
        content: chatCompletion.choices[0]?.message?.content
      },
      tokens: tokens
    };
  } catch (error) {
    return null;
  }
}
