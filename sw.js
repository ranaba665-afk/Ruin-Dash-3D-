// Ruin Dash 3D service worker: the game itself is NOT cached, so it only opens with internet.
// Without internet it shows offline.html ("Please connect your internet or WiFi").
const C='rd-offline-v1',FILES=['offline.html','icon-192.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).catch(()=>caches.match('offline.html')))}});
