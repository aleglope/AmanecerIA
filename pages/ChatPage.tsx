import React, { useState, useEffect, useContext, useRef } from "react";
import { Header } from "../components/Header";
import { AuthContext } from "../context/AuthContext";
import { useTranslation } from "../context/LanguageContext";
import { supabase } from "../supabaseClient";
import { startChat } from "../services/geminiService";
import { Chat } from "@google/genai";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { AppError } from "../types/errors";

interface ChatPageProps {
  onBack: () => void;
}

interface Message {
  role: "user" | "model";
  text: string;
}

const ChatPage: React.FC<ChatPageProps> = ({ onBack }) => {
  const { t, language } = useTranslation();
  const { user } = useContext(AuthContext);
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isResponding, setIsResponding] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // New error state
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const initChat = async () => {
      if (!user) return;
      setErrorMessage(null);
      try {
        // 1. Load chat history from Supabase
        const { data: historyData, error: historyError } = await supabase
          .from("chat_messages")
          .select("role, content")
          .eq("user_id", user.id)
          .order("created_at", { ascending: true }); // Oldest first

        if (historyError) throw historyError;

        const historyMessages: Message[] =
          historyData?.map((msg) => ({
            role: msg.role as "user" | "model",
            text: msg.content,
          })) || [];

        setMessages(historyMessages);

        // 2. Prepare context for Gemini
        const { data: moodData, error: moodError } = await supabase
          .from("mood_history")
          .select("mood_label")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(3);

        if (moodError) throw moodError;

        const recentMoods = moodData
          .map((m) => t(`moodLabels.${m.mood_label}`))
          .join(", ");
        const userFocus = user.focus ? t(`focuses.${user.focus}`) : "";

        const initialContext = t("gemini.chatInitialContext", {
          name: user.name || "user",
          focus: userFocus,
          moods: recentMoods || t("gemini.noMoods"),
        });

        const session = await startChat(initialContext, language);
        setChatSession(session);

        // If no history, send greeting
        if (historyMessages.length === 0) {
          setIsResponding(true);
          const initialResponse = await session.sendMessage({
            message: t("gemini.chatGreeting"),
          });
          const greetingText = initialResponse.text;

          setMessages([{ role: "model", text: greetingText }]);

          // Save greeting to DB
          await supabase.from("chat_messages").insert([
            {
              user_id: user.id,
              role: "model",
              content: greetingText,
            },
          ]);
          setIsResponding(false);
        }
      } catch (err: any) {
        console.error("Error initializing chat:", err);
        if (err instanceof AppError && err.code === "QUOTA_EXCEEDED") {
          setErrorMessage(err.message);
        } else {
          setMessages([{ role: "model", text: t("chatPage.error.init") }]);
        }
      } finally {
        setIsLoading(false);
      }
    };

    initChat();
  }, [user, language, t]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isResponding, errorMessage]);

  // Auto-focus input when ready
  useEffect(() => {
    if (!isLoading && !isResponding && !errorMessage) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isLoading, isResponding, errorMessage]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMessage.trim() || !chatSession || isResponding || !user) return;

    const userText = currentMessage;
    const newUserMessage: Message = { role: "user", text: userText };

    setMessages((prev) => [...prev, newUserMessage]);
    setCurrentMessage("");
    setIsResponding(true);
    setErrorMessage(null);

    try {
      // Save user message to DB
      await supabase.from("chat_messages").insert([
        {
          user_id: user.id,
          role: "user",
          content: userText,
        },
      ]);

      const response = await chatSession.sendMessage({ message: userText });
      const modelText = response.text;
      const modelMessage: Message = { role: "model", text: modelText };

      setMessages((prev) => [...prev, modelMessage]);

      // Save model response to DB
      await supabase.from("chat_messages").insert([
        {
          user_id: user.id,
          role: "model",
          content: modelText,
        },
      ]);
    } catch (err: any) {
      console.error("Error sending message:", err);

      // Check for raw 429 logic if caught directly here from sendMessage execution
      const errStr = JSON.stringify(err);
      if (errStr.includes("429") || errStr.includes("RESOURCE_EXHAUSTED")) {
        const quotaMsg =
          language === "es"
            ? "Límite de IA excedido. Por favor intenta más tarde."
            : "AI quota exceeded. Please try again later.";
        setErrorMessage(quotaMsg);
      } else {
        const errorMessage: Message = {
          role: "model",
          text: t("chatPage.error.send"),
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } finally {
      setIsResponding(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-night-blue flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 py-8 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-night-blue dark:hover:text-white font-semibold"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            {t("premiumPage.backButton")}
          </button>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-night-text">
            {t("chatPage.title")}
          </h1>
        </div>

        <div className="flex-grow bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 p-4 flex flex-col">
          <div className="flex-grow overflow-y-auto space-y-4 pr-2">
            {isLoading ? (
              <div className="h-full flex items-center justify-center">
                <LoadingSpinner />
              </div>
            ) : (
              <>
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-2xl ${
                        msg.role === "user"
                          ? "bg-dawn-blue text-night-blue rounded-br-none"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-night-text rounded-bl-none"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                    </div>
                  </div>
                ))}

                {errorMessage && (
                  <div className="flex justify-center my-4">
                    <div
                      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                      role="alert"
                    >
                      <span className="block sm:inline">{errorMessage}</span>
                    </div>
                  </div>
                )}
              </>
            )}
            {isResponding && (
              <div className="flex justify-start">
                <div className="max-w-xs p-3 rounded-2xl bg-gray-200 dark:bg-gray-700 rounded-bl-none flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-150"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-300"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form
            onSubmit={handleSendMessage}
            className="mt-4 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              placeholder={t("chatPage.inputPlaceholder")}
              disabled={isResponding || isLoading || !!errorMessage}
              className="w-full px-4 py-2 text-gray-700 dark:text-night-text bg-gray-100 dark:bg-gray-700/50 border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-dawn-purple transition disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={
                isResponding ||
                isLoading ||
                !currentMessage.trim() ||
                !!errorMessage
              }
              className="bg-dawn-purple text-white rounded-full p-2 hover:bg-dawn-purple/80 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors shrink-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 transform rotate-90"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;
