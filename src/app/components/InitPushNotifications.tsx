"use client";
import { useEffect, useState } from "react";
import { usePushNotifications } from "../hooks/usePushNotifications";
import styles from "./InitPushNotifications.module.css";
import { useRouter } from "next/navigation";

export default function InitPushNotifications() {
  const { FCMToken, notificationObject, setNotificationObject } =
    usePushNotifications();
  const [isTokenCopied, setIsTokenCopied] = useState(false);

  const router = useRouter();

  useEffect(() => {
    console.log(notificationObject);
  }, [notificationObject]);

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
      <div style={{ position: "relative" }}>
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
        {notificationObject ? (
          <div
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              padding: 16,
              background: "#333",
              color: "#fff",
              borderRadius: 8,
              boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
              zIndex: 9999,
            }}
          >
            <strong>{notificationObject.title}</strong>
            <p>{notificationObject.body}</p>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => {
                  router.push(notificationObject.url);
                  setNotificationObject(null);
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
                onClick={() => setNotificationObject(null)}
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
      </div>
    </>
  );
}
