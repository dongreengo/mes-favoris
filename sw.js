const C='mes-favoris-v1';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png'])));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
  const u=new URL(e.request.url);
  if(u.origin===location.origin&&u.pathname.endsWith('index.html')&&u.search){e.respondWith(caches.match('./index.html').then(r=>r||fetch(e.request)));return}
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))});
