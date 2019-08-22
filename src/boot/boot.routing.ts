import { RouterModule, Routes } from '@angular/router';
import { UnauthorizedComponent } from './components/unauthorized.component';
import { PageNotFoundComponent } from './components/pagenotfound.component';
import { CrashComponent } from './components/crash.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/app/home',
    pathMatch: 'full'
  },
  {
    path: 'app',
    loadChildren: '../app/app.module#AppModule'
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent
  },
  {
    path: 'pagenotfound',
    component: PageNotFoundComponent
  },
  {
    path: 'crash',
    component: CrashComponent
  },
  {
    path: '**',
    redirectTo: '/pagenotfound',
    pathMatch: 'full'
  }
];

export const routing = RouterModule.forRoot(routes, {
  useHash: true,
  enableTracing: ENV === 'development'
});
