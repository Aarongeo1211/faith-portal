import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_API_KEY } from '../config/config';
import { Religion } from '../types';

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export async function getFaithResponse(prompt: string, religion: Religion): Promise<string> {
  if (!prompt?.trim()) {
    throw new Error('Prompt is required');
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const context = `You are a knowledgeable and respectful expert on ${religion}. 
                    Provide accurate, culturally sensitive information. 
                    Keep responses concise and informative.`;
    
    const result = await model.generateContent(`${context}\n\nQuestion: ${prompt}`);
    const response = result.response;
    return response.text() || 'I apologize, but I could not generate a response at this time.';
  } catch (error) {
    console.error('Error getting Gemini response:', error);
    throw new Error('Failed to get AI response. Please try again later.');
  }
}