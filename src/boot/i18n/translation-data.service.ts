import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentConfig } from './environment-config';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs/internal/observable/empty';

@Injectable()
export class TranslationDataService {
  public translationFiles;

  constructor(private http: HttpClient) {}

  load() {
    return new Promise((resolve, reject) => {
      this.http
        .get<any>('./assets/i18n/i18n-data.json')
        .pipe(
          catchError(err => {
            console.error('Error while loading translation config file');
            reject(err);
            return EMPTY;
          })
        )
        .subscribe((data: any) => {
          this.translationFiles = data.files;
          resolve(true);
        });
    });
  }
}
