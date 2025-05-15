importScripts(
  "https://www.gstatic.com/firebasejs/10.10.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.10.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyDY-A3k0FgYdYJ7ZjVBXGrGjApt_gyu3Hw",
  authDomain: "next-pwa-testing.firebaseapp.com",
  projectId: "next-pwa-testing",
  storageBucket: "next-pwa-testing.appspot.com",
  messagingSenderId: "521730972662",
  appId: "1:521730972662:web:bef7c83420a384a7f205d7",
});

const messaging = firebase.messaging();

// Notifications avec app en arrière-plan
// Gestion des notifications avec app au premier-plan dans usePushNotifications.tsx
messaging.onBackgroundMessage(function (payload) {
  console.log("[firebase-messaging-sw.js] BG message:", payload);

  const title =
    payload.data?.title || payload.notification?.title || "Notification";
  const body = payload.data?.body || payload.notification?.body || "";
  const icon =
    payload.data?.icon || payload.notification?.icon || "/icons/icon-192.png";
  const url = payload.data?.url || "/";

  self.registration.showNotification(title, {
    body,
    icon,
    data: { url },
  });
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  const targetUrl = event.notification.data?.url || "/";

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url === targetUrl && "focus" in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(targetUrl);
        }
      })
  );
});
