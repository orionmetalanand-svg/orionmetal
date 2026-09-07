"use client";

import { useState, useRef, useEffect } from "react";
import { chatbotKnowledge } from "@/lib/chatbot-knowledge";

const suggestions = [
  "What services do you offer?",
  "Where are you located?",
  "How do I request a quote?",
  "Tell me about laser cutting",
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", content: chatbotKnowledge.greeting },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const sendMessage = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      if (!res.ok) throw new Error("Request failed");

      const data = await res.json();
      setMessages((prev) => [...prev, { role: "bot", content: data.reply }]);
    } catch {
      setError("Unable to connect. Please try again or contact us directly.");
    } finally {
      setLoading(false);
    }
  };

  const clearConversation = () => {
    setMessages([{ role: "bot", content: chatbotKnowledge.greeting }]);
    setError(null);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="fixed bottom-4 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-brand-red text-white shadow-[0_12px_44px_-8px_rgba(225,29,46,0.85)] transition-all duration-300 hover:scale-110 hover:bg-brand-red-bright focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red-bright sm:bottom-5 sm:right-6 sm:h-14 sm:w-14"
        aria-label={open ? "Close chat assistant" : "Open chat assistant"}
        aria-expanded={open}
      >
        {open ? (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {open && (
        <div
          className="fixed bottom-[4.5rem] right-3 z-40 flex h-[min(520px,70vh)] w-[min(390px,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-2xl border border-white/12 bg-brand-black/95 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.9)] backdrop-blur-2xl sm:bottom-24 sm:right-6"
          role="dialog"
          aria-label="Orion Metal Industries chat assistant"
        >
          {/* Header */}
          <div className="relative flex items-center justify-between border-b border-white/10 px-5 py-4">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-red to-transparent" />
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-red/15 text-brand-red">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-bold text-white">Orion Assistant</p>
                <p className="flex items-center gap-1.5 text-[11px] text-brand-faint">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                  Online
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={clearConversation}
              className="rounded-full border border-white/12 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white/60 transition-colors hover:border-brand-red/50 hover:text-brand-red"
              aria-label="Clear conversation"
            >
              Clear
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "rounded-br-md bg-brand-red text-white"
                      : "glass rounded-bl-md text-white/85"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="glass rounded-2xl rounded-bl-md px-4 py-3">
                  <span className="flex gap-1.5">
                    {[0, 150, 300].map((d) => (
                      <span
                        key={d}
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-red"
                        style={{ animationDelay: `${d}ms` }}
                      />
                    ))}
                  </span>
                </div>
              </div>
            )}

            {error && (
              <p className="rounded-xl border border-red-500/25 bg-red-500/10 px-3.5 py-2.5 text-xs text-red-300" role="alert">
                {error}
              </p>
            )}

            {messages.length === 1 && (
              <div className="pt-2">
                <p className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-faint">
                  Suggested questions
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => sendMessage(s)}
                      className="rounded-full border border-white/12 px-3 py-1.5 text-[11px] text-white/70 transition-colors hover:border-brand-red/50 hover:text-white"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={endRef} />
          </div>

          {/* Input */}
          <form
            className="border-t border-white/10 p-3"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
          >
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about our services..."
                maxLength={500}
                className="flex-1 rounded-full border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-brand-faint focus:border-brand-red/60 focus:outline-none"
                aria-label="Chat message"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Send message"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-red text-white transition-all duration-300 hover:bg-brand-red-bright disabled:opacity-40"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
