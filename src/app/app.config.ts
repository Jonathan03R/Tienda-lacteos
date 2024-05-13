import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';


export const BASE_URL = 'http://192.168.0.100:8080';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    
    importProvidersFrom(
      HttpClientModule
    )
  ]
};
