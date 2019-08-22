import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UtilslotService } from '../service/utilslot.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as Highcharts from 'highcharts';
import { Variablegraph } from '../entite/variablegraph';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ai4-graphoccurrencesbyreferentiel',
  templateUrl: './graphoccurrencesbyreferentiel.component.html',
  styleUrls: ['./graphoccurrencesbyreferentiel.component.css']
})
export class GraphoccurrencesbyreferentielComponent implements OnInit {

  subscription: Subscription;
  variableGraph: Variablegraph;

  Highcharts: typeof Highcharts = Highcharts
  chartOptions: Highcharts.Options = {
    credits:{
      enabled: false
    },
    chart: {
      plotBackgroundColor: null,
      // type: pie,

    },
    title: {
      text: 'Envoi par Référentiel'
    },
    tooltip: {
      pointFormat: '{series.name}: {point.pourcentage:.2f}%'
    },
    series: [
      {
        name: '',
        type: 'pie',
        data: [
          {
            name: 'ça sera les ref de la bd', // idRef
            y: 0 ,// pourcentage calculer dans java
          }
        ]
      }
    ]
  }
    constructor( private service: UtilslotService, private router: Router, private activatedRoute: ActivatedRoute, private http: HttpClient) { }

    ngOnInit() {
      // this.subscription = this.service.listNbrFoisRefCitetableUtilslot().subscribe ((data => { const idRef = []; this.chartOptions.series [0] ['data'] = idRef; }))
    }

}
