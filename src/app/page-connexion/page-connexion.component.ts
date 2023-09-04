import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CollaborateursService } from '../services/collaborateurs.service';
import { Router } from '@angular/router';
import { Collaborateur } from '../models/collaborateur-modele';



@Component({
  selector: 'app-page-connexion',
  templateUrl: './page-connexion.component.html',
  styleUrls: ['./page-connexion.component.scss']
})
export class PageConnexionComponent implements OnInit {

mdp!: string;
trigramme!: string;

loadingScreen: boolean = false;
messageLoading: string = "connexion en cours...";


messageError : boolean = false;


  constructor( private http : HttpClient,
    private cs : CollaborateursService,
    private router : Router) { }

  ngOnInit(): void {
  }







  async connexion() {
    this.loadingScreen = true
    this.messageLoading = " connexion en cours"


   const collaborateurTrouve : Collaborateur = await this.cs.connexion(this.trigramme, this.mdp).toPromise()
  


   if(collaborateurTrouve == null){
    this.messageError = true
    this.loadingScreen = false
   }
   else{

    if(collaborateurTrouve.admin == true){
    sessionStorage.setItem("ADMIN", collaborateurTrouve.admin.toString());
    this.router.navigate(["/Dashboard-admin"]);
    }else{
    sessionStorage.setItem("ADMIN", collaborateurTrouve.admin.toString());
    this.router.navigate(["/Dashboard-Collaborateur"]);
    }
    sessionStorage.setItem("ID", collaborateurTrouve.collaborateur_id!.toString());
   }
    }


    showmdp() {

      /*
      if(document.getElementById("mdp1")!.type == "text"){
        document.getElementById("mdp1")!.t = "password"
      
    }
    else if( document.getElementById("mdp1")!.type == "password" ){
        document.getElementById("mdp1")!.type = "text"
    }*/
      }


}
