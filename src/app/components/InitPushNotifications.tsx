"use client";
import { useState } from "react";
import { usePushNotifications } from "../hooks/usePushNotifications";
import styles from "./InitPushNotifications.module.css";

export default function InitPushNotifications() {
  const { FCMToken } = usePushNotifications();
  const [isTokenCopied, setIsTokenCopied] = useState(false);

  const handleCopyToClipboard = (text: string | null) => {
    if (text) {
      navigator.clipboard.writeText(text);
      setIsTokenCopied(true);
    } else {
      setIsTokenCopied(false);
    }
  };

  return (
    <div>
      <p style={{ marginBottom: 10 }}>
        FCM Token: {""}
        <span className={styles.tokenAlert}>
          {isTokenCopied
            ? "(token copié)"
            : "(cliquez sur le token pour le copier)"}
        </span>{" "}
      </p>
      <p
        className={styles.token}
        onClick={() => handleCopyToClipboard(FCMToken)}
      >
        {FCMToken}
      </p>
    </div>
  );
}
