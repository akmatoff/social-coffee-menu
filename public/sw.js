const CACHE_NAME = "social-coffee-v2";
const API_CACHE_NAME = "api-cache-v2";

const urlsToCache = [
  "/",
  "/menyu",
  "/bar",
  "/detskoe-menyu",
  "/menyu?lang=ru",
  "/menyu?lang=ky",
  "/menyu?lang=en",
  "/?lang=ru",
  "/?lang=ky",
  "/?lang=en",
  "/bar?lang=ru",
  "/bar?lang=ky",
  "/bar?lang=en",
  "/detskoe-menyu?lang=ru",
  "/detskoe-menyu?lang=ky",
  "/detskoe-menyu?lang=en",
  "/background-image.png",
  "/favicon.ico",
  "/hero-background.png",
  "/social-coffee-logo-text.png",
  "/social-coffee-logo.png",
  "/social-coffee-logo.svg",
  "/close.svg",
  "/hamburger.svg",
  "https://db.onlinewebfonts.com/t/06b73c421b7c269c7a0cb40df0daba21.eot",
  "https://db.onlinewebfonts.com/t/06b73c421b7c269c7a0cb40df0daba21.eot?#iefix",
  "https://db.onlinewebfonts.com/t/06b73c421b7c269c7a0cb40df0daba21.woff2",
  "https://db.onlinewebfonts.com/t/06b73c421b7c269c7a0cb40df0daba21.woff",
  "https://db.onlinewebfonts.com/t/06b73c421b7c269c7a0cb40df0daba21.ttf",
  "https://db.onlinewebfonts.com/t/06b73c421b7c269c7a0cb40df0daba21.svg#FuturaDemiC",
];

// Install: cache app shell
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

// Activate: remove old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((key) => {
          if (key !== CACHE_NAME && key !== API_CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch handler
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // 1. Network-first for navigations (HTML pages)
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          // Update cache
          if (networkResponse.ok) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // Fallback if offline
          return caches.match(request);
        })
    );
    return;
  }

  // 2. Cache-first for static assets (images, styles, scripts, fonts)
  if (
    request.destination === "image" ||
    request.destination === "style" ||
    request.destination === "script" ||
    request.destination === "font"
  ) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((networkResponse) => {
          if (networkResponse.ok) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // 3. Network-first for dynamic API data (GET only)
  if (request.url.includes("/api/") && request.method === "GET") {
    event.respondWith(
      (async () => {
        const reqClone = request.clone();
        const acceptLang = reqClone.headers.get("Accept-Language") || "ru";

        const cacheKey = new Request(request.url + "::lang=" + acceptLang);
        const cache = await caches.open(API_CACHE_NAME);

        try {
          const networkResponse = await fetch(request);
          if (networkResponse.ok) {
            const responseClone = networkResponse.clone();
            await cache.put(cacheKey, responseClone);
          }
          return networkResponse;
        } catch (err) {
          const cachedResponse = await cache.match(cacheKey);
          return cachedResponse || new Response("Offline", { status: 503 });
        }
      })()
    );
    return;
  }

  // 4. Network-first fallback for everything else
  if (request.method === "GET") {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse.ok) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => caches.match(request))
    );
  }
});
