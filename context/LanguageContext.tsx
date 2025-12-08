import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { Language } from "../types";
import { es } from "../locales/es";
import { en } from "../locales/en";

// 1. Tipado fuerte para las claves de traducción
type Translations = typeof en;

// Recursividad para obtener todas las claves posibles: "auth.login.title"
type RecursiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: TObj[TKey] extends object
    ? `${TKey}` | `${TKey}.${RecursiveKeyOf<TObj[TKey]>}`
    : `${TKey}`;
}[keyof TObj & (string | number)];

type TranslationKey = RecursiveKeyOf<Translations>;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  // 2. La función t ahora solo acepta claves válidas que existen en el objeto
  t: (key: TranslationKey, options?: Record<string, string | number>) => string;
}

const translations: Record<Language, Translations> = { es, en };

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === "undefined") return "en";
    const saved = localStorage.getItem("language") as Language;
    return saved === "es" || saved === "en" ? saved : "en";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
    // Cambiar atributo lang del HTML para accesibilidad y SEO
    document.documentElement.lang = language;
  }, [language]);

  const t = (
    key: TranslationKey,
    options?: Record<string, string | number>
  ): string => {
    const keys = key.split(".");
    let current: any = translations[language];
    let fallback: any = translations["en"];

    for (const k of keys) {
      current = current?.[k];
      fallback = fallback?.[k];
    }

    // 3. Fallback robusto
    let result = current ?? fallback ?? key;

    // 4. Interpolación segura
    if (options && typeof result === "string") {
      Object.entries(options).forEach(([k, v]) => {
        result = result.replace(`{${k}}`, String(v));
      });
    }

    return String(result);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useTranslation must be used within LanguageProvider");
  return context;
};
