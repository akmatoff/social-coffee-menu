const CACHE_NAME = "social-coffee-v1";

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
  "/detskoye-menyu?lang=ru",
  "/detskoye-menyu?lang=ky",
  "/detskoye-menyu?lang=en",
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
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.mode === "navigate") {
    event.respondWith(
      caches.match(request.url).then((cached) => {
        return cached || fetch(request);
      })
    );

    return;
  }

  if (request.method === "GET" && request.destination !== "document") {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          // Clone response so we can cache it
          const responseClone = networkResponse.clone();
          caches.open(API_CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
          return networkResponse;
        })
        .catch(() => {
          // On network failure, try to serve from cache
          return caches.match(request.url);
        })
    );
    return; // stop here
  }

  event.respondWith(
    caches.match(request.url).then((cached) => cached || fetch(request))
  );
});
