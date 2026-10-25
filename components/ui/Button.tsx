import type { ReactNode } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}

export function Button({
  href,
  children,
  variant = "primary",
  className,
}: ButtonProps) {
  const isExternal = href.startsWith("http");

  return (
    <a
      href={href}
      className={[styles.button, styles[variant], className]
        .filter(Boolean)
        .join(" ")}
      {...(isExternal
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      {children}
      {isExternal ? <span aria-hidden="true">↗</span> : null}
    </a>
  );
}
