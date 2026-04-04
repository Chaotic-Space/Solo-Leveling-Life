const CACHE_NAME = 'sl-life-v4';
const URLS = ['./index.html', './manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(URLS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});

// Background timer scheduling
const swTimers = {};

function scheduleTimer(t) {
  if (swTimers[t.id]) clearTimeout(swTimers[t.id]);
  swTimers[t.id] = setTimeout(() => {
    self.registration.showNotification(`⚔️ ${t.name}`, {
      body: `${t.desc} · +${t.xp} XP`,
      tag: t.id,
      renotify: true,
      vibrate: [200, 100, 200],
      icon: './icons/icon-192.png',
      badge: './icons/icon-192.png',
    });
    scheduleTimer(t); // reschedule
  }, t.intervalMs);
}

self.addEventListener('message', e => {
  if (!e.data) return;
  if (e.data.type === 'SCHEDULE_TIMERS') {
    // Clear all existing SW timers
    Object.keys(swTimers).forEach(k => { clearTimeout(swTimers[k]); delete swTimers[k]; });
    // Schedule new ones
    (e.data.timers || []).forEach(scheduleTimer);
  }
});

// Handle notification clicks — focus app or open it
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(cls => {
      const focused = cls.find(c => c.visibilityState === 'visible');
      if (focused) { focused.focus(); return; }
      if (cls.length > 0) { cls[0].focus(); return; }
      clients.openWindow('./');
    })
  );
});
