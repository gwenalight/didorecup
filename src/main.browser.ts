import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BootModule } from 'boot/boot.module';
import { enableProdMode } from '@angular/core';

if ('production' === ENV) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(BootModule)
  .catch(err => console.error(err));
