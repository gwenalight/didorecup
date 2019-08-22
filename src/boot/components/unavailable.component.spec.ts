/* tslint:disable:no-unused-variable */
import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { expect } from 'chai';
import { By } from '@angular/platform-browser';
import { UnavailableComponent } from 'boot/components/unavailable.component';

describe('Unavailable Component', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [],
      declarations: [UnavailableComponent]
    }).compileComponents()
  );

  afterEach(() => {
    getTestBed().resetTestingModule();
  });

  it('should display a title', () => {
    let title: any;
    let fixture: ComponentFixture<UnavailableComponent>;

    fixture = TestBed.createComponent(UnavailableComponent);
    title = fixture.debugElement.query(By.css('h2'));
    expect(title.nativeElement.textContent).to.equal('Service momentanément indisponible.');
  });
});
