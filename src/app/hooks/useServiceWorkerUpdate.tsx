"use client";
import { useEffect, useState } from "react";

export function useServiceWorkerUpdate() {
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(
    null
  );
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker.ready.then((registration) => {
      registration.addEventListener("updatefound", () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener("statechange", () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              setWaitingWorker(newWorker);
              setUpdateAvailable(true);
            }
          });
        }
      });
    });
  }, []);

  const update = () => {
    waitingWorker?.postMessage({ type: "SKIP_WAITING" });
    window.location.reload();
  };

  return { updateAvailable, update };
}
