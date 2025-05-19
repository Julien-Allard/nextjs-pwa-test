This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
This is a test for a PWA (Progressive Web App). It contains the base skeleton for a working PWA which can be installed on any device.

The goal is to test :

- PWA structure and service workers
- push notifications with Firebase
- camera access and authorization with QR code scanner
- install prompt on any device/brower
- file download on any device/browser.

## 1 Run it :

#### Locally :

```bash
npm cleanStart
```

Then open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

#### Online :

This has been deployed on Netlify at [this address](https://nextpwatesting.netlify.app/).

## 2 Try it

#### - On a computer :

To the right of the URL bar you will have a litle icon looking like a computer with an arrow on it. If you put your mouse cursor on top of this icon you'll get the message "Installer My Next.js PWA". Click.
You'll get a prompt asking you if you want to install it, click on install.

#### - On a mobile/tablet device :

Click on the options menu (generally looks like 3 dots on top of each other) then on the "Add to homepage" option. You'll get a prompt asking you if you want to install it, click on install. It will ask you for installation permission if you never allowed it before, then download the app and add it on your mobile's homescreen.

## Powered by

[Next.js (Vercel)](https://nextjs.org/)

[next-pwa](https://www.npmjs.com/package/next-pwa)
