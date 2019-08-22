/* tslint:disable:no-unused-variable */
import { getTestBed, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ErrorNotifierService } from './error.service';
import { expect } from 'chai';
import { HttpClientModule } from '@angular/common/http';
import { EnvironmentService } from './environment.service';
import * as sinon from 'sinon';

describe('Environment Service', () => {
  let server: any;

  beforeEach(() => {
    server = sinon.fakeServer.create();
    server.autoRespond = true;

    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [],
      providers: [EnvironmentService]
    });
  });

  afterEach(() => {
    server.restore();
    getTestBed().resetTestingModule();
  });

  it('should load configuration correctly', done => {
    server.respondWith('GET', './context/context.json', [
      202,
      { 'Content-Type': 'application/json' },
      '{' + '"backendTimeout":2000,' + '"debugging": true' + '}'
    ]);

    let environmentService: EnvironmentService = getTestBed().get(EnvironmentService);

    environmentService.load().then(() => {
      expect(environmentService.config.backendTimeout).to.be.equal(2000);
      expect(environmentService.config.debugging).to.be.true;
      done();
    });
  });

  it('should throw exception when no file found', done => {
    server.respondWith('GET', './context/context.json', [404, {}, '']);

    let environmentService: EnvironmentService = getTestBed().get(EnvironmentService);

    environmentService.load().catch((error: any) => {
      expect(error.status).to.be.equal(404);
      done();
    });
  });
});
