import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

export type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, options?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// In a real app, these would be in separate JSON files and fetched.
// Here, they are embedded for simplicity within this environment.
const translations = {
  es: {
    "header": { "login": "Iniciar Sesión", "register": "Registrarse", "logout": "Salir" },
    "landing": {
      "hero": { "title": "Empieza tu día, no solo lo sobrevivas.", "subtitle": "Recibe cada mañana un mensaje inteligente de apoyo, basado en psicología real, diseñado para tu bienestar emocional.", "cta": "Recibe tu primer mensaje (Gratis)" },
      "problem": { "title": "Las mañanas pueden ser difíciles.", "subtitle": "¿Te despiertas con ansiedad, revisas el móvil y ya te sientes agotado? No estás solo. La primera hora del día define tu estado de ánimo." },
      "solution": {
        "title": "Te presentamos \"AmanecerIA\"",
        "subtitle": "Una PWA ligera que te envía un mensaje positivo y accionable. No es una cita genérica; es un consejo práctico basado en TCC para ayudarte a reencuadrar tu día.",
        "phone": { "iaMessage": "Mensaje de IA", "message": "\"Buen día. Noto que ayer te sentiste 'abrumado'. Hoy, recuerda esto: no tienes que escalar toda la montaña, solo dar el siguiente paso. ¿Cuál es una pequeña cosa que sí puedes controlar en los próximos 10 minutos?\"" },
        "tryit": { "title": "Prueba la IA: ¿Cómo te sientes hoy?", "contextLabel": "Añade un poco de contexto (opcional):", "contextPlaceholder": "Ej: Tengo una presentación importante...", "button": "Generar mi mensaje" },
        "errorSelectMood": "Por favor, selecciona un estado de ánimo.",
        "errorGenerating": "Hubo un problema al generar tu mensaje. Inténtalo de nuevo."
      },
      "features": {
        "one": { "title": "Psicología Real", "text": "Mensajes diseñados por expertos en TCC para un impacto real." },
        "two": { "title": "Registro de Ánimo", "text": "Sigue tu progreso emocional en 30 segundos cada día." },
        "three": { "title": "100% Privado", "text": "Tus datos son tuyos. Usamos encriptación segura para protegerte." }
      },
      "premium": { "title": "¿Listo para profundizar?", "subtitle": "Conviértete en Premium y desbloquea la IA Conversacional. Responde a tu mensaje, explora tus pensamientos y accede a ejercicios guiados de audio y texto.", "cta": "Ver planes Premium" },
      "safety": { "title": "Tu bienestar es nuestra prioridad.", "text": "AmanecerIA es una herramienta de apoyo, no un sustituto de terapia. Si estás en una crisis, por favor contacta a las líneas de ayuda profesionales.", "link": "Encuentra ayuda aquí." },
      "cta": { "title": "Cambia tus mañanas. Cambia tu día.", "subtitle": "Únete gratis y recibe tu primer mensaje mañana.", "button": "Empezar ahora" }
    },
    "moods": { "Ansiedad": "Ansiedad", "Baja Motivación": "Baja Motivación", "Abrumado/a": "Abrumado/a", "Neutral": "Neutral", "Optimista": "Optimista" },
    "focuses": { "Autoestima": "Autoestima", "Ansiedad": "Ansiedad", "Motivación": "Motivación" },
    "moodLabels": { "very_bad": "Muy mal", "neutral": "Neutral", "ok": "Bien", "great": "Genial", "very_good": "Increíble" },
    "footer": { "copyright": "AmanecerIA. Todos los derechos reservados.", "terms": "Términos de Servicio", "privacy": "Política de Privacidad" },
    "crisisModal": { "title": "Ayuda Profesional está Disponible", "text": "Parece que estás pasando por un momento muy difícil. AmaneceIA no es una herramienta para crisis. Por favor, contacta a un profesional. No estás solo/a.", "callButton": "Llamar a Emergencias", "helpLinesButton": "Ver Líneas de Ayuda", "closeButton": "Cerrar" },
    "messageDisplay": { "placeholder": { "title": "Tu mensaje aparecerá aquí", "quote": "\"No tienes que escalar toda la montaña, solo dar el siguiente paso.\"" } },
    "auth": {
      "login": { "title": "Bienvenido/a", "subtitle": "Inicia sesión para continuar.", "button": "Iniciar Sesión", "link": "Inicia sesión" },
      "register": { "title": "Respira. Estamos aquí.", "subtitle": "Crea tu cuenta para empezar.", "button": "Registrarse con Email", "link": "Regístrate" },
      "continueWithGoogle": "Continuar con Google", "orSeparator": "O",
      "nameLabel": "Nombre", "emailLabel": "Email", "passwordLabel": "Contraseña",
      "noAccount": "¿No tienes una cuenta?", "hasAccount": "¿Ya tienes una cuenta?",
      "legal": { "prefix": "Al continuar, aceptas nuestros", "terms": "Términos", "and": "y", "privacy": "Política de Privacidad" },
      "confirmation": { "title": "¡Casi listo!", "message": "Te hemos enviado un correo a <strong>{email}</strong>. Por favor, haz clic en el enlace de confirmación para activar tu cuenta.", "button": "Entendido" },
      "needsConfirmation": { "title": "Confirma tu correo electrónico", "message": "Revisa tu bandeja de entrada y haz clic en el enlace de activación.", "resendButton": "Reenviar correo", "resending": "Enviando..." },
      "resentSuccess": "¡Correo de confirmación reenviado con éxito a <strong>{email}</strong>!",
      "errors": { "missingFields": "Por favor, introduce tu email y contraseña.", "missingFieldsAll": "Por favor, completa todos los campos.", "resendFailed": "Error al reenviar el correo. Inténtalo de nuevo.", "invalidCredentials": "El correo electrónico o la contraseña son incorrectos. Por favor, inténtalo de nuevo.", "generic": "Ha ocurrido un error. Revisa tus datos o inténtalo más tarde." }
    },
    "onboarding": { "step": "Paso 1 de 1", "title": "¿Cuál es el enfoque que más necesitas hoy?", "subtitle": "Puedes cambiar esto cuando quieras.", "button": "Ver mi mensaje de hoy" },
    "dashboard": {
      "hero": { "alt": "Un amanecer sobre un campo brumoso, representando un nuevo día." },
      "profileHeader": { "greeting": "Buenos días, {name}" },
      "messageCard": { "title": "Tu mensaje para hoy", "yourFocus": "Tu Enfoque", "loading": "Generando tu mensaje...", "errorNoFocus": "No se ha establecido un enfoque. Por favor, completa el onboarding.", "errorLoading": "No se pudo cargar tu mensaje. Inténtalo de nuevo.", "editFocusAriaLabel": "Editar enfoque" },
      "moodTracker": { "title": "¿Cómo te sientes ahora?", "subtitle": "Registra tu estado de ánimo.", "success": "Has registrado: {mood}", "error": "No se pudo guardar tu ánimo. Inténtalo de nuevo." },
      "moodHistory": { "title": "Historial de Ánimo", "error": "No se pudo cargar el historial.", "empty": "Aún no has registrado ningún estado de ánimo." },
      "premiumPlaceholder": { "title": "Desbloquea la Conversación", "subtitle": "Responde a tu mensaje, explora tus pensamientos y accede a ejercicios guiados con Premium.", "button": "Saber más" },
      "chatCTA": { "title": "Conversación Abierta", "subtitle": "Tu espacio para hablar. Explora tus pensamientos con tu IA de apoyo personal.", "button": "Empezar a chatear" },
      "notificationBanner": {
        "title": "Recibe tu mensaje cada mañana", "subtitle": "Activa las notificaciones para no perderte tu dosis diaria de positividad.", "button": "Activar",
        "granted": "¡Genial! Las notificaciones están activadas.",
        "deniedTitle": "Has bloqueado las notificaciones.", "deniedSubtitle": "Para recibirlas, debes activarlas en los ajustes de tu navegador."
      }
    },
    "avatar": { "errorFormat": "Formato no válido. Sube un archivo JPG o PNG.", "errorSize": "El archivo es muy grande. El tamaño máximo es de {size}MB.", "errorUpload": "Hubo un error al subir la imagen." },
    "premiumPage": {
      "backButton": "Volver al Panel", "title": "Eleva tu Bienestar con Premium", "subtitle": "Transforma tu apoyo matutino en una conversación continua. Profundiza, aprende y crece con herramientas exclusivas diseñadas para ti.",
      "features": {
        "one": { "title": "IA Conversacional", "description": "Dialoga con tu IA para explorar tus pensamientos y recibir apoyo continuo." },
        "two": { "title": "Personalización Avanzada", "description": "La IA aprende de ti y adapta los mensajes futuros a tu progreso personal." },
        "three": { "title": "Biblioteca de Ejercicios", "description": "Accede a audios y guías de TCC y Mindfulness para momentos clave del día." },
        "four": { "title": "Estadísticas de Progreso", "description": "Visualiza tu evolución emocional con gráficos y patrones detallados." }
      },
      "pricing": {
        "monthly": { "title": "Mensual", "period": "/mes", "description": "Flexibilidad total. Cancela cuando quieras." },
        "yearly": { "title": "Anual", "period": "/año", "description": "La mejor opción para un compromiso a largo plazo.", "badge": "Ahorra un 15%" },
        "button": "Empezar prueba de 7 días"
      },
      "disclaimer": "Puedes cancelar tu suscripción en cualquier momento. Las pruebas gratuitas son solo para nuevos usuarios.",
      "updateError": "No se pudo actualizar a Premium. Por favor, inténtalo de nuevo."
    },
    "chatPage": {
        "title": "Tu Conversación",
        "inputPlaceholder": "Escribe tu mensaje...",
        "error": { "init": "Lo siento, no pude iniciar nuestra conversación. Por favor, intenta volver más tarde.", "send": "Hubo un problema al enviar tu mensaje. ¿Podrías intentarlo de nuevo?" }
    },
    "profileEditModal": {
        "title": "Editar Perfil",
        "editAriaLabel": "Editar perfil",
        "cancel": "Cancelar",
        "save": "Guardar",
        "errorNameRequired": "El nombre no puede estar vacío.",
        "errorGeneric": "No se pudo actualizar el perfil. Inténtalo de nuevo."
    },
    "focusEditModal": {
        "title": "Cambia Tu Enfoque",
        "save": "Guardar Enfoque",
        "errorGeneric": "No se pudo actualizar el enfoque. Inténtalo de nuevo."
    },
    "gemini": {
        "morningPrompt": "El usuario se ha despertado sintiéndose: \"{mood}\". Proporcionó este contexto adicional: \"{context}\". Basado en esto, genera un mensaje de apoyo y reencuadre para empezar el día.",
        "dashboardPrompt": "El enfoque principal del usuario para hoy es \"{focus}\". Genera un mensaje inspirador y accionable que aborde directamente este enfoque para ayudarle a empezar bien el día.",
        "chatInitialContext": "Contexto del usuario: Su nombre es {name}. Su enfoque principal es {focus}. Sus estados de ánimo más recientes son: {moods}.",
        "noMoods": "No se ha registrado ninguno",
        "chatGreeting": "Hola, empecemos nuestra conversación."
    }
  },
  en: {
    "header": { "login": "Login", "register": "Sign Up", "logout": "Logout" },
    "landing": {
      "hero": { "title": "Start your day, don't just survive it.", "subtitle": "Receive a smart, supportive message each morning, based on real psychology, designed for your emotional well-being.", "cta": "Get your first message (Free)" },
      "problem": { "title": "Mornings can be tough.", "subtitle": "Do you wake up with anxiety, check your phone, and already feel exhausted? You're not alone. The first hour of the day sets your mood." },
      "solution": {
        "title": "Introducing \"AmanecerIA\"",
        "subtitle": "A lightweight PWA that sends you a positive, actionable message. It's not a generic quote; it's practical, CBT-based advice to help you reframe your day.",
        "phone": { "iaMessage": "AI Message", "message": "\"Good morning. I see you felt 'overwhelmed' yesterday. Today, remember this: you don't have to climb the whole mountain, just take the next step. What's one small thing you can control in the next 10 minutes?\"" },
        "tryit": { "title": "Try the AI: How are you feeling today?", "contextLabel": "Add some context (optional):", "contextPlaceholder": "e.g., I have an important presentation...", "button": "Generate my message" },
        "errorSelectMood": "Please select a mood.",
        "errorGenerating": "There was a problem generating your message. Please try again."
      },
      "features": {
        "one": { "title": "Real Psychology", "text": "Messages designed by CBT experts for real impact." },
        "two": { "title": "Mood Tracking", "text": "Track your emotional progress in 30 seconds each day." },
        "three": { "title": "100% Private", "text": "Your data is yours. We use secure encryption to protect you." }
      },
      "premium": { "title": "Ready to go deeper?", "subtitle": "Go Premium and unlock Conversational AI. Reply to your message, explore your thoughts, and access guided audio and text exercises.", "cta": "View Premium plans" },
      "safety": { "title": "Your well-being is our priority.", "text": "AmanecerIA is a support tool, not a substitute for therapy. If you are in a crisis, please contact professional helplines.", "link": "Find help here." },
      "cta": { "title": "Change your mornings. Change your day.", "subtitle": "Join for free and get your first message tomorrow.", "button": "Get started now" }
    },
    "moods": { "Ansiedad": "Anxiety", "Baja Motivación": "Low Motivation", "Abrumado/a": "Overwhelmed", "Neutral": "Neutral", "Optimista": "Optimistic" },
    "focuses": { "Autoestima": "Self-Esteem", "Ansiedad": "Anxiety", "Motivación": "Motivation" },
    "moodLabels": { "very_bad": "Very Bad", "neutral": "Neutral", "ok": "Good", "great": "Great", "very_good": "Awesome" },
    "footer": { "copyright": "AmanecerIA. All rights reserved.", "terms": "Terms of Service", "privacy": "Privacy Policy" },
    "crisisModal": { "title": "Professional Help is Available", "text": "It seems like you're going through a very difficult time. AmanecerIA is not a crisis tool. Please contact a professional. You are not alone.", "callButton": "Call Emergency Services", "helpLinesButton": "View Helplines", "closeButton": "Close" },
    "messageDisplay": { "placeholder": { "title": "Your message will appear here", "quote": "\"You don't have to climb the whole mountain, just take the next step.\"" } },
    "auth": {
      "login": { "title": "Welcome back", "subtitle": "Log in to continue.", "button": "Login", "link": "Log in" },
      "register": { "title": "Breathe. We're here.", "subtitle": "Create your account to get started.", "button": "Sign Up with Email", "link": "Sign up" },
      "continueWithGoogle": "Continue with Google", "orSeparator": "OR",
      "nameLabel": "Name", "emailLabel": "Email", "passwordLabel": "Password",
      "noAccount": "Don't have an account?", "hasAccount": "Already have an account?",
      "legal": { "prefix": "By continuing, you agree to our", "terms": "Terms", "and": "and", "privacy": "Privacy Policy" },
      "confirmation": { "title": "Almost there!", "message": "We've sent an email to <strong>{email}</strong>. Please click the confirmation link to activate your account.", "button": "Got it" },
      "needsConfirmation": { "title": "Confirm your email", "message": "Check your inbox and click the activation link.", "resendButton": "Resend email", "resending": "Sending..." },
      "resentSuccess": "Confirmation email successfully resent to <strong>{email}</strong>!",
      "errors": { "missingFields": "Please enter your email and password.", "missingFieldsAll": "Please fill out all fields.", "resendFailed": "Failed to resend email. Please try again.", "invalidCredentials": "Invalid email or password. Please try again.", "generic": "An error occurred. Please check your details or try again later." }
    },
    "onboarding": { "step": "Step 1 of 1", "title": "What's the one focus you need most today?", "subtitle": "You can change this anytime.", "button": "See my message for today" },
    "dashboard": {
      "hero": { "alt": "A sunrise over a misty field, representing a new day." },
      "profileHeader": { "greeting": "Good morning, {name}" },
      "messageCard": { "title": "Your message for today", "yourFocus": "Your Focus", "loading": "Generating your message...", "errorNoFocus": "No focus has been set. Please complete the onboarding.", "errorLoading": "Could not load your message. Please try again.", "editFocusAriaLabel": "Edit focus" },
      "moodTracker": { "title": "How are you feeling now?", "subtitle": "Log your current mood.", "success": "You've logged: {mood}", "error": "Could not save your mood. Please try again." },
      "moodHistory": { "title": "Mood History", "error": "Could not load history.", "empty": "You haven't logged any moods yet." },
      "premiumPlaceholder": { "title": "Unlock the Conversation", "subtitle": "Reply to your message, explore your thoughts, and access guided exercises with Premium.", "button": "Learn more" },
      "chatCTA": { "title": "Open Conversation", "subtitle": "Your space to talk. Explore your thoughts with your personal support AI.", "button": "Start Chatting" },
      "notificationBanner": {
        "title": "Get your message every morning", "subtitle": "Enable notifications so you don't miss your daily dose of positivity.", "button": "Enable",
        "granted": "Great! Notifications are enabled.",
        "deniedTitle": "You've blocked notifications.", "deniedSubtitle": "To receive them, you need to enable them in your browser settings."
      }
    },
    "avatar": { "errorFormat": "Invalid format. Please upload a JPG or PNG.", "errorSize": "File is too large. Max size is {size}MB.", "errorUpload": "There was an error uploading the image." },
    "premiumPage": {
      "backButton": "Back to Dashboard", "title": "Elevate Your Well-being with Premium", "subtitle": "Transform your morning support into an ongoing conversation. Go deeper, learn, and grow with exclusive tools designed for you.",
      "features": {
        "one": { "title": "Conversational AI", "description": "Chat with your AI to explore your thoughts and receive continuous support." },
        "two": { "title": "Advanced Personalization", "description": "The AI learns from you and adapts future messages to your personal progress." },
        "three": { "title": "Exercise Library", "description": "Access CBT and Mindfulness audios and guides for key moments of the day." },
        "four": { "title": "Progress Insights", "description": "Visualize your emotional evolution with detailed charts and patterns." }
      },
      "pricing": {
        "monthly": { "title": "Monthly", "period": "/month", "description": "Total flexibility. Cancel anytime." },
        "yearly": { "title": "Yearly", "period": "/year", "description": "The best option for a long-term commitment.", "badge": "Save 15%" },
        "button": "Start 7-day trial"
      },
      "disclaimer": "You can cancel your subscription at any time. Free trials are for new users only.",
      "updateError": "Could not upgrade to Premium. Please try again."
    },
    "chatPage": {
        "title": "Your Conversation",
        "inputPlaceholder": "Type your message...",
        "error": { "init": "Sorry, I couldn't start our conversation. Please try coming back later.", "send": "There was a problem sending your message. Could you please try again?" }
    },
    "profileEditModal": {
        "title": "Edit Profile",
        "editAriaLabel": "Edit profile",
        "cancel": "Cancel",
        "save": "Save",
        "errorNameRequired": "Name cannot be empty.",
        "errorGeneric": "Could not update profile. Please try again."
    },
    "focusEditModal": {
        "title": "Change Your Focus",
        "save": "Save Focus",
        "errorGeneric": "Could not update focus. Please try again."
    },
     "gemini": {
        "morningPrompt": "The user woke up feeling: \"{mood}\". They provided this additional context: \"{context}\". Based on this, generate a supportive and reframing message to start the day.",
        "dashboardPrompt": "The user's main focus for today is \"{focus}\". Generate an inspiring and actionable message that directly addresses this focus to help them start the day well.",
        "chatInitialContext": "User context: Their name is {name}. Their main focus is {focus}. Their most recent moods are: {moods}.",
        "noMoods": "None have been logged",
        "chatGreeting": "Hello, let's start our conversation."
    }
  }
};


export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
     if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('language') as Language;
      if (savedLang && (savedLang === 'es' || savedLang === 'en')) {
        return savedLang;
      }
      const browserLang = navigator.language.split('-')[0];
      return browserLang === 'es' ? 'es' : 'en';
    }
    return 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string, options?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let result: any = translations[language];
    for (const k of keys) {
      result = result?.[k];
      if (result === undefined) {
        return key; // Return the key if translation is not found
      }
    }
    
    let strResult = String(result);

    if (options) {
      Object.keys(options).forEach(placeholder => {
        strResult = strResult.replace(`{${placeholder}}`, String(options[placeholder]));
      });
    }

    return strResult;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};