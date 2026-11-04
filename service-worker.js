const CACHE_NAME = 'sigon-earn-shell-v1';
const ASSETS_TO_CACHE = [
    './style.css',
    './script.js',
    './manifest.webmanifest',
    './offline.html',
    './assets/icon-192.png',
    './assets/icon-512.png',
    './assets/ibrahim-alula-makokha.jpg'
];
const SCOPE_URL = self.registration.scope;
const HOME_URL = new URL('./index.html', SCOPE_URL).href;
const HOME_ROOT_URL = new URL('./', SCOPE_URL).href;
const OFFLINE_URL = new URL('./offline.html', SCOPE_URL).href;
const PUBLIC_ASSETS = new Map(
    ASSETS_TO_CACHE.map(asset => {
        const url = new URL(asset, SCOPE_URL);
        return [url.pathname, url.href];
    })
);

function isHomePage(url) {
    return !url.search && (url.href === HOME_URL || url.href === HOME_ROOT_URL);
}

function isPublicResponse(response) {
    const cacheControl = response.headers.get('Cache-Control') || '';
    return response.ok &&
        !/\b(private|no-store)\b/i.test(cacheControl) &&
        !response.headers.has('Set-Cookie');
}

self.addEventListener('install', event => {
    event.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME);
        const requests = ASSETS_TO_CACHE.map(asset =>
            new Request(new URL(asset, SCOPE_URL), { cache: 'reload' }));
        await cache.addAll(requests);
        await self.skipWaiting();
    })());
});

self.addEventListener('activate', event => {
    event.waitUntil((async () => {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames
            .filter(name => name.startsWith('sigon-earn-') && name !== CACHE_NAME)
            .map(name => caches.delete(name)));
        await self.clients.claim();
    })());
});

self.addEventListener('fetch', event => {
    const request = event.request;
    const url = new URL(request.url);

    if (request.method !== 'GET' || url.origin !== self.location.origin) {
        return;
    }

    if (request.mode === 'navigate') {
        event.respondWith((async () => {
            let response;
            try {
                response = await fetch(request, { cache: 'no-cache' });
            } catch (error) {
                const cache = await caches.open(CACHE_NAME);

                if (isHomePage(url)) {
                    const homePage = await cache.match(HOME_URL);
                    if (homePage) {
                        return homePage;
                    }
                }

                const offlinePage = await cache.match(OFFLINE_URL);
                if (offlinePage) {
                    return offlinePage;
                }

                throw error;
            }

            if (isHomePage(url) && isPublicResponse(response)) {
                try {
                    const cache = await caches.open(CACHE_NAME);
                    await cache.put(HOME_URL, response.clone());
                } catch (error) {
                    console.error('Unable to cache the public Sigon homepage:', error);
                }
            }

            return response;
        })());
        return;
    }

    if (url.search || request.headers.has('Authorization')) {
        return;
    }

    const assetUrl = PUBLIC_ASSETS.get(url.pathname);
    if (!assetUrl) {
        return;
    }

    event.respondWith((async () => {
        let response;
        try {
            response = await fetch(request, { cache: 'no-cache' });
        } catch (error) {
            const cache = await caches.open(CACHE_NAME);
            const cachedAsset = await cache.match(assetUrl);
            if (cachedAsset) {
                return cachedAsset;
            }
            throw error;
        }

        if (isPublicResponse(response)) {
            try {
                const cache = await caches.open(CACHE_NAME);
                await cache.put(assetUrl, response.clone());
            } catch (error) {
                console.error('Unable to update a cached public Sigon asset:', error);
            }
        }

        return response;
    })());
});
