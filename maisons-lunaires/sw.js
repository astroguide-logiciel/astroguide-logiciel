/* Service worker — Maisons lunaires (Astroguide)
   - Pages et fichiers du site : « réseau d'abord » (toujours la dernière version
     si on est connecté), copie en cache seulement hors-ligne.
   - Moteur Swiss Ephemeris et polices (CDN, versions figées) : cache d'abord. */
const CACHE = 'lunaire-v4';
const SHELL = [
  './', './index.html', './manifest.webmanifest',
  './icon-192.png', './icon-512.png', './apple-touch-icon.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(SHELL.map(u => new Request(u, { cache: 'reload' }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function store(req, res){
  if (res && (res.ok || res.type === 'opaque')) {
    const copy = res.clone();
    caches.open(CACHE).then(c => c.put(req, copy));
  }
  return res;
}

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === location.origin;
  const isCDN = url.hostname === 'cdn.jsdelivr.net'
             || url.hostname === 'fonts.googleapis.com'
             || url.hostname.endsWith('gstatic.com');

  if (sameOrigin) {
    // Réseau d'abord, sans passer par le cache HTTP ; cache seulement hors-ligne.
    e.respondWith(
      fetch(req, { cache: 'no-store' })
        .then(res => store(req, res))
        .catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
    );
    return;
  }
  if (isCDN) {
    e.respondWith(
      caches.match(req).then(cached => cached || fetch(req).then(res => store(req, res)))
    );
  }
});
