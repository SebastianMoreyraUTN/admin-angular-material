import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { hmrBootstrap } from './hmr';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { ApplicationRef } from '@angular/core';
import { enableDebugTools } from '@angular/platform-browser';

if (environment.production) {
  enableProdMode();
}

const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppModule);
if (environment.hmr) {
  if ((module as any).hot) {
    hmrBootstrap(module, bootstrap);
  } else {
    console.error('HMR is not enabled for webpack-dev-server!');
    console.log('Are you using the --hmr flag for ng serve?');
  }
} else {
  bootstrap().catch((err) => console.log(err));
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then((moduleRef) => {
    const applicationRef = moduleRef.injector.get(ApplicationRef);
    const componentRef = applicationRef.components[0];
    // allows to run `ng.profiler.timeChangeDetection();`
    enableDebugTools(componentRef);
  })
  .catch((err) => window['console'].error(err));
