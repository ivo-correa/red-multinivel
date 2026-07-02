import * as admin from 'firebase-admin';

export const firebaseApp = admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});
