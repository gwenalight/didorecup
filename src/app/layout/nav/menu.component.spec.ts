import {ComponentFixture, getTestBed, TestBed} from "@angular/core/testing";
import {AppComponent} from "./app.component";
import {expect} from "chai";
import {UnauthorizedComponent} from "./unauthorized.component";
import {By} from "@angular/platform-browser";
import {MenuComponent} from "./menu.component";

describe('Menu Component', () => {

  beforeEach(() => TestBed.configureTestingModule({
      imports: [],
      declarations: [
        MenuComponent
      ]
    }).compileComponents()
  );

  afterEach(() => {
    getTestBed().resetTestingModule();
  });

  it('should display a title', () => {
    let title: any;
    let fixture: ComponentFixture<MenuComponent>;

    fixture = TestBed.createComponent(MenuComponent);
    title = fixture.debugElement.query(By.css('a'));
    expect(title.nativeElement.textContent).to.equal('Home (current)');
  });
});
