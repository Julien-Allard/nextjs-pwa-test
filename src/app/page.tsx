// import Image from "next/image";
import { FC } from "react";

import styles from "./page.module.css";
import QRCodeScanner from "./components/QRCodeScanner";
import InitPushNotifications from "./components/InitPushNotifications";
import SendPushTest from "./components/SendPushTest";
import InstallPromptBanner from "./components/InstallPromptBanner";
import DownloadFile from "./components/DownloadFile";
import UpdatePromptBanner from "./components/UpdatePromptBanner";

const Home: FC = () => {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.1rem",
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          <UpdatePromptBanner />
          <InstallPromptBanner />
        </div>
        {/* <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol>
          <li>
            Get started by editing <code>src/app/page.tsx</code>.
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.logo}
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Read our docs
          </a>
        </div> */}
        <div className={styles.scanner}>
          <p>Test du lecteur de QR codes</p>
          <QRCodeScanner />
        </div>
        <div className={styles.pushNotifications}>
          <p>Test des push notifications Firebase</p>
          <SendPushTest />
          <InitPushNotifications />
        </div>
        <div className={styles.pushNotifications}>
          <p>Test téléchargement de fichiers</p>
          <DownloadFile />
        </div>
      </main>
      <footer className={styles.footer}>
        <span>Next.js powered Progressive Web App</span>
        <a
          href="https://www.monecho.com/medifile"
          target="_blank"
          className={styles.secondary}
        >
          by MonEcho
        </a>
      </footer>
    </div>
  );
};

export default Home;
