const CACHE_NAME = 'sigon-earn-shell-v1';
const ASSETS_TO_CACHE = [
    './style.css',
    './script.js',
    './pricing.html',
    './pricing.js',
    './how-it-works.html',
    './faq.html',
    './faq.js',
    './services.html',
    './about.html',
    './contact.html',
    './reviews.html',
    './reviews.js',
    './manifest.webmanifest',
    './offline.html',
    './assets/icon-192.png',
    './assets/icon-512.png',
    './assets/ibrahim-alula-makokha.jpg'
];
const SCOPE_URL = self.registration.scope;
const HOME_URL = new URL('./index.html', SCOPE_URL).href;
const HOME_ROOT_URL = new URL('./', SCOPE_URL).href;
const HOW_IT_WORKS_URL = new URL('./how-it-works.html', SCOPE_URL).href;
const FAQ_URL = new URL('./faq.html', SCOPE_URL).href;
const SERVICES_URL = new URL('./services.html', SCOPE_URL).href;
const ABOUT_URL = new URL('./about.html', SCOPE_URL).href;
const CONTACT_URL = new URL('./contact.html', SCOPE_URL).href;
const REVIEWS_URL = new URL('./reviews.html', SCOPE_URL).href;
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

                if (url.href === HOW_IT_WORKS_URL) {
                    const howItWorksPage = await cache.match(HOW_IT_WORKS_URL);
                    if (howItWorksPage) {
                        return howItWorksPage;
                    }
                }

                if (url.href === FAQ_URL) {
                    const faqPage = await cache.match(FAQ_URL);
                    if (faqPage) {
                        return faqPage;
                    }
                }

                for (const pageUrl of [SERVICES_URL, ABOUT_URL, CONTACT_URL, REVIEWS_URL]) {
                    if (url.href === pageUrl) {
                        const cachedPage = await cache.match(pageUrl);
                        if (cachedPage) {
                            return cachedPage;
                        }
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
