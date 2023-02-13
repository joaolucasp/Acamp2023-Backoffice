const cacheName = 'backoffice-v1';

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            cache.addAll([
                '../../index.html',
                'index.js',
                'manifest.webmanifest',
            ]);
        })
    );
    return self.skipWaiting();
});

self.addEventListener ( 'activate' ,  event  =>  {
    self.clients.claim();
});

self.addEventListener('fetch', async event => {
    const req = event.request;
    const url = new URL(req.url);

    if (url.origin === location.origin) {
        event.respondWith(cacheFirst(req));
    } else {
        event.respondWith(networkAndCache(req));
    }
});

async function cacheFirst(req) {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(req);

    return cachedResponse || fetch(req);
}

async function networkAndCache(req) {
    const cache = await caches.open(cacheName);
    try {
        const fresh = await fetch(req);
        await cache.put(req, fresh.clone());
        return fresh;
    } catch (e) {
        const cachedResponse = await cache.match(req);
        return cachedResponse;
    }
}