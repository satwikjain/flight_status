// firebase.js
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestFirebaseNotificationPermission = () =>
  new Promise((resolve, reject) => {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        getToken(messaging, { vapidKey: 'YOUR_PUBLIC_VAPID_KEY' })
          .then((currentToken) => {
            if (currentToken) {
              resolve(currentToken);
            } else {
              console.log('No registration token available. Request permission to generate one.');
              reject('No registration token available.');
            }
          })
          .catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
            reject(err);
          });
      } else {
        reject('Notification permission not granted.');
      }
    });
  });

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

export default messaging;
