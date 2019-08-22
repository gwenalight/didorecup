/* tslint:disable:no-unused-variable */
import {ComponentFixture, getTestBed, TestBed} from "@angular/core/testing";
import {AppComponent} from "./app.component";
import {expect} from "chai";
import {UnauthorizedComponent} from "./unauthorized.component";
import {By} from "@angular/platform-browser";
import {HeaderComponent} from "./header.component";
import {TranslateModule} from "@ngx-translate/core";

describe('Header Component', () => {

  beforeEach(() => TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
      ],
      declarations: [
        HeaderComponent
      ]
    }).compileComponents()
  );

  afterEach(() => {
    getTestBed().resetTestingModule();
  });

  it('should display a title', () => {
    let title: any;
    let fixture: ComponentFixture<HeaderComponent>;

    fixture = TestBed.createComponent(HeaderComponent);
    title = fixture.debugElement.query(By.css('h1'));
    expect(title.nativeElement.textContent).to.be.empty;
  });
});
