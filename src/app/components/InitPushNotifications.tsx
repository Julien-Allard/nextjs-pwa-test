"use client";
import { useState } from "react";
import { usePushNotifications } from "../hooks/usePushNotifications";
import styles from "./InitPushNotifications.module.css";
import { useRouter } from "next/navigation";
import { useNotificationContext } from "../context/NotificationContext";

export default function InitPushNotifications() {
  const { notification, setNotification } = useNotificationContext();
  const { FCMToken } = usePushNotifications();
  const [isTokenCopied, setIsTokenCopied] = useState(false);

  const router = useRouter();

  const handleCopyToClipboard = (text: string | null) => {
    if (text) {
      navigator.clipboard.writeText(text);
      setIsTokenCopied(true);
    } else {
      setIsTokenCopied(false);
    }
  };

  return (
    <>
      <div>
        {notification ? (
          <div
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              padding: 16,
              background: "#333",
              color: "#fff",
              borderRadius: 8,
              zIndex: 9999,
            }}
          >
            <strong>{notification.title}</strong>
            <p>{notification.body}</p>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => {
                  router.push(notification.url);
                  setNotification(null);
                }}
                style={{
                  borderRadius: 10,
                  borderColor: "transparent",
                  backgroundColor: "#ccc",
                  color: "black",
                  padding: "5px",
                  marginTop: "10px",
                }}
              >
                Aller voir
              </button>
              <button
                onClick={() => setNotification(null)}
                style={{
                  borderRadius: 10,
                  borderColor: "transparent",
                  backgroundColor: "#ccc",
                  color: "black",
                  padding: "5px",
                  marginTop: "10px",
                }}
              >
                Ignorer
              </button>
            </div>
          </div>
        ) : null}
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
    </>
  );
}
