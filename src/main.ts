import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

declare global {
  interface Window {
    WebComponents: {
      ready: boolean;
    };
  }
}

if (environment.production) {
  enableProdMode();
}

const bootstrapIonicApp = () => {
  console.log('bootstrapIonicApp()');
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.log(err));
}

if (window.WebComponents!.ready) {
  bootstrapIonicApp();
} else {
  window.addEventListener('WebComponentsReady', bootstrapIonicApp);
}
