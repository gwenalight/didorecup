/* tslint:disable:no-unused-variable */
import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { expect } from 'chai';
import { UnauthorizedComponent } from './unauthorized.component';
import { By } from '@angular/platform-browser';

describe('Unauthorized Component', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [],
      declarations: [UnauthorizedComponent]
    }).compileComponents()
  );

  afterEach(() => {
    getTestBed().resetTestingModule();
  });

  it('should display a title', () => {
    let title: any;
    let fixture: ComponentFixture<UnauthorizedComponent>;

    fixture = TestBed.createComponent(UnauthorizedComponent);
    title = fixture.debugElement.query(By.css('h2'));
    expect(title.nativeElement.textContent).to.equal('403');
  });
});
