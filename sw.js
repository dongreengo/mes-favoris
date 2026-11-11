const C='mes-favoris-v2';
const FILES=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET'||u.origin!==location.origin)return; // vignettes et infos : réseau direct
  // réseau d'abord (pour recevoir les mises à jour), copie locale si pas de connexion
  e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();if(r.ok&&!u.search)caches.open(C).then(c=>c.put(e.request,cp));return r})
    .catch(()=>caches.match(u.search?'./index.html':e.request).then(r=>r||caches.match('./index.html'))));
});
