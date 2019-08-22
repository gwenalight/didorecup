import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class ErrorNotifierService {
  constructor(private router: Router) {}

  notifyErrorUnauthorized() {
    return this.router.navigate(['/errors/unauthorized']);
  }

  notifyTechnicalError() {
    return this.router.navigate(['/errors/crash']);
  }

  notifyUnavailableError() {
    return this.router.navigate(['/errors/unavailable']);
  }
}
