import { Component, OnInit } from '@angular/core';
import { UtilsdiffusionService } from '../service/utilsdiffusion.service';
import { ActivatedRoute, Router} from '@angular/router';
import { UtilsDiffusionPK } from '../entite/utils-diffusion-pk';
import { UtilsDiffusion } from '../entite/utils-diffusion';

@Component({
  selector: 'ai4-utilsdiffusion-show',
  templateUrl: './utilsdiffusion-show.component.html',
  styleUrls: ['./utilsdiffusion-show.component.css'],
  providers: [UtilsdiffusionService]
})
export class UtilsdiffusionShowComponent implements OnInit {

  utilsDiffusionPK: any = {};
  utilsDiffusion: any = {};

  constructor(private service: UtilsdiffusionService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    }

    // methode appel
  findByIdApplication(idApplication: HTMLInputElement) {
    this.service.findDiffusionByIdApplication(idApplication.value).subscribe((data: {}) => {
      console.log(data);
      this.utilsDiffusion = data;
  });
  }

  findByIdReferentiel(idReferentiel: HTMLInputElement) {
    this.service.findDiffusionByIdReferentiel(idReferentiel.value).subscribe((data: {}) => {
      console.log(data);
      this.utilsDiffusion = data;
  });
  }

  findByIdApplicationAndIdReferentiel(idReferentiel: HTMLInputElement, idApplication: HTMLInputElement) {
    this.service.findDiffusionByIdApplicationAndIdReferentiel(idApplication.value, idReferentiel.value).subscribe((data: {}) => {
      console.log(data);
      this.utilsDiffusion = data;
  });
  }
  // methode redirection
  gotoListByIdAppli() {
  this.router.navigate(['/utilsdiffusion-list', this.utilsDiffusion.idApplication]);
  return false;
  }

  gotoListByIdReferentiel() {
  this.router.navigate(['/utilsdiffusion-list', this.utilsDiffusion.idApplication]);
  return false;
  }

  gotoListByIdAppliAndIdReferentiel() {
  this.router.navigate(['/utilsdiffusion-list', this.utilsDiffusion.idApplication, this.utilsDiffusion.idRef]);
  return false;
  } // ne sais pas si c'est "+ ou ," dans la parenthese
}
