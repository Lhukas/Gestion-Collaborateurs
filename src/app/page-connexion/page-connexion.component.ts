import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CollaborateursService } from '../services/collaborateurs.service';
import { Router } from '@angular/router';



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

  constructor( private http : HttpClient,
    private cs : CollaborateursService,
    private router : Router) { }

  ngOnInit(): void {
  }







  async connexion() {
    this.loadingScreen = true
    this.messageLoading = " connexion en cours"


   const test = await this.cs.connexion(this.trigramme, this.mdp).toPromise()


   console.log(test)


   // this.router.navigate(["/Acceuil"]);

   
    }

}
