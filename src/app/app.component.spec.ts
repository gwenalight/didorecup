/* tslint:disable:no-unused-variable */
import {getTestBed, inject, TestBed} from "@angular/core/testing";
import {AppComponent} from "./app.component";
import {expect} from "chai";

describe('App Component', () => {

  beforeEach(() => TestBed.configureTestingModule({
      imports: [],
      providers: [
        AppComponent
      ]
    }).compileComponents()
  );

  afterEach(() => {
    getTestBed().resetTestingModule();
  });

  it('should exist', inject([AppComponent], (app: AppComponent) => {
    expect(app).to.not.be.undefined;
  }));
});
