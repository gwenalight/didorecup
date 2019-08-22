import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'ai4-app',
  styleUrls: ['./app.component.css'],
  template: `
    <div class="container">
      <ai4-header></ai4-header>
      <br /><br />
      <ai4-menu></ai4-menu>
      <br /><br />
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent {
  constructor() {}
}
