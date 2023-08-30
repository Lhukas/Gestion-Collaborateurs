import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CollaborateursService } from './services/collaborateurs.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  mdp!: string;
  trigramme!: string;
  
  loadingScreen: boolean = false;
  messageLoading: string = "connexion en cours...";
connecte: boolean = false;
  
    constructor( private http : HttpClient,
      private cs : CollaborateursService,
      private router : Router) { }
  
    ngOnInit(): void {
    }
  
  
  
  
  
  
  
    async connexion() {
     // this.loadingScreen = true
      //this.messageLoading = " connexion en cours"
  
  
     // const test = await this.cs.connexion(this.trigramme, this.mdp).toPromise()
  
  
     // console.log(test)
  
  this.connecte = true
      this.router.navigate(["/Acceuil"]);
  
     
      }
  
  }
  