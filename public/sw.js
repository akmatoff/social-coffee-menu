const CACHE_NAME = "social-coffee-v2";

const API_CACHE_NAME = "api-cache";

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

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  // For navigation requests (HTML pages)
  if (request.mode === "navigate") {
    event.respondWith(
      caches.match(request).then((cached) => cached || fetch(request))
    );
    return;
  }

  // Cache-first for static assets and images
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
            caches
              .open(CACHE_NAME)
              .then((cache) => cache.put(request, responseClone));
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // Network-first for API calls (assuming your API URLs include /api/)
  if (request.url.includes("/api/") && request.method === "GET") {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse.ok) {
            const responseClone = networkResponse.clone();
            caches
              .open(API_CACHE_NAME)
              .then((cache) => cache.put(request, responseClone));
          }
          return networkResponse;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Default fallback: cache-first for other GET requests (e.g. html partials, json etc)
  if (request.method === "GET") {
    event.respondWith(
      caches.match(request).then((cached) => {
        return cached || fetch(request);
      })
    );
  }
});
