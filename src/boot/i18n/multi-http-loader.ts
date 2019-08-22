import { TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { Observable } from 'rxjs';
import { TranslationService } from '../context/translation.service';
import { map } from 'rxjs/operators';
import { TranslationDataService } from 'boot/i18n/translation-data.service';

export class MultiTranslateHttpLoader implements TranslateLoader {
  constructor(private http: HttpClient, private translationService: TranslationDataService, public prefix = 'assets/i18n/') {}

  getTranslation(lang: string): Observable<any> {
    const requests = this.translationService.translationFiles.map(resource => {
      return this.http.get(this.prefix + lang + '/' + resource);
    });

    return forkJoin(requests).pipe(map(response => response.reduce((a, b) => Object.assign(a, b))));
  }
}
