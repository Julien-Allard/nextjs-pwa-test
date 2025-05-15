"use client";
import { useState } from "react";
import styles from "./SendPushTest.module.css";

export default function SendPushTest() {
  const [token, setToken] = useState("");
  const [status, setStatus] = useState("");

  const handlePasteToken = () => {
    navigator.clipboard
      .readText()
      .then((text) => {
        setToken(text);
        setStatus("Token collé");
      })
      .catch((err) => {
        console.error("Failed to read clipboard contents: ", err);
        setStatus("Failed to paste token");
      });
  };

  const sendNotification = async () => {
    setStatus("Sending...");

    const res = await fetch("/api/send-push", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });

    const result = await res.json();
    setStatus(
      result.success ? "✅ Push envoyé" : `❌ ${result.error || "Failed"}`
    );
  };

  return (
    <div
      style={{
        marginTop: 24,
        marginBottom: 20,
        padding: 16,
        border: "1px solid #ccc",
        borderRadius: 8,
      }}
    >
      <input
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Copier le token ici"
        style={{ width: "100%", padding: 8 }}
      />
      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={handlePasteToken} className={styles.pushButton}>
          Coller le token
        </button>
        <button
          onClick={sendNotification}
          className={styles.pushButton}
          disabled={!token}
        >
          Envoyer push
        </button>
      </div>
      <p style={{ marginTop: 10 }}>{status}</p>
    </div>
  );
}
