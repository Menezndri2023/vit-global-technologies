"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

/** Codes d'erreur métier renvoyés par les API publiques et affichés de façon explicite. */
export type FormErrorCode =
  | "too_many_requests"
  | "slot_taken"
  | "date_in_past"
  | "date_too_far"
  | "FILE_TOO_LARGE"
  | "FILE_TYPE_NOT_ALLOWED"
  | "FILE_CONTENT_MISMATCH"
  | null;

const KNOWN_CODES = new Set([
  "too_many_requests",
  "slot_taken",
  "date_in_past",
  "date_too_far",
  "FILE_TOO_LARGE",
  "FILE_TYPE_NOT_ALLOWED",
  "FILE_CONTENT_MISMATCH"
]);

export function useFormSubmit(endpoint: string) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorCode, setErrorCode] = useState<FormErrorCode>(null);

  async function submit(payload: Record<string, unknown> | FormData) {
    setStatus("submitting");
    setErrorCode(null);
    try {
      const isFormData = payload instanceof FormData;
      const res = await fetch(endpoint, {
        method: "POST",
        headers: isFormData ? undefined : { "Content-Type": "application/json" },
        body: isFormData ? payload : JSON.stringify(payload)
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        const code = res.status === 413 ? "FILE_TOO_LARGE" : typeof data?.error === "string" ? data.error : null;
        setErrorCode(code && KNOWN_CODES.has(code) ? (code as FormErrorCode) : null);
        throw new Error("request failed");
      }
      setStatus("success");
      return true;
    } catch {
      setStatus("error");
      return false;
    }
  }

  return { status, errorCode, submit, reset: () => setStatus("idle") };
}
