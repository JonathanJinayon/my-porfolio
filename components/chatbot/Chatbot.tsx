"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { answerPortfolioQuestion } from "@/lib/chatbot/engine";
import {
  CHAT_WELCOME,
  type ChatLink,
} from "@/lib/chatbot/knowledge";
import styles from "./Chatbot.module.css";

interface ChatMessage {
  id: number;
  role: "assistant" | "user";
  text: string;
  links?: ChatLink[];
  suggestions?: string[];
}

interface TypingState {
  id: number;
  text: string;
  shown: string;
}

const REVEAL_INTERVAL = 16;
const REVEAL_CHARS = 2;

function ChatIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 4.5H17V13.5H10.5L7 16.5V13.5H3V4.5Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 8H13.5M6.5 10.5H11"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChatLinks({ links }: { links: ChatLink[] }) {
  return (
    <div className={styles.links}>
      {links.map((link) => {
        const internal =
          link.href.startsWith("/") || link.href.startsWith("#");

        if (internal) {
          return (
            <Link className={styles.link} href={link.href} key={link.href}>
              {link.label}
            </Link>
          );
        }

        return (
          <a
            className={styles.link}
            href={link.href}
            key={link.href}
            {...(link.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {link.label}
          </a>
        );
      })}
    </div>
  );
}

export function Chatbot() {
  const pathname = usePathname();
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: "assistant",
      text: CHAT_WELCOME.text,
      suggestions: CHAT_WELCOME.suggestions,
    },
  ]);
  const [typing, setTyping] = useState<TypingState | null>(null);
  const nextId = useRef(2);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const messagesRef = useRef<HTMLDivElement | null>(null);
  const typingId = typing?.id ?? null;

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (typingId === null) {
      return;
    }

    const timer = window.setInterval(() => {
      setTyping((current) => {
        if (!current) {
          return current;
        }

        const shown = current.text.slice(0, current.shown.length + REVEAL_CHARS);

        if (shown.length >= current.text.length) {
          return null;
        }

        return { ...current, shown };
      });
    }, REVEAL_INTERVAL);

    return () => window.clearInterval(timer);
  }, [typingId]);

  useEffect(() => {
    if (open) {
      messagesRef.current?.scrollTo({
        top: messagesRef.current.scrollHeight,
      });
    }
  }, [messages, open, typing?.shown]);

  if (pathname.startsWith("/world")) {
    return null;
  }

  function close() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  function sendMessage(value: string) {
    const text = value.trim();

    if (!text) {
      return;
    }

    const answer = answerPortfolioQuestion(text);
    const answerId = nextId.current++;

    setMessages((previous) => [
      ...previous,
      { id: nextId.current++, role: "user", text },
      {
        id: answerId,
        role: "assistant",
        text: answer.text,
        links: answer.links,
        suggestions: answer.suggestions,
      },
    ]);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTyping(null);
    } else {
      setTyping({ id: answerId, text: answer.text, shown: "" });
    }

    setInput("");
  }

  const lastAssistant = [...messages]
    .reverse()
    .find((message) => message.role === "assistant");

  return (
    <>
      {open ? (
        <aside
          id={panelId}
          className={styles.panel}
          role="dialog"
          aria-label="Portfolio assistant"
        >
          <header className={styles.header}>
            <div>
              <p className={styles.eyebrow}>Portfolio assistant</p>
              <p className={styles.status}>Local rules</p>
            </div>
            <button type="button" className={styles.close} onClick={close}>
              Close
            </button>
          </header>

          <div
            ref={messagesRef}
            className={styles.messages}
            role="log"
            aria-live="polite"
          >
            {messages.map((message) => {
              const isTyping = typing?.id === message.id;

              return (
                <div
                  className={`${styles.message} ${styles[message.role]}`}
                  key={message.id}
                >
                  <p className={styles.bubble}>
                    {isTyping ? typing.shown : message.text}
                    {isTyping ? (
                      <span className={styles.caret} aria-hidden="true" />
                    ) : null}
                  </p>
                  {!isTyping && message.links && message.links.length > 0 ? (
                    <ChatLinks links={message.links} />
                  ) : null}
                  {!isTyping &&
                  message.id === lastAssistant?.id &&
                  message.suggestions &&
                  message.suggestions.length > 0 ? (
                    <div className={styles.suggestions}>
                      {message.suggestions.map((suggestion) => (
                        <button
                          type="button"
                          className={styles.suggestion}
                          key={suggestion}
                          onClick={() => sendMessage(suggestion)}
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>

          <form
            className={styles.composer}
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage(input);
            }}
          >
            <label className={styles.srOnly} htmlFor={`${panelId}-input`}>
              Ask about the portfolio
            </label>
            <input
              ref={inputRef}
              id={`${panelId}-input`}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about the portfolio..."
              autoComplete="off"
              maxLength={200}
            />
            <button type="submit" disabled={!input.trim()}>
              Send
            </button>
          </form>

          <p className={styles.note}>
            Rule-based answers from this portfolio. No data leaves the page.
          </p>
        </aside>
      ) : null}

      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close portfolio assistant" : "Open portfolio assistant"}
        onClick={() => setOpen((value) => !value)}
      >
        <ChatIcon />
      </button>
    </>
  );
}
