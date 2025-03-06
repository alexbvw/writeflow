import { AppModule } from './app/app.module';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { register as registerSwiperElements } from 'swiper/element/bundle';

defineCustomElements(window);
if (environment.production) {
  enableProdMode();
}
registerSwiperElements();
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
