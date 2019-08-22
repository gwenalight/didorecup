/* tslint:disable:no-unused-variable */
import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { expect } from 'chai';
import { By } from '@angular/platform-browser';
import { CrashComponent } from './crash.component';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('Crash Component', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [],
      declarations: [CrashComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ msg: 'crach message' })
          }
        }
      ]
    }).compileComponents()
  );

  afterEach(() => {
    getTestBed().resetTestingModule();
  });

  it('should display a title', () => {
    let title: any;
    let msg: any;
    let fixture: ComponentFixture<CrashComponent>;

    fixture = TestBed.createComponent(CrashComponent);
    title = fixture.debugElement.query(By.css('h2'));
    msg = fixture.debugElement.query(By.css('p'));
    expect(title.nativeElement.textContent).to.equal('Boum');

    fixture.detectChanges();
    expect(msg.nativeElement.textContent).to.equal('crach message');
  });
});
