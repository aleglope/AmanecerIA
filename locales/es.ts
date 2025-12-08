export const es = {
  header: {
    login: "Iniciar Sesión",
    register: "Registrarse",
    logout: "Salir",
  },
  landing: {
    hero: {
      title: "Empieza tu día, no solo lo sobrevivas.",
      subtitle:
        "Recibe cada mañana un mensaje inteligente de apoyo, basado en psicología real, diseñado para tu bienestar emocional.",
      cta: "Recibe tu primer mensaje (Gratis)",
    },
    problem: {
      title: "Las mañanas pueden ser difíciles.",
      subtitle:
        "¿Te despiertas con ansiedad, revisas el móvil y ya te sientes agotado? No estás solo. La primera hora del día define tu estado de ánimo.",
    },
    solution: {
      title: 'Te presentamos "AmanecerIA"',
      subtitle:
        "Una PWA ligera que te envía un mensaje positivo y accionable. No es una cita genérica; es un consejo práctico basado en TCC para ayudarte a reencuadrar tu día.",
      phone: {
        iaMessage: "Mensaje de IA",
        message:
          "\"Buen día. Noto que ayer te sentiste 'abrumado'. Hoy, recuerda esto: no tienes que escalar toda la montaña, solo dar el siguiente paso. ¿Cuál es una pequeña cosa que sí puedes controlar en los próximos 10 minutos?\"",
      },
      tryit: {
        title: "Prueba la IA: ¿Cómo te sientes hoy?",
        contextLabel: "Añade un poco de contexto (opcional):",
        contextPlaceholder: "Ej: Tengo una presentación importante...",
        button: "Generar mi mensaje",
      },
      errorSelectMood: "Por favor, selecciona un estado de ánimo.",
      errorGenerating:
        "Hubo un problema al generar tu mensaje. Inténtalo de nuevo.",
    },
    features: {
      one: {
        title: "Psicología Real",
        text: "Mensajes diseñados por expertos en TCC para un impacto real.",
      },
      two: {
        title: "Registro de Ánimo",
        text: "Sigue tu progreso emocional en 30 segundos cada día.",
      },
      three: {
        title: "100% Privado",
        text: "Tus datos son tuyos. Usamos encriptación segura para protegerte.",
      },
    },
    premium: {
      title: "¿Listo para profundizar?",
      subtitle:
        "Conviértete en Premium y desbloquea la IA Conversacional. Responde a tu mensaje, explora tus pensamientos y accede a ejercicios guiados de audio y texto.",
      cta: "Ver planes Premium",
    },
    safety: {
      title: "Tu bienestar es nuestra prioridad.",
      text: "AmanecerIA es una herramienta de apoyo, no un sustituto de terapia. Si estás en una crisis, por favor contacta a las líneas de ayuda profesionales.",
      link: "Encuentra ayuda aquí.",
    },
    cta: {
      title: "Cambia tus mañanas. Cambia tu día.",
      subtitle: "Únete gratis y recibe tu primer mensaje mañana.",
      button: "Empezar ahora",
    },
  },
  moods: {
    Ansiedad: "Ansiedad",
    "Baja Motivación": "Baja Motivación",
    "Abrumado/a": "Abrumado/a",
    Neutral: "Neutral",
    Optimista: "Optimista",
  },
  focuses: {
    Autoestima: "Autoestima",
    Ansiedad: "Ansiedad",
    Motivación: "Motivación",
  },
  moodLabels: {
    very_bad: "Muy mal",
    neutral: "Neutral",
    ok: "Bien",
    great: "Genial",
    very_good: "Increíble",
  },
  notificationTones: {
    Amable: "Amable",
    Directo: "Directo",
    Motivador: "Motivador",
  },
  notificationLengths: {
    Corto: "Corto",
    Medio: "Medio",
    Detallado: "Detallado",
  },
  footer: {
    copyright: "AmanecerIA. Todos los derechos reservados.",
    terms: "Términos de Servicio",
    privacy: "Política de Privacidad",
  },
  crisisModal: {
    title: "Ayuda Profesional está Disponible",
    text: "Parece que estás pasando por un momento muy difícil. AmaneceIA no es una herramienta para crisis. Por favor, contacta a un profesional. No estás solo/a.",
    callButton: "Llamar a Emergencias",
    helpLinesButton: "Ver Líneas de Ayuda",
    closeButton: "Cerrar",
  },
  messageDisplay: {
    placeholder: {
      title: "Tu mensaje aparecerá aquí",
      quote:
        '"No tienes que escalar toda la montaña, solo dar el siguiente paso."',
    },
  },
  auth: {
    login: {
      title: "Bienvenido/a",
      subtitle: "Inicia sesión para continuar.",
      button: "Iniciar Sesión",
      link: "Inicia sesión",
    },
    register: {
      title: "Respira. Estamos aquí.",
      subtitle: "Crea tu cuenta para empezar.",
      button: "Registrarse con Email",
      link: "Regístrate",
    },
    continueWithGoogle: "Continuar con Google",
    orSeparator: "O",
    nameLabel: "Nombre",
    emailLabel: "Email",
    passwordLabel: "Contraseña",
    noAccount: "¿No tienes una cuenta?",
    hasAccount: "¿Ya tienes una cuenta?",
    legal: {
      prefix: "Al continuar, aceptas nuestros",
      terms: "Términos",
      and: "y",
      privacy: "Política de Privacidad",
    },
    confirmation: {
      title: "¡Casi listo!",
      message:
        "Te hemos enviado un correo a <strong>{email}</strong>. Por favor, haz clic en el enlace de confirmación para activar tu cuenta.",
      button: "Entendido",
    },
    needsConfirmation: {
      title: "Confirma tu correo electrónico",
      message:
        "Revisa tu bandeja de entrada y haz clic en el enlace de activación.",
      resendButton: "Reenviar correo",
      resending: "Enviando...",
    },
    resentSuccess:
      "¡Correo de confirmación reenviado con éxito a <strong>{email}</strong>!",
    errors: {
      missingFields: "Por favor, introduce tu email y contraseña.",
      missingFieldsAll: "Por favor, completa todos los campos.",
      resendFailed: "Error al reenviar el correo. Inténtalo de nuevo.",
      invalidCredentials:
        "El correo electrónico o la contraseña son incorrectos. Por favor, inténtalo de nuevo.",
      generic: "Ha ocurrido un error. Revisa tus datos o inténtalo más tarde.",
    },
  },
  onboarding: {
    step1: "Paso 1 de 2",
    step2: "Paso 2 de 2",
    title: "¿Cuál es el enfoque que más necesitas hoy?",
    subtitle: "Puedes cambiar esto cuando quieras.",
    button: "Continuar",
    notifications: {
      title: "Un último paso",
      subtitle:
        "Activa las notificaciones para recibir tu mensaje personalizado cada mañana. Es el corazón de AmanecerIA.",
      activateButton: "Activar Notificaciones",
      skipButton: "Quizás más tarde",
    },
  },
  dashboard: {
    hero: {
      alt: "Un amanecer sobre un campo brumoso, representando un nuevo día.",
    },
    profileHeader: { greeting: "Buenos días, {name}" },
    messageCard: {
      title: "Tu mensaje para hoy",
      yourFocus: "Tu Enfoque",
      loading: "Generando tu mensaje...",
      errorNoFocus: "No tienes un enfoque seleccionado.",
    },
    chatCTA: {
      title: "Conversación Abierta",
      subtitle:
        "Tu espacio para hablar. Explora tus pensamientos con tu IA de apoyo personal.",
      button: "Empezar a Chatear",
    },
    notificationBanner: {
      title: "Recibe tu mensaje cada mañana",
      subtitle:
        "Activa las notificaciones para no perderte tu dosis diaria de positividad.",
      button: "Activar",
      activating: "Activando...",
      granted: "¡Suscripción activada! Recibirás tu mensaje cada mañana.",
      deniedTitle: "Has bloqueado las notificaciones.",
      deniedSubtitle:
        "Para recibirlas, debes activarlas en la configuración de tu navegador.",
    },
    moodHistory: {
      title: "Historial de Ánimo",
      empty: "No hay datos suficientes aún.",
      error: "Error al cargar el historial.",
      premiumChartTitle: "Desbloquea tus Tendencias",
      unlockTrends: "Ver Premium",
    },
    moodChart: {
      mood: "Estado de ánimo",
      notEnoughData: "Necesitas al menos 2 registros para ver tu gráfica.",
    },
  },
  avatar: {
    errorFormat: "Formato inválido. Por favor, sube un JPG o PNG.",
    errorSize: "El archivo es demasiado grande. El tamaño máximo es {size}MB.",
    errorUpload: "Hubo un error al subir la imagen.",
  },
  premiumPage: {
    backButton: "Atrás",
    title: "Eleva tu Bienestar con Premium",
    subtitle:
      "Transforma tu apoyo matutino en una conversación continua. Profundiza, aprende y crece con herramientas exclusivas diseñadas para ti.",
    features: {
      one: {
        title: "IA Conversacional",
        description:
          "Chatea con tu IA para explorar tus pensamientos y recibir apoyo continuo.",
      },
      two: {
        title: "Personalización Avanzada",
        description:
          "La IA aprende de ti y adapta los mensajes futuros a tu progreso personal.",
      },
      three: {
        title: "Biblioteca de Ejercicios",
        description:
          "Accede a audios y guías de TCC y Mindfulness para momentos clave del día.",
      },
      four: {
        title: "Insights de Progreso",
        description:
          "Visualiza tu evolución emocional con gráficos y patrones detallados.",
      },
    },
    pricing: {
      monthly: {
        title: "Mensual",
        period: "/mes",
        description: "Flexibilidad total. Cancela cuando quieras.",
      },
      yearly: {
        title: "Anual",
        period: "/año",
        description: "La mejor opción para un compromiso a largo plazo.",
        badge: "Ahorra 15%",
      },
      button: "Empezar prueba de 7 días",
    },
    disclaimer:
      "Puedes cancelar tu suscripción en cualquier momento. Las pruebas gratuitas son solo para nuevos usuarios.",
    updateError:
      "No se pudo actualizar a Premium. Por favor, inténtalo de nuevo.",
  },
  chatPage: {
    title: "Tu Conversación",
    inputPlaceholder: "Escribe tu mensaje...",
    error: {
      init: "Lo siento, no pude iniciar nuestra conversación. Por favor, intenta volver más tarde.",
      send: "Hubo un problema al enviar tu mensaje. ¿Podrías intentarlo de nuevo?",
    },
  },
  profileEditModal: {
    title: "Editar Perfil",
    editAriaLabel: "Editar perfil",
    cancel: "Cancelar",
    save: "Guardar",
    errorNameRequired: "El nombre no puede estar vacío.",
    errorGeneric:
      "No se pudo actualizar el perfil. Por favor, inténtalo de nuevo.",
  },
  focusEditModal: {
    title: "Cambiar tu Enfoque",
    save: "Guardar Enfoque",
    errorGeneric:
      "No se pudo actualizar el enfoque. Por favor, inténtalo de nuevo.",
  },
  settingsPage: {
    title: "Configuración",
    profileSection: { title: "Perfil" },
    notificationsSection: {
      title: "Configuración de Notificaciones",
      enableLabel: "Notificaciones diarias",
      enableDescription: "Recibe un mensaje personalizado cada mañana.",
      preferencesTitle: "Preferencias de Mensaje",
      toneLabel: "Tono",
      lengthLabel: "Longitud",
    },
    saveButton: "Guardar Cambios",
    successMessage: "Configuración guardada exitosamente.",
    errorMessage:
      "No se pudo guardar la configuración. Por favor, inténtalo de nuevo.",
  },
  gemini: {
    morningPrompt:
      'El usuario se despertó sintiéndose: "{mood}". Proporcionó este contexto adicional: "{context}". Basado en esto, genera un mensaje de apoyo y reencuadre para comenzar el día.',
    dashboardPrompt:
      'El enfoque principal del usuario para hoy es "{focus}". Genera un mensaje inspirador y accionable que aborde directamente este enfoque para ayudarlo a comenzar bien el día.',
    chatInitialContext:
      "Contexto del usuario: Su nombre es {name}. Su enfoque principal es {focus}. Sus estados de ánimo más recientes son: {moods}.",
    noMoods: "No se han registrado",
    chatGreeting: "Hola, empecemos nuestra conversación.",
  },
  common: {
    close: "Cerrar",
  },
  exerciseTypes: {
    CBT: "TCC",
    Mindfulness: "Mindfulness",
    Breathing: "Respiración",
  },
  exercises: {
    title: "Ejercicios",
    boxBreathing: {
      title: "Respiración Cuadrada",
      desc: "Técnica simple para reducir el estrés rápidamente.",
      content: "Inhale 4s, sostén 4s, exhala 4s, sostén 4s. Repite.",
    },
    "54321": {
      title: "Técnica 5-4-3-2-1",
      desc: "Ejercicio de grounding para calmar la ansiedad.",
      content:
        "Nombra 5 cosas que ves, 4 que tocas, 3 que oyes, 2 que hueles, 1 que saboreas.",
    },
    reframing: {
      title: "Reencuadre",
      desc: "Cambia tu perspectiva sobre pensamientos negativos.",
      content:
        "Identifica el pensamiento. ¿Es realista? ¿Hay otra forma de verlo?",
    },
    gratitude: {
      title: "Gratitud",
      desc: "Enfócate en lo positivo para mejorar tu ánimo.",
      content: "Escribe 3 cosas por las que estás agradecido hoy.",
    },
  },
};
