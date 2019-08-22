/* tslint:disable:no-unused-variable */
import { getTestBed, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ErrorNotifierService } from './error.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { expect } from 'chai';
import { UnauthorizedComponent } from '../components/unauthorized.component';
import { CrashComponent } from '../components/crash.component';
import { UnavailableComponent } from 'boot/components/unavailable.component';

describe('Error Notifier Service', () => {
  let location: Location;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
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
      providers: [ErrorNotifierService]
    }).compileComponents();

    router = TestBed.get(Router);
    location = TestBed.get(Location);
    router.initialNavigation();
  });

  afterEach(() => {
    getTestBed().resetTestingModule();
  });

  it('should navigate to /errors/unauthorized when 401 error', done => {
    const errorNotifierService: ErrorNotifierService = getTestBed().get(ErrorNotifierService);

    errorNotifierService.notifyErrorUnauthorized().then(() => {
      expect(location.path()).to.equal('/errors/unauthorized');
      done();
    });
  });

  it('should navigate to /errors/crash when grave error', done => {
    const errorNotifierService: ErrorNotifierService = getTestBed().get(ErrorNotifierService);

    errorNotifierService.notifyTechnicalError().then(() => {
      expect(location.path()).to.equal('/errors/crash');
      done();
    });
  });

  it('should navigate to /errors/unavailable when grave error', done => {
    const errorNotifierService: ErrorNotifierService = getTestBed().get(ErrorNotifierService);

    errorNotifierService.notifyUnavailableError().then(() => {
      expect(location.path()).to.equal('/errors/unavailable');
      done();
    });
  });
});
