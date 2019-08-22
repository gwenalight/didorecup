import { Component, OnInit } from '@angular/core';
import { UtilsDiffusion } from '../entite/utils-diffusion';
import { UtilsdiffusionService } from '../service/utilsdiffusion.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ai4-listutilsdiffusionbyref',
  templateUrl: './listutilsdiffusionbyref.component.html',
  styleUrls: ['./listutilsdiffusionbyref.component.css']
})
export class ListutilsdiffusionbyrefComponent implements OnInit {

  utilsDiffusion: UtilsDiffusion[] = []
  idReferentiel: string

  constructor(private service: UtilsdiffusionService, private router:Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.idReferentiel = this.activatedRoute.snapshot.params['idReferentiel'];
    this.findDiffusionByIdReferentiel(this.idReferentiel);
  }
  findDiffusionByIdReferentiel(idReferentiel: string) {
    return this.service.findDiffusionByIdReferentiel(idReferentiel).subscribe((data: UtilsDiffusion[]) => {this.utilsDiffusion = data;})
  }

}
