"use client";
import { createContext, useContext, useState } from "react";

type NotificationPayload = {
  title: string;
  body: string;
  url: string;
} | null;

const NotificationContext = createContext<{
  notification: NotificationPayload;
  setNotification: (n: NotificationPayload) => void;
}>({
  notification: null,
  setNotification: () => {},
});

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notification, setNotification] = useState<NotificationPayload>(null);
  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => useContext(NotificationContext);
