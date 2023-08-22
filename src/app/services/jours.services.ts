import { HttpClient } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { Jours } from '../models/jours-modele';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })

  export class JoursServices{
    constructor(private httpClient : HttpClient) { }


    getAllJours(){
        return this.httpClient.get<Jours[]>(environment.API_URL+"/Jours/")
    }

    getJoursById(id : number){
        return this.httpClient.get<Jours[]>(environment.API_URL+"/Jours/"+id)
    }

    saveJours(JoursToSave : Jours){
        return this.httpClient.post<Jours>(environment.API_URL+"/Jours/save", JoursToSave)
    }

    updateJours(JoursToUpdate : Jours){
        return this.httpClient.post<Jours>(environment.API_URL+"/Jours/update", JoursToUpdate)
    }

    getJoursByMoisAndId(id : number, mois : String){
        return this.httpClient.get<Jours[]>(environment.API_URL+"/Jours/collaborateur/"+id+"/mois/"+mois)
    }


    getJoursByMois(mois : String){
        return this.httpClient.get<Jours[]>(environment.API_URL+"/Jours/mois/"+mois)
    }



  }