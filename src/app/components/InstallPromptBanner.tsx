"use client";
import { useState } from "react";
import { useInstallPrompt } from "../hooks/useInstallPrompt";

export default function InstallPromptBanner() {
  const { canInstall, triggerInstall } = useInstallPrompt();
  const [isBannerShown, setIsBannerShown] = useState(true);

  if (!canInstall) return null;

  return isBannerShown ? (
    <div
      style={{
        background: "#1e1e1e",
        color: "white",
        padding: "0.5rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 9999,
        height: "2rem",
      }}
    >
      <span>📲 Installez cette application sur votre appareil !</span>
      <span style={{ display: "flex", gap: "0.1rem" }}>
        <button
          onClick={triggerInstall}
          style={{
            background: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            padding: "3px 8px 3px 8px",
            cursor: "pointer",
            marginLeft: "1rem",
          }}
        >
          Installer
        </button>
        <button
          onClick={() => setIsBannerShown(false)}
          style={{
            border: "none",
            borderRadius: "4px",
            padding: "3px 8px 3px 8px",
            cursor: "pointer",
            marginLeft: "1rem",
          }}
        >
          X
        </button>
      </span>
    </div>
  ) : null;
}
