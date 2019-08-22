import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { UtilsdiffusionService } from '../service/utilsdiffusion.service'

@Component({
  selector: 'ai4-firstpageselection',
  templateUrl: './firstpageselection.component.html',
  styleUrls: ['./firstpageselection.component.css'],
  providers: [UtilsdiffusionService],
})
export class FirstpageselectionComponent implements OnInit {

  // attributs
  findDiffusionByIdApplication: boolean
  findDiffusionByIdReferentiel: boolean
  findDiffusionByIdApplicationAndIdReferentiel: boolean
  // constructor
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  // methods
  ngOnInit() {}

  goToByApplication() {
    this.findDiffusionByIdApplication = true;
    this.findDiffusionByIdReferentiel = false;
    this.findDiffusionByIdApplicationAndIdReferentiel = false;
  }
  goToByReferentiel() {
    this.findDiffusionByIdApplication = false;
    this.findDiffusionByIdReferentiel = true;
    this.findDiffusionByIdApplicationAndIdReferentiel = false;
  }
  goToByApplicationAndByReferentiel() {
    this.findDiffusionByIdApplicationAndIdReferentiel = true;
    this.findDiffusionByIdApplication = false;
    this.findDiffusionByIdReferentiel = false;
  }

  goToListByApplication(idApplication: HTMLInputElement) {
    this.router.navigate(['app', 'listutilsdiffusionbyappli', idApplication.value]);
  }
  goToListByReferentiel(idReferentiel: HTMLInputElement) {
    this.router.navigate(['app', 'listutilsdiffusionbyref', idReferentiel.value]);
  }

  goToListByApplicationAndByReferentiel(idApplication: HTMLInputElement, idReferentiel: HTMLInputElement) {
    this.router.navigate(['app', 'listutilsdiffusionbyappliandbyref', idApplication.value, idReferentiel.value]);
  }
  goTestHighChart() {
    this.router.navigate(['app', 'highcharttest']);
  }
}
