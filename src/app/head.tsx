// app/head.tsx
export default function Head() {
  return (
    <>
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#317EFB" />
      <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-title" content="My Next.js PWA" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    </>
  );
}
