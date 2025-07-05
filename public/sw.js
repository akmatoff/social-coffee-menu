const CACHE_NAME = "social-coffee-v1";

const urlsToCache = [
  "/",
  "/menyu",
  "/bar",
  "/detskoe-menyu",
  "/background-image.png",
  "/favicon.ico",
  "/hero-background.png",
  "/social-coffee-logo-text.png",
  "/social-coffee-logo.png",
  "/social-coffee-logo.svg",
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
      caches.match(request).then((cached) => {
        return cached || fetch(request);
      })
    );

    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => cached || fetch(request))
  );
});
