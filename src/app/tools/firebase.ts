import { initializeApp } from "firebase/app";
import { getMessaging, isSupported } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyDY-A3k0FgYdYJ7ZjVBXGrGjApt_gyu3Hw",
  authDomain: "next-pwa-testing.firebaseapp.com",
  projectId: "next-pwa-testing",
  storageBucket: "next-pwa-testing.firebasestorage.app",
  messagingSenderId: "521730972662",
  appId: "1:521730972662:web:bef7c83420a384a7f205d7",
};

const firebaseApp = initializeApp(firebaseConfig);

// Check if FCM is supported in the current browser
const messagingPromise = isSupported().then((supported) =>
  supported ? getMessaging(firebaseApp) : null
);

export { firebaseApp, messagingPromise };
