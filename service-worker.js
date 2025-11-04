
// service-worker.js

self.addEventListener('push', event => {
  const options = {
    body: '☀️ Tu mensaje diario está listo para ti. Ábrelo para empezar el día con una mentalidad positiva.',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [200, 100, 200],
    tag: 'amaneceria-notification',
    renotify: true,
    actions: [
      { action: 'open_app', title: 'Abrir App' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('AmanecerIA', options)
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      if (clientList.length > 0) {
        let client = clientList[0];
        for (let i = 0; i < clientList.length; i++) {
          if (clientList[i].focused) {
            client = clientList[i];
          }
        }
        return client.focus();
      }
      return clients.openWindow('/');
    })
  );
});
