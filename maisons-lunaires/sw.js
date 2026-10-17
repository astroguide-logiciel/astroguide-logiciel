/* Service worker — Maisons lunaires (Astroguide)
   Stratégie : « stale-while-revalidate ». La coquille locale et les ressources
   CDN (moteur Swiss Ephemeris, polices) sont mises en cache au fil des visites ;
   une connexion est requise au premier chargement, puis l'app fonctionne hors-ligne. */
const CACHE = 'lunaire-v2';
const SHELL = [
  './', './index.html', './manifest.webmanifest',
  './icon-192.png', './icon-512.png', './apple-touch-icon.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === location.origin;
  const isCDN = url.hostname === 'cdn.jsdelivr.net'
             || url.hostname === 'fonts.googleapis.com'
             || url.hostname.endsWith('gstatic.com');
  if (!sameOrigin && !isCDN) return; // tout le reste suit le comportement normal du navigateur

  e.respondWith(
    caches.match(req).then(cached => {
      const network = fetch(req).then(res => {
        if (res && (res.ok || res.type === 'opaque')) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
        }
        return res;
      }).catch(() => cached);
      return cached || network;
    })
  );
});
