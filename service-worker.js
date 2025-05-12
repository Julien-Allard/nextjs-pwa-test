import { precacheAndRoute, cleanupOutdatedCaches } from "workbox-precaching";

// 1️⃣ Precache all your assets (including offline.html via additionalManifestEntries)
precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();

// 2️⃣ Always try network for navigations; if that fails, serve offline.html
self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((response) => response) // online: show the real page
        .catch(() => caches.match("/offline.html")) // offline: show fallback
    );
  }
});
