export const en = {
  header: {
    login: "Login",
    register: "Register",
    logout: "Logout",
  },
  landing: {
    hero: {
      title: "Start your day, don't just survive it.",
      subtitle:
        "Receive an intelligent support message every morning, based on real psychology, designed for your emotional well-being.",
      cta: "Get your first message (Free)",
    },
    problem: {
      title: "Mornings can be hard.",
      subtitle:
        "Do you wake up anxious, check your phone, and already feel exhausted? You are not alone. The first hour of the day defines your mood.",
    },
    solution: {
      title: 'Introducing "AmanecerIA"',
      subtitle:
        "A lightweight PWA that sends you a positive and actionable message. Not a generic quote; it's a practical tip based on CBT to help you reframe your day.",
      phone: {
        iaMessage: "AI Message",
        message:
          "\"Good morning. I notice you felt 'overwhelmed' yesterday. Today, remember this: you don't have to climb the whole mountain, just take the next step. What is one small thing you can control in the next 10 minutes?\"",
      },
      tryit: {
        title: "Try the AI: How do you feel today?",
        contextLabel: "Add a little context (optional):",
        contextPlaceholder: "Ex: I have an important presentation...",
        button: "Generate my message",
      },
      errorSelectMood: "Please select a mood.",
      errorGenerating:
        "There was a problem generating your message. Please try again.",
    },
    features: {
      one: {
        title: "Real Psychology",
        text: "Messages designed by CBT experts for real impact.",
      },
      two: {
        title: "Mood Tracker",
        text: "Track your emotional progress in 30 seconds each day.",
      },
      three: {
        title: "100% Private",
        text: "Your data is yours. We use secure encryption to protect you.",
      },
    },
    premium: {
      title: "Ready to go deeper?",
      subtitle:
        "Go Premium and unlock Conversational AI. Reply to your message, explore your thoughts, and access guided audio and text exercises.",
      cta: "View Premium plans",
    },
    safety: {
      title: "Your well-being is our priority.",
      text: "AmanecerIA is a support tool, not a substitute for therapy. If you are in crisis, please contact professional helplines.",
      link: "Find help here.",
    },
    cta: {
      title: "Change your mornings. Change your day.",
      subtitle: "Join for free and receive your first message tomorrow.",
      button: "Start now",
    },
  },
  moods: {
    Ansiedad: "Anxiety",
    "Baja Motivación": "Low Motivation",
    "Abrumado/a": "Overwhelmed",
    Neutral: "Neutral",
    Optimista: "Optimistic",
  },
  focuses: {
    Autoestima: "Self-esteem",
    Ansiedad: "Anxiety",
    Motivación: "Motivation",
  },
  moodLabels: {
    very_bad: "Very bad",
    neutral: "Neutral",
    ok: "Good",
    great: "Great",
    very_good: "Amazing",
  },
  notificationTones: {
    Amable: "Gentle",
    Directo: "Direct",
    Motivador: "Motivational",
  },
  notificationLengths: {
    Corto: "Short",
    Medio: "Medium",
    Detallado: "Detailed",
  },
  footer: {
    copyright: "AmanecerIA. All rights reserved.",
    terms: "Terms of Service",
    privacy: "Privacy Policy",
  },
  crisisModal: {
    title: "Professional Help is Available",
    text: "It seems you are going through a very difficult time. AmanecerIA is not a crisis tool. Please contact a professional. You are not alone.",
    callButton: "Call Emergency Services",
    helpLinesButton: "View Helplines",
    closeButton: "Close",
  },
  messageDisplay: {
    placeholder: {
      title: "Your message will appear here",
      quote:
        '"You don\'t have to climb the whole mountain, just take the next step."',
    },
  },
  auth: {
    login: {
      title: "Welcome",
      subtitle: "Log in to continue.",
      button: "Log In",
      link: "Log in",
    },
    register: {
      title: "Breathe. We are here.",
      subtitle: "Create your account to start.",
      button: "Sign Up with Email",
      link: "Sign up",
    },
    continueWithGoogle: "Continue with Google",
    orSeparator: "OR",
    nameLabel: "Name",
    emailLabel: "Email",
    passwordLabel: "Password",
    noAccount: "Don't have an account?",
    hasAccount: "Already have an account?",
    legal: {
      prefix: "By continuing, you accept our",
      terms: "Terms",
      and: "and",
      privacy: "Privacy Policy",
    },
    confirmation: {
      title: "Almost there!",
      message:
        "We sent an email to <strong>{email}</strong>. Please click the confirmation link to activate your account.",
      button: "Got it",
    },
    needsConfirmation: {
      title: "Confirm your email",
      message: "Check your inbox and click the activation link.",
      resendButton: "Resend email",
      resending: "Sending...",
    },
    resentSuccess:
      "Confirmation email resent successfully to <strong>{email}</strong>!",
    errors: {
      missingFields: "Please enter your email and password.",
      missingFieldsAll: "Please complete all fields.",
      resendFailed: "Failed to resend email. Please try again.",
      invalidCredentials: "Incorrect email or password. Please try again.",
      generic: "An error occurred. Please check your data or try again later.",
    },
  },
  onboarding: {
    step1: "Step 1 of 2",
    step2: "Step 2 of 2",
    title: "What focus do you need most today?",
    subtitle: "You can change this whenever you want.",
    button: "Continue",
    notifications: {
      title: "One last step",
      subtitle:
        "Enable notifications to receive your personalized message every morning. It's the heart of AmanecerIA.",
      activateButton: "Enable Notifications",
      skipButton: "Maybe later",
    },
  },
  dashboard: {
    hero: {
      alt: "A sunrise over a misty field, representing a new day.",
    },
    profileHeader: { greeting: "Good morning, {name}" },
    messageCard: {
      title: "Your message for today",
      yourFocus: "Your Focus",
      loading: "Generating your message...",
      errorNoFocus: "You haven't selected a focus.",
    },
    chatCTA: {
      title: "Open Conversation",
      subtitle:
        "Your space to talk. Explore your thoughts with your personal support AI.",
      button: "Start Chatting",
    },
    notificationBanner: {
      title: "Get your message every morning",
      subtitle:
        "Enable notifications so you don't miss your daily dose of positivity.",
      button: "Enable",
      activating: "Enabling...",
      granted:
        "Subscription activated! You'll receive your message every morning.",
      deniedTitle: "You've blocked notifications.",
      deniedSubtitle:
        "To receive them, you need to enable them in your browser settings.",
    },
    moodHistory: {
      title: "Mood History",
      empty: "Not enough data yet.",
      error: "Error loading history.",
      premiumChartTitle: "Unlock Your Trends",
      unlockTrends: "See Premium",
    },
    moodChart: {
      mood: "Mood",
      notEnoughData: "You need at least 2 entries to see your chart.",
    },
  },
  avatar: {
    errorFormat: "Invalid format. Please upload a JPG or PNG.",
    errorSize: "File is too large. Max size is {size}MB.",
    errorUpload: "There was an error uploading the image.",
  },
  premiumPage: {
    backButton: "Back",
    title: "Elevate Your Well-being with Premium",
    subtitle:
      "Transform your morning support into an ongoing conversation. Go deeper, learn, and grow with exclusive tools designed for you.",
    features: {
      one: {
        title: "Conversational AI",
        description:
          "Chat with your AI to explore your thoughts and receive continuous support.",
      },
      two: {
        title: "Advanced Personalization",
        description:
          "The AI learns from you and adapts future messages to your personal progress.",
      },
      three: {
        title: "Exercise Library",
        description:
          "Access CBT and Mindfulness audios and guides for key moments of the day.",
      },
      four: {
        title: "Progress Insights",
        description:
          "Visualize your emotional evolution with detailed charts and patterns.",
      },
    },
    pricing: {
      monthly: {
        title: "Monthly",
        period: "/month",
        description: "Total flexibility. Cancel anytime.",
      },
      yearly: {
        title: "Yearly",
        period: "/year",
        description: "The best option for a long-term commitment.",
        badge: "Save 15%",
      },
      button: "Start 7-day trial",
    },
    disclaimer:
      "You can cancel your subscription at any time. Free trials are for new users only.",
    updateError: "Could not upgrade to Premium. Please try again.",
  },
  chatPage: {
    title: "Your Conversation",
    inputPlaceholder: "Type your message...",
    error: {
      init: "Sorry, I couldn't start our conversation. Please try coming back later.",
      send: "There was a problem sending your message. Could you please try again?",
    },
  },
  profileEditModal: {
    title: "Edit Profile",
    editAriaLabel: "Edit profile",
    cancel: "Cancel",
    save: "Save",
    errorNameRequired: "Name cannot be empty.",
    errorGeneric: "Could not update profile. Please try again.",
  },
  focusEditModal: {
    title: "Change Your Focus",
    save: "Save Focus",
    errorGeneric: "Could not update focus. Please try again.",
  },
  settingsPage: {
    title: "Settings",
    profileSection: { title: "Profile" },
    notificationsSection: {
      title: "Notification Settings",
      enableLabel: "Daily notifications",
      enableDescription: "Receive a personalized message every morning.",
      preferencesTitle: "Message Preferences",
      toneLabel: "Tone",
      lengthLabel: "Length",
    },
    saveButton: "Save Changes",
    successMessage: "Settings saved successfully.",
    errorMessage: "Could not save settings. Please try again.",
  },
  gemini: {
    morningPrompt:
      'The user woke up feeling: "{mood}". They provided this additional context: "{context}". Based on this, generate a supportive and reframing message to start the day.',
    dashboardPrompt:
      'The user\'s main focus for today is "{focus}". Generate an inspiring and actionable message that directly addresses this focus to help them start the day well.',
    chatInitialContext:
      "User context: Their name is {name}. Their main focus is {focus}. Their most recent moods are: {moods}.",
    noMoods: "None have been logged",
    chatGreeting: "Hello, let's start our conversation.",
  },
  common: {
    close: "Close",
  },
  exerciseTypes: {
    CBT: "CBT",
    Mindfulness: "Mindfulness",
    Breathing: "Breathing",
  },
  exercises: {
    title: "Exercises",
    boxBreathing: {
      title: "Box Breathing",
      desc: "Simple technique to reduce stress quickly.",
      content: "Inhale 4s, hold 4s, exhale 4s, hold 4s. Repeat.",
    },
    "54321": {
      title: "5-4-3-2-1 Technique",
      desc: "Grounding exercise to calm anxiety.",
      content: "Name 5 things you see, 4 you touch, 3 hear, 2 smell, 1 taste.",
    },
    reframing: {
      title: "Reframing",
      desc: "Change your perspective on negative thoughts.",
      content:
        "Identify the thought. Is it realistic? Is there another way to see it?",
    },
    gratitude: {
      title: "Gratitude",
      desc: "Focus on the positive to boost your mood.",
      content: "Write down 3 things you are grateful for today.",
    },
  },
};
