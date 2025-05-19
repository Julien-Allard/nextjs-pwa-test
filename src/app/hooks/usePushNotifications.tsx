"use client";
import { useEffect, useState } from "react";
import { getToken, onMessage } from "firebase/messaging";
import { useRouter } from "next/navigation";

import { messagingPromise } from "@/app/tools/firebase";
import { useNotificationContext } from "../context/NotificationContext";

const vapidKey =
  "BJKf8cOnL9Ti6CLlZop0B1bjlqxXMn-Uaigzfy4PXVI8qT3DXbYNlNLkjsJkUmlvmUn2hrKW_M7ODr1WiDaXJWg";

export function usePushNotifications() {
  const [FCMToken, setFCMToken] = useState<string | null>(null);
  const { setNotification } = useNotificationContext();
  const router = useRouter();

  useEffect(() => {
    messagingPromise.then(async (messaging) => {
      const swReg = await navigator.serviceWorker.register(
        "/firebase-messaging-sw.js",
        { scope: "/firebase/" }
      );
      if (!messaging) return;

      // Notifications avec app au premier plan
      // Gestion des notifications avec app en arrière-plan dans firebase-messaging-sw.js
      onMessage(messaging, (payload) => {
        console.log("🔔 Foreground message:", payload);
        // alert(payload.data?.title || "New notification");
        const title =
          payload.data?.title || payload.notification?.title || "Notification";
        const body = payload.data?.body || payload.notification?.body || "";
        const icon =
          payload.data?.icon ||
          payload.notification?.icon ||
          "/icons/icon-192.png";
        const url = payload.data?.url || "/";

        // ✅ App is in foreground → use custom snackbar/modal
        setNotification({
          title,
          body,
          url,
          icon,
        });

        if (Notification.permission === "granted") {
          const notification = new Notification(title, {
            body,
            icon,
            data: { url },
          });

          notification.onclick = () => {
            if (window.location.pathname !== url) {
              router.push(url);
            }
            window.focus();
            notification.close();
          };
        } else {
          alert(title + "\n" + body);
        }
      });

      try {
        // ✅ Add delay to avoid race condition
        await new Promise((res) => setTimeout(res, 300));

        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
          console.warn("Permission not granted");
          return;
        }

        const token = await getToken(messaging, {
          vapidKey,
          serviceWorkerRegistration: swReg,
        });
        console.log("✅ FCM token:", token);
        setFCMToken(token);
      } catch (err) {
        console.error("Error getting token", err);
      }
    });
  }, [router, setNotification]);

  return { FCMToken };
}
