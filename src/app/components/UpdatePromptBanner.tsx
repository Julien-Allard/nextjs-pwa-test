"use client";
import { useServiceWorkerUpdate } from "../hooks/useServiceWorkerUpdate";

export default function UpdatePromptBanner() {
  const { updateAvailable, update } = useServiceWorkerUpdate();

  if (!updateAvailable) return null;

  return (
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
      <span>🔄 Une nouvelle version est disponible</span>
      <button
        onClick={update}
        style={{
          marginLeft: 12,
          padding: "3px 8px 3px 8px",
          background: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
        }}
      >
        Recharger
      </button>
    </div>
  );
}
