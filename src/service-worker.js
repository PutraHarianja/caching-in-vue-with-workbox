/* eslint-disable no-console */

// const { precacheAndRoute } = workbox.precaching;
// const { registerRoute } = workbox.routing;
// const { CacheFirst, StaleWhileRevalidate } = workbox.strategies;
// const { Plugin: ExpirationPlugin } = workbox.expiration;
// const { Plugin: CacheableResponsePlugin } = workbox.cacheableResponse;

import {  precacheAndRoute } from "workbox-precaching";
import {  registerRoute } from "workbox-routing";
import {  CacheFirst, StaleWhileRevalidate } from "workbox-strategies";
import {  ExpirationPlugin } from "workbox-expiration";
import {  CacheableResponsePlugin } from "workbox-cacheable-response";
import {  setCacheNameDetails} from "workbox-core";


const assets = [
    '/',
    '/index.html',
    // '/js/*',
    // '/css/*'
];


setCacheNameDetails({ prefix: "appname" });

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// self.__precacheManifest = [].concat(self.__precacheManifest || []);
precacheAndRoute(self.__WB_MANIFEST);

// CacheFirst cache from the cache if it exists or go to the network
registerRoute(
  ({ request }) => request.destination === "image",
  new CacheFirst({
    cacheName: "images",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 2 * 24 * 60 * 60, // cache for only 2 days
      }),
    ],
  })
);

// install sw
self.addEventListener('install', evt => {
    // console.log('service worker has been installed');
    evt.waitUntil(
        caches.open('assets').then(cache => {
            console.log('catching shell assets');
            return cache.addAll(assets);
        })
    )
})

// fetch event
self.addEventListener('fetch', evt => {
    console.log('fetch event'), evt;
});


// Get response from Workbox API (?) (?)
registerRoute(
    ({ url }) => url.pathname.startsWith("https://dog.ceo/api/"),
    new StaleWhileRevalidate()
  );
