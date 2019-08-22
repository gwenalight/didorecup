import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { ErrorNotifierService } from '../service/error.service';
import { EnvironmentService } from '../context/environment.service';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable()
export class IcdcHttpInterceptor implements HttpInterceptor {
  private _timeout;
  private _backendURL;
  private _errorService: ErrorNotifierService;

  constructor(_errorService: ErrorNotifierService, private environmentService: EnvironmentService) {
    this._timeout = this.environmentService.config.backendTimeout;
    this._backendURL = this.environmentService.config.backendURL;
    this._errorService = _errorService;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      url: this.makeURL(request.url),
      headers: this.getRequestHeaders(request.headers)
    });

    return next.handle(request)
      .pipe(catchError((err, source) => this.handleErrors(err, source)))
      .pipe(timeout(this._timeout));
  }

  private makeURL(url: string): string {
    console.log('this._backendURL ' + this._backendURL);
    return this._backendURL + url;
  }

  private getRequestHeaders(httpHeaders: HttpHeaders): HttpHeaders {
    httpHeaders = httpHeaders || new HttpHeaders();

    httpHeaders = httpHeaders.set('X-RequestID', UUID.UUID());

    if (!httpHeaders.has('Content-Type')) {
      httpHeaders = httpHeaders.set('Content-Type', 'application/json');
    }

    return httpHeaders;
  }

  private handleErrors(err, source) {
    if (err.status === 400) {
      return throwError(err.error);
    } else if (err.status === 503) {
      this._errorService.notifyUnavailableError();
    } else if (err.status === 401 || err.status === 403) {
      this._errorService.notifyErrorUnauthorized();
      return EMPTY;
    } else {
      this._errorService.notifyTechnicalError();
      return EMPTY;
    }
  }
}
