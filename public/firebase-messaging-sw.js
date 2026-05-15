importScripts('https://www.gstatic.com/firebasejs/10.9.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.9.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyDeDYgLcPzSfin5xjXYBbxh4VAE-jyW468",
  authDomain: "shahynatural-552f5.firebaseapp.com",
  projectId: "shahynatural-552f5",
  storageBucket: "shahynatural-552f5.firebasestorage.app",
  messagingSenderId: "286511620472",
  appId: "1:286511620472:web:bc3f0bb0a361a22ac6e88d"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title || 'GHAMBOLA Update';
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/favicon.ico'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
