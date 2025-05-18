import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() =>
      initializeApp({ projectId: "airline-booking-app-2baaa", appId: "1:222563646977:web:ffd132b57dbf6211c70a00", storageBucket: "airline-booking-app-2baaa.firebasestorage.app", apiKey: "AIzaSyAKMwgKjEIAyaeI4Xty9Im0aTBjUQR3OJA", authDomain: "airline-booking-app-2baaa.firebaseapp.com", messagingSenderId: "222563646977" })), provideAuth(() =>
        getAuth()), provideFirestore(() => getFirestore()),
  ]
};
