import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import posthog from 'posthog-js';

if (environment.production) {
  enableProdMode();
}

posthog.init(environment.POSTHOG_KEY, {
  api_host: environment.POSTHOG_HOST,
  person_profiles: "identified_only",
});

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
