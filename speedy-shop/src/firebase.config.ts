import * as admin from 'firebase-admin';

const serviceAccount = require('../speedy-shop-a9684-firebase-adminsdk-s043i-ccf0b3f8b3.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const fcm = admin.messaging();
