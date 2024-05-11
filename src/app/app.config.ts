import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';


export const BASE_URL = 'http://192.168.10.10:8080';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    
    importProvidersFrom(
      HttpClientModule
    )
  ]
};
