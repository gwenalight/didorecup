import { getTestBed, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { IcdcHttpInterceptor } from './icdc-http.interceptor';
import { EnvironmentService } from '../context/environment.service';
import { ErrorNotifierService } from '../service/error.service';
import { RouterTestingModule } from '@angular/router/testing';
import { UnauthorizedComponent } from '../components/unauthorized.component';
import { CrashComponent } from '../components/crash.component';
import { UnavailableComponent } from '../components/unavailable.component';
import * as sinon from 'sinon';
import { expect } from 'chai';

const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);

describe('Icdc Http Interceptor', () => {
  let server: any;

  beforeEach(() => {
    server = sinon.fakeServer.create();
    server.autoRespond = true;
    server.respondWith('GET', 'http://localhost:3000/api/backend-service', [
      202,
      { 'Content-Type': 'application/json' },
      '{' + '"body":"full"' + '}'
    ]);
    server.respondWith('GET', 'http://localhost:3000/api/unauthorized-backend-service', [401, {}, '']);
    server.respondWith('GET', 'http://localhost:3000/api/bad-backend-service', [500, {}, '']);
    server.respondWith('GET', 'http://localhost:3000/api/unavailable-backend-service', [500, {}, '{"typeError" : "SERVICE_UNAVAILABLE"}']);

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule.withRoutes([
          {
            path: 'errors/unauthorized',
            component: UnauthorizedComponent
          },
          {
            path: 'errors/crash',
            component: CrashComponent
          },
          {
            path: 'errors/unavailable',
            component: UnavailableComponent
          }
        ])
      ],
      declarations: [UnauthorizedComponent, CrashComponent, UnavailableComponent],
      providers: [
        ErrorNotifierService,
        {
          provide: EnvironmentService,
          useClass: EnvironmentServiceMock
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: IcdcHttpInterceptor,
          multi: true
        }
      ]
    });
  });

  afterEach(() => {
    server.restore();
    getTestBed().resetTestingModule();
  });

  it('should intercept request correctly', done => {
    const httpClient: HttpClient = getTestBed().get(HttpClient);
    httpClient.get('/backend-service').subscribe((response: any) => {
      expect(response.body).to.be.equal('full');
      done();
    });
  });

  it('should call ErrorNotifierService notifyErrorUnauthorized when 401', done => {
    const httpClient: HttpClient = getTestBed().get(HttpClient);
    const errorNotifierService: ErrorNotifierService = getTestBed().get(ErrorNotifierService);
    const notifyError401Function = chai.spy.on(errorNotifierService, 'notifyErrorUnauthorized');

    httpClient.get('/unauthorized-backend-service').subscribe(
      () => {},
      () => {},
      () => {
        expect(notifyError401Function).to.have.been.called();
        done();
      }
    );
  });

  it('should call ErrorNotifierService notifyTechnicalError when 500', done => {
    const httpClient: HttpClient = getTestBed().get(HttpClient);
    const errorNotifierService: ErrorNotifierService = getTestBed().get(ErrorNotifierService);
    const notifyError500Function = chai.spy.on(errorNotifierService, 'notifyTechnicalError');

    httpClient.get('/bad-backend-service').subscribe(
      () => {},
      () => {},
      () => {
        expect(notifyError500Function).to.have.been.called();
        done();
      }
    );
  });
});

class EnvironmentServiceMock {
  public config = {
    backendURL: 'http://localhost:3000/api',
    backendTimeout: 2000,
    debugging: true
  };

  private _env;
}
