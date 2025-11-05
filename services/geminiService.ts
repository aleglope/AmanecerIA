import { GoogleGenAI, Chat } from "@google/genai";
import { Focus } from '../types';
import type { Language } from '../context/LanguageContext';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const model = 'gemini-2.5-flash';

const systemInstructions = {
  es: `Eres "AmanecerIA", una IA de apoyo emocional compasiva y sabia. Tu propósito es entregar un mensaje matutino breve, accionable y empático basado en los principios de la Terapia Cognitivo-Conductual (TCC) y la Psicología Positiva. Tu tono debe ser cálido, profesional y alentador, nunca clínico o robótico. No des consejos médicos ni actúes como un terapeuta. Tu mensaje debe ser conciso (máximo 60-70 palabras) y ayudar al usuario a reencuadrar positivamente su día. No uses emojis. No te presentes en cada mensaje. Ve directo al punto.`,
  en: `You are "AmanecerIA", a compassionate and wise emotional support AI. Your purpose is to deliver a brief, actionable, and empathetic morning message based on Cognitive Behavioral Therapy (CBT) and Positive Psychology principles. Your tone should be warm, professional, and encouraging, never clinical or robotic. Do not give medical advice or act as a therapist. Your message should be concise (60-70 words max) and help the user positively reframe their day. Do not use emojis. Do not introduce yourself in every message. Get straight to the point.`
};

const chatSystemInstruction = {
  es: `Eres "AmanecerIA", una IA de apoyo emocional compasiva y sabia en modo conversacional premium. Tu propósito es ser un compañero de chat que ayude al usuario a explorar sus sentimientos, basado en los principios de la Terapia Cognitivo-Conductual (TCC) y la Psicología Positiva. Tu tono debe ser cálido, profesional y alentador. Recuerda el enfoque del usuario y sus estados de ánimo recientes para personalizar la conversación. Haz preguntas abiertas para fomentar la reflexión. No des consejos médicos ni actúes como un terapeuta. Sé conciso y empático. No uses emojis.`,
  en: `You are "AmanecerIA", a compassionate and wise emotional support AI in premium conversational mode. Your purpose is to be a chat companion that helps the user explore their feelings, based on Cognitive Behavioral Therapy (CBT) and Positive Psychology principles. Your tone should be warm, professional, and encouraging. Remember the user's focus and recent moods to personalize the conversation. Ask open-ended questions to encourage reflection. Do not give medical advice or act as a therapist. Be concise and empathetic. Do not use emojis.`
};


export async function generateMorningMessage(prompt: string, lang: Language): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: systemInstructions[lang],
        temperature: 0.8,
        topP: 0.9,
      }
    });
    
    return response.text.trim();
  } catch (error) {
    console.error("Error generating message from Gemini API:", error);
    if (lang === 'es') {
      return "Lo siento, ha ocurrido un error al generar tu mensaje. Por favor, inténtalo de nuevo más tarde.";
    }
    return "Sorry, an error occurred while generating your message. Please try again later.";
  }
}

export async function generateDashboardMessage(prompt: string, lang: Language): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: systemInstructions[lang],
        temperature: 0.8,
        topP: 0.9,
      }
    });
    
    return response.text.trim();
  } catch (error) {
    console.error("Error generating dashboard message from Gemini API:", error);
    if (lang === 'es') {
      return "Lo siento, no pudimos generar tu mensaje personalizado en este momento. Inténtalo de nuevo más tarde.";
    }
    return "Sorry, we couldn't generate your personalized message right now. Please try again later.";
  }
}

export async function startChat(initialContext: string, lang: Language): Promise<Chat> {
  try {
    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: `${chatSystemInstruction[lang]}\n\nUSER CONTEXT:\n${initialContext}`,
        temperature: 0.8,
        topP: 0.9,
      }
    });
    return chat;
  } catch (error) {
    console.error("Error starting chat from Gemini API:", error);
    throw error;
  }
}
