import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Email } from "../models/email-modele";

@Injectable({
    providedIn: 'root'
  })
  export class EmailService {
    
    constructor(private httpClient : HttpClient) { }

    demandeConge(email : Email){
        return this.httpClient.post<Number>(environment.API_URL+"/Conge/demande", email);
    }


    validationConge(email : Email){
      return this.httpClient.post<Number>(environment.API_URL+"/Conge/valide", email);
  }


  refusConge(email : Email){
    return this.httpClient.post<Number>(environment.API_URL+"/Conge/refus", email);
}
    
  }    

  
