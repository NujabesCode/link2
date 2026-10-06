"use client";

import { useEffect } from "react";

type ToastProps = {
  message: string;
  onClose: () => void;
  variant?: "error" | "success";
  duration?: number;
};

// Fixed at the top center. Give it a fresh `key` to replay it for a repeated message.
export default function Toast({ message, onClose, variant = "error", duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div
      role={variant === "error" ? "alert" : "status"}
      className="toast fixed top-5 left-1/2 z-50 flex max-w-[calc(100%-40px)] -translate-x-1/2 items-center gap-2 rounded-xl bg-[var(--text)] px-5 py-3.5 text-[15px] leading-[1.4] font-bold text-white shadow-[0_8px_32px_rgba(0,0,0,0.16)]"
    >
      <span
        className={`size-2 shrink-0 rounded-full ${variant === "error" ? "bg-[var(--error)]" : "bg-[var(--accent-brand)]"}`}
        aria-hidden
      />
      {message}
    </div>
  );
}
