import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'ai4-header',
  template: `
    <div class="text-center">
      <h1>{{ 'message.application.title' | translate }}</h1>
    </div>
  `
})
export class HeaderComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }
}
