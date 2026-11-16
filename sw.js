// Service worker: guarda o app no celular para funcionar sem internet.
const CACHE='tfm-aquecimento-ea760229a0';
const FILES=["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "icon-maskable-512.png", "apple-touch-icon.png", "vozes/pedra.json"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES.map(f=>new Request(f,{cache:'reload'})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==CACHE).map(n=>caches.delete(n)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(hit=>hit||fetch(e.request).then(res=>{
    if(res.ok&&new URL(e.request.url).origin===location.origin){const copy=res.clone();caches.open(CACHE).then(c=>c.put(e.request,copy))}
    return res;
  }).catch(()=>caches.match('index.html'))));
});
