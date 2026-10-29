"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`inline-flex items-center justify-center font-bold transition disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
    >
      {pending ? "Salvando..." : children}
    </button>
  );
}
