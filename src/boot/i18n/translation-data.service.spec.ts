import { getTestBed, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ErrorNotifierService } from './error.service';
import { expect } from 'chai';
import { HttpClientModule } from '@angular/common/http';
import * as sinon from 'sinon';
import { TranslationDataService } from './translation-data.service';

describe('Translation Service', () => {
  let server: any;

  beforeEach(() => {
    server = sinon.fakeServer.create();
    server.autoRespond = true;

    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [],
      providers: [TranslationDataService]
    });
  });

  afterEach(() => {
    server.restore();
    getTestBed().resetTestingModule();
  });

  it('should load configuration correctly', done => {
    server.respondWith('GET', './assets/i18n/i18n-data.json', [
      202,
      { 'Content-Type': 'application/json' },
      '{' + '"files": [ "messages.json" ]' + '}'
    ]);

    const translationService: TranslationDataService = getTestBed().get(TranslationDataService);

    translationService.load().then(() => {
      expect(translationService.translationFiles).to.be.not.empty;
      expect(translationService.translationFiles.length).to.be.equal(1);
      expect(translationService.translationFiles[0]).to.be.equal('messages.json');
      done();
    });
  });

  it('should throw exception when no file found', done => {
    server.respondWith('GET', './assets/i18n/i18n-data.json', [404, {}, '']);

    const translationService: TranslationDataService = getTestBed().get(TranslationDataService);

    translationService.load().catch((error: any) => {
      expect(error.status).to.be.equal(404);
      done();
    });
  });
});
