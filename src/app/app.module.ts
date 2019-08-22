import { UtilsdiffusionService } from './service/utilsdiffusion.service'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { AppComponent } from './app.component'
import { AppRoutingModule } from './app.routing'
import { HomeComponent } from './home/home.component'
import { CommonModule } from '@angular/common'
import { MenuComponent } from './layout/nav/menu.component'
import { HeaderComponent } from './layout/header/header.component'
import { ErrorNotifierService } from 'boot/service/error.service'
import { IcdcHttpInterceptor } from 'boot/interceptor/icdc-http.interceptor'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap'
import { TranslateModule } from '@ngx-translate/core'
import { UtilsdiffusionShowComponent } from './utilsdiffusion-show/utilsdiffusion-show.component'
import { FirstpageselectionComponent } from './firstpageselection/firstpageselection.component'
import { ListutilsdiffusionbyappliComponent } from './listutilsdiffusionbyappli/listutilsdiffusionbyappli.component'
import { ListutilsdiffusionbyrefComponent } from './listutilsdiffusionbyref/listutilsdiffusionbyref.component'
import { ListutilsdiffusionbyappliandbyrefComponent } from './listutilsdiffusionbyappliandbyref/listutilsdiffusionbyappliandbyref.component'
import { HighcharttestComponent } from './highcharttest/highcharttest.component'
import { HighchartsChartModule } from 'highcharts-angular';
import { UtilslotService } from './service/utilslot.service';
import { GraphoccurrencesbyreferentielComponent } from './graphoccurrencesbyreferentiel/graphoccurrencesbyreferentiel.component';

//////////////////////////////
// Module principale
//////////////////////////////

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule,
    NgbAccordionModule,
    HighchartsChartModule
  ],
  declarations: [
    MenuComponent,
    HeaderComponent,
    AppComponent,
    HomeComponent,
    UtilsdiffusionShowComponent,
    FirstpageselectionComponent,
    ListutilsdiffusionbyappliComponent,
    ListutilsdiffusionbyrefComponent,
    ListutilsdiffusionbyappliandbyrefComponent,
    HighcharttestComponent,
    GraphoccurrencesbyreferentielComponent,
  ],
  providers: [
    ErrorNotifierService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: IcdcHttpInterceptor,
      multi: true,
    },
    UtilsdiffusionService,
    UtilslotService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
