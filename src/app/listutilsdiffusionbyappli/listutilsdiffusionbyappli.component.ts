import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { UtilsdiffusionService } from '../service/utilsdiffusion.service'
import { UtilsDiffusion } from '../entite/utils-diffusion'

@Component({
  selector: 'ai4-listutilsdiffusionbyappli',
  templateUrl: './listutilsdiffusionbyappli.component.html',
  styleUrls: ['./listutilsdiffusionbyappli.component.css'],
})
export class ListutilsdiffusionbyappliComponent implements OnInit {

  utilsDiffusion: UtilsDiffusion[] = []
  idApplication: string

  constructor(
    private service: UtilsdiffusionService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.idApplication = this.activatedRoute.snapshot.params['idApplication'];
    this.findDiffusionByIdApplication(this.idApplication);
  }

  findDiffusionByIdApplication(idApplication: string) {
    return this.service
      .findDiffusionByIdApplication(idApplication)
      .subscribe((data: UtilsDiffusion[]) => {
        this.utilsDiffusion = data;
      })
  }
}
