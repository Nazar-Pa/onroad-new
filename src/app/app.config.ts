import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpTokenInterceptor } from './sevices/interceptor/http-token.interceptor';
import { errorInterceptor } from './sevices/interceptor/global-error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideHttpClient(
      withInterceptors([httpTokenInterceptor])
    )
  ]
};
