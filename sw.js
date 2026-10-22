// 加工畑不良一覧表 Service Worker
// VERSION を変えると各端末が新しい版に切り替わります
const VERSION = "kakoubata-v2";
const FILES = ["./", "./index.html", "./config.js", "./bui.js", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png"];
const CDN = "https://cdnjs.cloudflare.com/ajax/libs/exceljs/4.4.0/exceljs.min.js";

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES).then(() => c.add(CDN).catch(() => {}))).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const u = new URL(e.request.url);
  if (e.request.method !== "GET") return;
  if (u.hostname.indexOf("script.google") >= 0 || u.hostname.indexOf("googleusercontent") >= 0) return; // 同期はキャッシュしない
  if (u.origin === location.origin) {
    // 画面と設定はネット優先（つながらないときは保存済みのもの）
    e.respondWith(fetch(e.request).then(r => { const cp = r.clone(); caches.open(VERSION).then(c => c.put(e.request, cp)); return r; })
      .catch(() => caches.match(e.request, {ignoreSearch: true}).then(r => r || caches.match("./index.html"))));
  } else if (e.request.url === CDN) {
    e.respondWith(caches.match(CDN).then(r => r || fetch(e.request).then(res => { const cp = res.clone(); caches.open(VERSION).then(c => c.put(CDN, cp)); return res; })));
  }
});
