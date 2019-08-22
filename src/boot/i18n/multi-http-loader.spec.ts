import { getTestBed, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MultiTranslateHttpLoader } from './multi-http-loader';
import { expect } from 'chai';
import { TranslationDataService } from '../i18n/translation-data.service';
import * as sinon from 'sinon';

describe(`MultiTranslateHttpLoader`, () => {
  let translate: TranslateService;
  let server: any;

  beforeEach(() => {
    server = sinon.fakeServer.create();
    server.autoRespond = true;

    server.respondWith('GET', '/assets/i18n/fr/message.json', [
      202,
      { 'Content-Type': 'application/json' },
      '{' + '  "message": {' + '    "mail": "Un email va vous être envoyé pour valider votre inscription"' + '  }' + '}'
    ]);

    server.respondWith('GET', '/assets/i18n/fr/label.json', [
      202,
      { 'Content-Type': 'application/json' },
      '{\n' + '  "label": {' + '    "form": {' + '      "title": "Formulaire d\'inscription"' + '    }' + '  }' + '}'
    ]);

    server.respondWith('GET', '/assets/i18n/en/label.json', [
      202,
      { 'Content-Type': 'application/json' },
      '{\n' + '  "label": {' + '    "form": {' + '      "title": "registration"' + '    }' + '  }' + '}'
    ]);

    server.respondWith('GET', '/assets/i18n/en/message.json', [
      202,
      { 'Content-Type': 'application/json' },
      '{' + '  "message": {' + '    "mail": "mail was sent"' + '  }' + '}'
    ]);

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: (httpClient: HttpClient, translationService: TranslationDataService) =>
              new MultiTranslateHttpLoader(httpClient, translationService, '/assets/i18n/'),
            deps: [HttpClient, TranslationDataService]
          }
        })
      ],
      providers: [
        TranslateService,
        {
          provide: TranslationDataService,
          useClass: TranslationServiceMock
        }
      ]
    });

    translate = TestBed.get(TranslateService);
  });

  afterEach(() => {
    server.restore();
    getTestBed().resetTestingModule();
    translate = undefined;
  });

  it('should be able to provide MultiTranslateHttpLoader', () => {
    expect(MultiTranslateHttpLoader).to.be.not.undefined;
    expect(translate.currentLoader).to.be.not.undefined;
    expect(translate.currentLoader instanceof MultiTranslateHttpLoader).to.be.equal;
  });

  it('should be able to get translations from message.json file', done => {
    translate.use('fr');
    translate.get('message.mail').subscribe((res: string) => {
      expect(res).to.equal('Un email va vous être envoyé pour valider votre inscription');
      done();
    });
  });

  it('should be able to get translations from label.json file', done => {
    translate.use('fr');
    translate.get('label.form.title').subscribe((res: string) => {
      expect(res).to.equal("Formulaire d'inscription");
      done();
    });
  });

  it('should be able to reload translations', done => {
    translate.use('fr');
    translate.get('label.form.title').subscribe((res: string) => {
      expect(res).to.equal("Formulaire d'inscription");

      translate.reloadLang('fr').subscribe((res2: string) => {
        expect(translate.instant('label.form.title')).to.equal("Formulaire d'inscription");
        done();
      });
    });
  });

  it('should be able to change lang', done => {
    translate.use('fr');
    translate.get('label.form.title').subscribe((res: string) => {
      expect(res).to.equal("Formulaire d'inscription");

      translate.use('en');
      translate.get('label.form.title').subscribe((res2: string) => {
        expect(res2).to.equal('registration');

        done();
      });
    });
  });
});

class TranslationServiceMock {
  public translationFiles = ['label.json', 'message.json'];
}
