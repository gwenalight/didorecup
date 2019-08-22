import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { CrashComponent } from './components/crash.component';
import { BootComponent } from './boot.component';
import { PageNotFoundComponent } from './components/pagenotfound.component';
import { UnauthorizedComponent } from './components/unauthorized.component';
import { UnavailableComponent } from './components/unavailable.component';
import { routing } from './boot.routing';
import { EnvironmentService } from './context/environment.service';
import { MultiTranslateHttpLoader } from './i18n/multi-http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslationDataService } from './i18n/translation-data.service';

//////////////////////////////
// Module bootstrap
//////////////////////////////
export function environmentLoaderFactory(environmentService: EnvironmentService) {
  return () => environmentService.load();
}

export function httpLoaderFactory(http: HttpClient, translationFilesService: TranslationDataService) {
  return new MultiTranslateHttpLoader(http, translationFilesService);
}

export function translationConfigLoaderFactory(translationFilesService: TranslationDataService) {
  return () => translationFilesService.load();
}

@NgModule({
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient, TranslationDataService]
      }
    })
  ],
  declarations: [
    CrashComponent,
    BootComponent,
    PageNotFoundComponent,
    UnauthorizedComponent,
    UnavailableComponent
  ],
  providers: [
    TranslationDataService,
    EnvironmentService,
    {
      provide: APP_INITIALIZER,
      useFactory: environmentLoaderFactory,
      deps: [EnvironmentService],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: translationConfigLoaderFactory,
      deps: [TranslationDataService],
      multi: true
    }
  ],
  bootstrap: [BootComponent]
})
export class BootModule {}
