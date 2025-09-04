// self.__precacheManifest = [].concat(self.__precacheManifest || []);
// workbox.precaching.suppressWarnings();
// workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
//
// self.addEventListener("message", msg => {
//     if (msg.data.action == 'skipWaiting') {
//         self.skipWaiting()
//     }
// })

import {precacheAndRoute} from 'workbox-precaching';

precacheAndRoute(self.__WB_MANIFEST);

// Choose a cache name
const cacheName = 'cache-v1';
// List the files to precache
const precacheResources = ['/', '/index.html'];

// When the service worker is installing, open the cache and add the precache resources to it
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            return cache.addAll(
                precacheResources
            )
        }));
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // Retorna a resposta em cache, se estiver disponível
            // Caso contrário, faz uma solicitação à rede
            return response || fetch(event.request);
        })
    );
});

// When there's an incoming fetch request, try and respond with a precached resource, otherwise fall back to the network
// self.addEventListener('fetch', (event) => {
//     console.log('Fetch intercepted for:', event.request.url);
//     event.respondWith(
//         caches.match(event.request).then((cachedResponse) => {
//             if (cachedResponse) {
//                 return cachedResponse;
//             }
//             return fetch(event.request);
//         }),
//     );
// });