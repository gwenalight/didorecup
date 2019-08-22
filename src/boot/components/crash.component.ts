import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ai4.ccmt.dei.icdc.fr-crash',
  template: `
    <h2>Boum</h2>
    <p>{{ errorMsg }}</p>
  `
})
export class CrashComponent implements OnInit {
  errorMsg = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.pipe(map((params: any) => params['msg'])).subscribe(msg => {
      this.errorMsg = msg;
    });
  }
}
