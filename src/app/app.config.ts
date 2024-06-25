import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// export const BASE_URL = 'http://192.168.0.100:8080';
export const BASE_URL = 'http://localhost:8080';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),

    importProvidersFrom(HttpClientModule),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'loginlacteos',
        appId: '1:653223671625:web:1f762a68ce989f8d63cc98',
        storageBucket: 'loginlacteos.appspot.com',
        apiKey: 'AIzaSyCxw2PnP4tEAHhQ279RzELbbN75YrQKysE',
        authDomain: 'loginlacteos.firebaseapp.com',
        messagingSenderId: '653223671625',
      })
    ),
    provideAuth(() => getAuth()), provideAnimationsAsync(),
  ],
};
