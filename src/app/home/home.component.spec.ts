import {ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {expect} from 'chai';
import {HomeComponent} from "./home.component";
import {NgbAccordionModule} from "@ng-bootstrap/ng-bootstrap";

describe(`Home Component`, () => {
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbAccordionModule
      ],
      declarations: [HomeComponent],
    }).compileComponents();
  });

  afterEach(() => {
    getTestBed().resetTestingModule();
  });

  it('should display a title', (done) => {
    fixture = TestBed.createComponent(HomeComponent);
    let title: any;

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      title = fixture.debugElement.query(By.css('h4'));
      expect(title.nativeElement.textContent).to.equal('Stack technique');

      done();
    });
  });
});
