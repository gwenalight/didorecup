import { RouterModule, Routes } from '@angular/router'

import { HomeComponent } from './home/home.component'
import { NgModule } from '@angular/core'
import { AppComponent } from './app.component'
import { FirstpageselectionComponent } from './firstpageselection/firstpageselection.component'
import { ListutilsdiffusionbyappliComponent } from './listutilsdiffusionbyappli/listutilsdiffusionbyappli.component';
import { ListutilsdiffusionbyappliandbyrefComponent } from './listutilsdiffusionbyappliandbyref/listutilsdiffusionbyappliandbyref.component';
import { ListutilsdiffusionbyrefComponent } from './listutilsdiffusionbyref/listutilsdiffusionbyref.component';
import { HighcharttestComponent } from './highcharttest/highcharttest.component';
import { GraphoccurrencesbyreferentielComponent } from './graphoccurrencesbyreferentiel/graphoccurrencesbyreferentiel.component';


const appRoutes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        redirectTo: 'firstpageselection',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'firstpageselection',
        component: FirstpageselectionComponent,
      },
      {path: 'listutilsdiffusionbyappli/:idApplication', component: ListutilsdiffusionbyappliComponent,},
      {path: 'listutilsdiffusionbyref/:idReferentiel', component: ListutilsdiffusionbyrefComponent,},
      {path: 'listutilsdiffusionbyappliandbyref/:idApplication/:idReferentiel', component: ListutilsdiffusionbyappliandbyrefComponent},
      {path: 'highcharttest', component: HighcharttestComponent},
      {path : 'graphoccurrencesbyreferentiel', component: GraphoccurrencesbyreferentielComponent }

    ],
  },
  {
    path: '**',
    redirectTo: '/pagenotfound',
    pathMatch: 'full',
  },
]

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
