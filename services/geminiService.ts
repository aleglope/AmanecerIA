import { GoogleGenAI, Chat } from "@google/genai";
import { Focus, NotificationPreferences } from "../types";
import type { Language } from "../context/LanguageContext";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const model = "gemini-2.5-flash";

const getSystemInstruction = (
  lang: Language,
  prefs?: NotificationPreferences
) => {
  const baseInstructions = {
    es: `Eres "AmanecerIA", una IA de apoyo emocional compasiva y sabia. Tu propósito es entregar un mensaje matutino breve, accionable y empático basado en los principios de la Terapia Cognitivo-Conductual (TCC) y la Psicología Positiva.`,
    en: `You are "AmanecerIA", a compassionate and wise emotional support AI. Your purpose is to deliver a brief, actionable, and empathetic morning message based on Cognitive Behavioral Therapy (CBT) and Positive Psychology principles.`,
  };

  let instruction = baseInstructions[lang];

  if (prefs) {
    if (lang === "es") {
      instruction += `\n\nPREFERENCIAS DEL USUARIO:\n- Tono: ${
        prefs.tone || "Amable"
      }\n- Longitud: ${prefs.length || "Medio"}`;
      if (prefs.tone === "Directo")
        instruction += `\nSé directo y al grano. Evita rodeos.`;
      if (prefs.tone === "Motivador")
        instruction += `\nUsa un tono enérgico y empoderador.`;
      if (prefs.length === "Corto")
        instruction += `\nSé muy conciso (máximo 30 palabras).`;
      if (prefs.length === "Detallado")
        instruction += `\nPuedes extenderte un poco más (hasta 100 palabras) para explicar el concepto.`;
    } else {
      instruction += `\n\nUSER PREFERENCES:\n- Tone: ${
        prefs.tone || "Friendly"
      }\n- Length: ${prefs.length || "Medium"}`;
      if (prefs.tone === "Directo")
        instruction += `\nBe direct and straight to the point. Avoid fluff.`; // Mapping Spanish enum to instruction
      if (prefs.tone === "Motivador")
        instruction += `\nUse an energetic and empowering tone.`;
      if (prefs.length === "Corto")
        instruction += `\nBe very concise (max 30 words).`;
      if (prefs.length === "Detallado")
        instruction += `\nYou can be more detailed (up to 100 words) to explain the concept.`;
    }
  } else {
    // Default behavior if no prefs
    if (lang === "es")
      instruction += ` Tu tono debe ser cálido, profesional y alentador. Tu mensaje debe ser conciso (máximo 60-70 palabras).`;
    else
      instruction += ` Your tone should be warm, professional, and encouraging. Your message should be concise (60-70 words max).`;
  }

  if (lang === "es")
    instruction += ` No des consejos médicos ni actúes como un terapeuta. Ayuda al usuario a reencuadrar positivamente su día. No uses emojis. No te presentes en cada mensaje.`;
  else
    instruction += ` Do not give medical advice or act as a therapist. Help the user positively reframe their day. Do not use emojis. Do not introduce yourself in every message.`;

  return instruction;
};

const chatSystemInstruction = {
  es: `Eres "AmanecerIA", una IA de apoyo emocional compasiva y sabia en modo conversacional premium. Tu propósito es ser un compañero de chat que ayude al usuario a explorar sus sentimientos, basado en los principios de la Terapia Cognitivo-Conductual (TCC) y la Psicología Positiva. Tu tono debe ser cálido, profesional y alentador. Recuerda el enfoque del usuario y sus estados de ánimo recientes para personalizar la conversación. Haz preguntas abiertas para fomentar la reflexión. No des consejos médicos ni actúes como un terapeuta. Sé conciso y empático. No uses emojis.`,
  en: `You are "AmanecerIA", a compassionate and wise emotional support AI in premium conversational mode. Your purpose is to be a chat companion that helps the user explore their feelings, based on Cognitive Behavioral Therapy (CBT) and Positive Psychology principles. Your tone should be warm, professional, and encouraging. Remember the user's focus and recent moods to personalize the conversation. Ask open-ended questions to encourage reflection. Do not give medical advice or act as a therapist. Be concise and empathetic. Do not use emojis.`,
};

export async function generateMorningMessage(
  prompt: string,
  lang: Language,
  prefs?: NotificationPreferences
): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: getSystemInstruction(lang, prefs),
        temperature: 0.8,
        topP: 0.9,
      },
    });

    return response.text.trim();
  } catch (error) {
    console.error("Error generating message from Gemini API:", error);
    if (lang === "es") {
      return "Lo siento, ha ocurrido un error al generar tu mensaje. Por favor, inténtalo de nuevo más tarde.";
    }
    return "Sorry, an error occurred while generating your message. Please try again later.";
  }
}

export async function generateDashboardMessage(
  prompt: string,
  lang: Language,
  prefs?: NotificationPreferences
): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: getSystemInstruction(lang, prefs),
        temperature: 0.8,
        topP: 0.9,
      },
    });

    return response.text.trim();
  } catch (error) {
    console.error("Error generating dashboard message from Gemini API:", error);
    if (lang === "es") {
      return "Lo siento, no pudimos generar tu mensaje personalizado en este momento. Inténtalo de nuevo más tarde.";
    }
    return "Sorry, we couldn't generate your personalized message right now. Please try again later.";
  }
}

export async function generateMoodReaction(
  mood: string,
  focus: string,
  lang: Language,
  prefs?: NotificationPreferences
): Promise<string> {
  const prompt =
    lang === "es"
      ? `El usuario acaba de registrar que se siente: "${mood}". Su enfoque general es: "${focus}". Dame un mensaje muy breve (1-2 frases) de apoyo inmediato validando su emoción.`
      : `The user just logged that they feel: "${mood}". Their general focus is: "${focus}". Give me a very brief (1-2 sentences) immediate support message validating their emotion.`;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: getSystemInstruction(lang, prefs),
        temperature: 0.7, // Slightly lower temperature for more focused reactions
        topP: 0.8,
      },
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error generating mood reaction:", error);
    return ""; // Return empty string to fallback or ignore
  }
}

export async function startChat(
  initialContext: string,
  lang: Language
): Promise<Chat> {
  try {
    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: `${chatSystemInstruction[lang]}\n\nUSER CONTEXT:\n${initialContext}`,
        temperature: 0.8,
        topP: 0.9,
      },
    });
    return chat;
  } catch (error) {
    console.error("Error starting chat from Gemini API:", error);
    throw error;
  }
}
