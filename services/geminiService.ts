
import { GoogleGenAI } from "@google/genai";
import { Mood, Focus } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const model = 'gemini-2.5-flash';

const systemInstruction = `Eres "AmanecerIA", una IA de apoyo emocional compasiva y sabia. Tu propósito es entregar un mensaje matutino breve, accionable y empático basado en los principios de la Terapia Cognitivo-Conductual (TCC) y la Psicología Positiva. Tu tono debe ser cálido, profesional y alentador, nunca clínico o robótico. No des consejos médicos ni actúes como un terapeuta. Tu mensaje debe ser conciso (máximo 60-70 palabras) y ayudar al usuario a reencuadrar positivamente su día. No uses emojis. No te presentes en cada mensaje. Ve directo al punto.`;

export async function generateMorningMessage(mood: Mood, context: string): Promise<string> {
  let userPrompt = `El usuario se ha despertado sintiéndose: "${mood}".`;
  if (context) {
    userPrompt += ` Proporcionó este contexto adicional: "${context}".`;
  }
  userPrompt += ` Basado en esto, genera un mensaje de apoyo y reencuadre para empezar el día.`;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.8,
        topP: 0.9,
      }
    });
    
    return response.text.trim();
  } catch (error) {
    console.error("Error generating message from Gemini API:", error);
    return "Lo siento, ha ocurrido un error al generar tu mensaje. Por favor, inténtalo de nuevo más tarde.";
  }
}

export async function generateDashboardMessage(focus: Focus): Promise<string> {
  const userPrompt = `El enfoque principal del usuario para hoy es "${focus}". Genera un mensaje inspirador y accionable que aborde directamente este enfoque para ayudarle a empezar bien el día.`;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.8,
        topP: 0.9,
      }
    });
    
    return response.text.trim();
  } catch (error) {
    console.error("Error generating dashboard message from Gemini API:", error);
    return "Lo siento, no pudimos generar tu mensaje personalizado en este momento. Inténtalo de nuevo más tarde.";
  }
}