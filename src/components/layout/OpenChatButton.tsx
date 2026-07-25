"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";

export function OpenChatButton({ children, icon, className }: { children: ReactNode; icon?: ReactNode; className?: string }) {
  return (
    <Button
      type="button"
      variant="outline"
      className={className}
      icon={icon}
      onClick={() => window.dispatchEvent(new Event("vit:open-chat"))}
    >
      {children}
    </Button>
  );
}
