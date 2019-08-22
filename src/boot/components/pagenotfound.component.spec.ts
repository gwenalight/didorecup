/* tslint:disable:no-unused-variable */
import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { expect } from 'chai';
import { By } from '@angular/platform-browser';
import { PageNotFoundComponent } from './pagenotfound.component';

describe('PageNotFound Component', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [],
      declarations: [PageNotFoundComponent]
    }).compileComponents()
  );

  afterEach(() => {
    getTestBed().resetTestingModule();
  });

  it('should display a title', () => {
    let title: any;
    let fixture: ComponentFixture<PageNotFoundComponent>;

    fixture = TestBed.createComponent(PageNotFoundComponent);
    title = fixture.debugElement.query(By.css('h2'));
    expect(title.nativeElement.textContent).to.equal('Page not found');
  });
});
