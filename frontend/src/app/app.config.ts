import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideMarkdown } from 'ngx-markdown';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideMarkdown(),
    provideRouter(routes),
    provideHttpClient()
  ],
};
