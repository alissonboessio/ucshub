import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
    provideAnimationsAsync(), 
    provideHttpClient(), 
    provideAnimationsAsync(), 
    provideEnvironmentNgxMask(),
    provideNativeDateAdapter(),
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'}]
};
