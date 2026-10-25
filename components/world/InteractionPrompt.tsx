"use client";

import type { Interactable } from "@/types/world";
import styles from "./InteractionPrompt.module.css";

interface InteractionPromptProps {
  target: Interactable | null;
  onInteract: () => void;
}

export function InteractionPrompt({
  target,
  onInteract,
}: InteractionPromptProps) {
  if (!target) {
    return null;
  }

  return (
    <button type="button" className={styles.prompt} onClick={onInteract}>
      <kbd className={styles.key}>E</kbd>
      <span className={styles.title}>{target.title}</span>
      <span className={styles.hint}>Interact</span>
    </button>
  );
}
