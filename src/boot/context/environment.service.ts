import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentConfig } from './environment-config';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs/internal/observable/empty';

@Injectable()
export class EnvironmentService {
  public config: EnvironmentConfig;

  constructor(private http: HttpClient) {}

  load() {
    return new Promise((resolve, reject) => {
      this.http
        .get<EnvironmentConfig>(CONTEXT_FILE_PATH)
        .pipe(
          catchError(err => {
            console.error('Error while loading context file');
            reject(err);
            return EMPTY;
          })
        )
        .subscribe(data => {
          this.config = data;
          resolve(true);
        });
    });
  }
}
