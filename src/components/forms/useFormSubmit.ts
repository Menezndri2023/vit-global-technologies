"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export function useFormSubmit(endpoint: string) {
  const [status, setStatus] = useState<Status>("idle");

  async function submit(payload: Record<string, unknown> | FormData) {
    setStatus("submitting");
    try {
      const isFormData = payload instanceof FormData;
      const res = await fetch(endpoint, {
        method: "POST",
        headers: isFormData ? undefined : { "Content-Type": "application/json" },
        body: isFormData ? payload : JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
      return true;
    } catch {
      setStatus("error");
      return false;
    }
  }

  return { status, submit, reset: () => setStatus("idle") };
}
