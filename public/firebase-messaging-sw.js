// Import the scripts for the Firebase Compat SDK
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in the messagingSenderId.
// For Firebase JS SDK v7.20.0 and later, the complete configuration is required.
const firebaseConfig = {
  apiKey: "AIzaSyBAp_7VuwcmboapyMucPVvLc8MEGIBj1qU",
  authDomain: "catatuang-expense-tracker.firebaseapp.com",
  projectId: "catatuang-expense-tracker",
  storageBucket: "catatuang-expense-tracker.firebasestorage.app",
  messagingSenderId: "1052038730344",
  appId: "1:1052038730344:web:b3f6c73dc0a143cbae21dd"
};

firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
const messaging = firebase.messaging();

// If you would like to customize the background notification, you can do so here.
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  const notificationTitle = payload.notification.title || 'CatatUang Notification';
  const notificationOptions = {
    body: payload.notification.body || 'You have a new update.',
    icon: '/android-chrome-192x192.png',
    badge: '/favicon-32x32.png',
    data: payload.data
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
