import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { UtilsLot } from '../entite/utils-lot';
import { Variablegraph } from '../entite/variablegraph';

@Injectable({
  providedIn: 'root'
})
export class UtilslotService {

  constructor(private http: HttpClient) {

    // ou http://localhost:3000/#/app/home
   }

   // methode ne marche pas pb de routing voir avec @injectable 'root' doit definir second passage car vient autre restconstroller en java et passe pas
   // n'avais pas confuigurer avec hicham car au debut utilisait 1 seul

  // findAllUtilsLot(): Observable<UtilsLot[]> {
  //         return this.http.get<UtilsLot[]>('/utilslots/test/');
  //       }
  listNbrFoisRefCitetableUtilslot(): Observable<Variablegraph[]> {
    return this.http.get<Variablegraph[]>('/utilslots/occurence/');
  }

}
