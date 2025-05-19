"use client";
import { useEffect, useState } from "react";
import styles from "./InitPushNotifications.module.css";
import { useRouter } from "next/navigation";

interface InitPushNotificationsType {
  FCMToken: string | null;
  notificationObject: {
    title: string;
    body: string;
    url: string;
  } | null;
  handleNotficationObjectDeletion: () => void;
}

export default function InitPushNotifications(
  props: InitPushNotificationsType
) {
  const { FCMToken, notificationObject, handleNotficationObjectDeletion } =
    props;
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
        {notificationObject ? (
          <div
            style={{
              // position: "absolute",
              // top: 20,
              // right: 20,
              padding: 16,
              background: "#333",
              color: "#fff",
              borderRadius: 8,
              zIndex: 9999,
            }}
          >
            <strong>{notificationObject.title}</strong>
            <p>{notificationObject.body}</p>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => {
                  router.push(notificationObject.url);
                  handleNotficationObjectDeletion();
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
                onClick={() => handleNotficationObjectDeletion()}
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
