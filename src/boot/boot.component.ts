import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

/* tslint:disable */
@Component({
  selector: 'body',
  template: `
    <router-outlet></router-outlet>
  `
})
/* tslint:enable */
export class BootComponent implements OnInit {
  constructor(private translateService: TranslateService) {}

  ngOnInit() {
    this.translateService.setDefaultLang('fr');
    this.translateService.use('fr');
  }
}
