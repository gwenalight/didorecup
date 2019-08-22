import { Component, OnInit } from '@angular/core';
import { UtilsDiffusion } from '../entite/utils-diffusion';
import { UtilsdiffusionService } from '../service/utilsdiffusion.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ai4-listutilsdiffusionbyappliandbyref',
  templateUrl: './listutilsdiffusionbyappliandbyref.component.html',
  styleUrls: ['./listutilsdiffusionbyappliandbyref.component.css']
})
export class ListutilsdiffusionbyappliandbyrefComponent implements OnInit {

  utilsDiffusion: UtilsDiffusion[] = [];
  idApplication: string;
  idReferentiel: string;

  constructor(private service: UtilsdiffusionService, private router: Router, private activtedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.idApplication = this.activtedRoute.snapshot.params['idApplication'];
    this.idReferentiel = this.activtedRoute.snapshot.params['idReferentiel'];
    this.findDiffusionByAppliAndByRef(this.idApplication, this.idReferentiel);
}

findDiffusionByAppliAndByRef(idApplication: string, idReferentiel: string) {
  return this.service.findDiffusionByIdApplicationAndIdReferentiel(idApplication, idReferentiel).subscribe((data: UtilsDiffusion[]) => {this.utilsDiffusion = data;})
}

}
