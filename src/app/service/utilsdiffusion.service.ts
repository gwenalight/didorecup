import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { UtilsDiffusion } from '../entite/utils-diffusion';
import { catchError } from 'rxjs/operators';

@Injectable()
export class UtilsdiffusionService {

  constructor(private http: HttpClient) { }

  // httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})}

  findDiffusionByIdReferentiel(idReferentiel): Observable<UtilsDiffusion[]> {
    return this.http.get<UtilsDiffusion[]>('/utilsdiffusions/byreferentiel/' + idReferentiel);
  }

  findDiffusionByIdApplication(idApplication): Observable<UtilsDiffusion[]> {
    return this.http.get<UtilsDiffusion[]>('/utilsdiffusions/byapplication/' + idApplication);
  }

  findDiffusionByIdApplicationAndIdReferentiel(idApplication, idReferentiel): Observable<UtilsDiffusion[]> {
    return this.http.get<UtilsDiffusion[]>('/utilsdiffusions/byapplicationandreferentiel/' + idApplication + '/' + idReferentiel);

    // peut également se faire en ('/utilsdiffusions/byapplicationandreferentiel/', params: {'idApplication' = idApplication, 'idReferentiel: idReferentiel};
    // dans ce cas au niveau du service rest(java) on, met pas un @pathvariable(va checher les infos dans l'url) mais un @requestparam
  }
  findAll(): Observable<UtilsDiffusion[]> {
    return this.http.get<UtilsDiffusion[]>('/utilsdiffusions/all');
  }
}
