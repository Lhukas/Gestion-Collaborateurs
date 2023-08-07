import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Collaborateur } from '../models/collaborateur-modele';


@Injectable({
  providedIn: 'root'
})
export class CollaborateursService {
  constructor(private httpClient : HttpClient) { }

  getAllCollaborateurs(){
    return this.httpClient.get<Collaborateur[]>(environment.API_URL+"/Collaborateurs/");
  }

  getCollaborateur(id : number){

    return this.httpClient.get<Collaborateur>(environment.API_URL + '/Collaborateurs/' + id)
  }

  deleteCollaborateur(id : number){
   return this.httpClient.get(environment.API_URL + '/Collaborateurs/delete/' + id)
    
  }




  saveCollaborateurs(collaborateurToSave : Collaborateur){
    return this.httpClient.post<Collaborateur>(environment.API_URL+"/Collaborateurs/save", collaborateurToSave);
  }



}
