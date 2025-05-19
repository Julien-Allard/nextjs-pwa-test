"use client";
import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

export function useInstallPrompt() {
  const [installPromptEvent, setInstallPromptEvent] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [canInstall, setCanInstall] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPromptEvent(e as BeforeInstallPromptEvent);
      setCanInstall(true);
    };

    window.addEventListener("beforeinstallprompt", handler as EventListener);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handler as EventListener
      );
    };
  }, []);

  const triggerInstall = () => {
    if (installPromptEvent) {
      installPromptEvent.prompt();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      installPromptEvent.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === "accepted") {
          console.log("✅ User accepted the install prompt");
        } else {
          console.log("🚫 User dismissed the install prompt");
        }
        setInstallPromptEvent(null);
        setCanInstall(false);
      });
    }
  };

  return { canInstall, triggerInstall };
}
