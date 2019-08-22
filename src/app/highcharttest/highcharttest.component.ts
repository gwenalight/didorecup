
import { Component, OnInit } from '@angular/core'
import * as Highcharts from 'highcharts'
import { HttpClient } from '@angular/common/http'
import { interval, Subscription } from 'rxjs'
import { UtilsLot } from '../entite/utils-lot'
import { UtilslotService } from '../service/utilslot.service'
import { ActivatedRoute, Router } from '@angular/router'
import { UtilsdiffusionService } from '../service/utilsdiffusion.service'
import { UtilsDiffusion } from '../entite/utils-diffusion'

// Highcharts.setOptions({
//     title: {
//       style: {
//         color: 'orange'
//       }
//     }
// });

@Component({
  selector: 'ai4-highcharttest',
  templateUrl: './highcharttest.component.html',
  styleUrls: ['./highcharttest.component.css'],
})
export class HighcharttestComponent implements OnInit {
  //  // après à tester avec utilsLot changer la methode mais attention une fois le routing configurer seulement
   utilsDiffusion: UtilsDiffusion[] = []
  // subscription: Subscription;

  // Highcharts: typeof Highcharts = Highcharts
  // chartOptions: Highcharts.Options = {
  //   credits:{
  //     enabled: false
  //   },
  //   chart: {
  //     plotBackgroundColor: null,
  //     plotBorderWidth: null,
  //     plotShadow: false,
  //     // type: 'pie'
  //   },
  //   title: {
  //     text: 'Browser market shares in January, 2018',
  //   },
  //   tooltip: { // information qui s'afffiche dans les infos bulles
  //     pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>', // b pour le gras point.name= nom des navigateur point.percentage= pour les pourcent 1f=en flod met que 1chiffre après la virgule
  //   },
  //   // quelle est l'utilité?? a chercher
  //   // plotOptions: {
  //   //     pie: {
  //   //         allowPointSelect: true,
  //   //         cursor: 'pointer',
  //   //         dataLabels: { // si met cette partie en enabled false = alors pas de legend avec trait sur le graph
  //   //             enabled: true, // true pour que ca s'affiche
  //   //             format: '<b>{point.name}</b>: {point.percentage:.1f} %', // m^me chose que dans tooltip
  //   //           //   style: {
  //   //           //     color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
  //   //           // }
  //   //         }
  //   //     }
  //   // },
  //   series: [
  //     {
  //       name: 'Brands',
  //       colorByPoint: true,
  //       type: 'pie',
  //       data: [
  //         {
  //           name: 'dido',
  //           y: 61.41, // pourcentage
  //           sliced: true,
  //           selected: true, // quand passe souris sur dido met en avant cette partie
  //         },
  //         {
  //           name: 'sigma',
  //           y: 11.84,
  //         },
  //         {
  //           name: 'prelude',
  //           y: 10.85,
  //         },
  //         {
  //           name: 'gide',
  //           y: 4.67,
  //         },
  //         {
  //           name: 'idLot',
  //           data: []
  //         },
  //       ],
  //     },
  //   ],
  // }

  constructor(
    private service: UtilsdiffusionService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    // this.findAllu()
//  this.subscription = this.service.findAll().subscribe((data => {const idLot = []; this.chartOptions.series [0] ['data'] = idLot; data.forEach() Highcharts.chart('chart', this.chartOptions) ; }));
  }

  // findAll(url) {
  //   return this.http.get(url,{}).toPromise().then(res => { return res; });
  // }




  // findAllu() {
  //   return this.service.findAll().subscribe((data: UtilsDiffusion[]) => {
  //     this.utilsDiffusion = data
  //   })
  // }
}
// test

// Highcharts.Options = {
//   title: {
//     text : 'EXEMPLE '
//   },
//   plotOptions: {
//     series:{
//       pointStart: 0 // utilisable quand c'est des chiffre en ordonne sinon pas nécéssaire
//     }
//   },
//   yAxis: {
//     title: {
//       text: 'nombre de tiers envoyés'
//     },
//     min: 0,
//     max: 30
//   },
//   xAxis: {
//     title: {
//       text: 'référentiel'
//     },
//     categories: ['sigma', 'gide', 'prelude']
//   },
//   legend: {
//     layout: 'vertical', // si plusieurs legend l'une a coté de l'autre ou en dessous de l'autre
//     align: 'right',
//     verticalAlign: 'middle',
//     backgroundColor: '#FCFFC5',
//     borderColor: '#FCFFC5',
//     borderWidth: 1
//   },
//   series: [{
//     name : 'la ligne bleuuuue',
//     data: [1, 27, 3],
//     type: 'line'
//   }, {
//     name: 'la ligne noir',
//     data : [6,15,10],
//     type : 'line'
//   }] ,
