/* tslint:disable:no-unused-variable */
import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { expect } from 'chai';
import { By } from '@angular/platform-browser';
import { CrashComponent } from './crash.component';
import { BootComponent } from './boot.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('Boot Component', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([]), TranslateModule.forRoot()],
      declarations: [BootComponent],
      providers: []
    }).compileComponents()
  );

  afterEach(() => {
    getTestBed().resetTestingModule();
  });

  it('should have a router outlet', () => {
    let routerOutlet: any;
    let fixture: ComponentFixture<BootComponent>;

    fixture = TestBed.createComponent(BootComponent);

    fixture.detectChanges();
    routerOutlet = fixture.debugElement.query(By.css('router-outlet'));
    expect(routerOutlet.nativeElement).to.exist;
  });
});
