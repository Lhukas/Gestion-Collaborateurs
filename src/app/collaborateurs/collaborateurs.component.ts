import { Component, OnInit } from '@angular/core';
import { Collaborateur } from '../models/collaborateur-modele';
import { CollaborateursService } from '../services/collaborateurs.service';




@Component({
  selector: 'app-collaborateurs',
  templateUrl: './collaborateurs.component.html',
  styleUrls: ['./collaborateurs.component.scss'],
  providers : [CollaborateursService ]
})
export class CollaborateursComponent implements OnInit {


  collaborateurs !: Collaborateur[];
  
  newCollaborateur : Collaborateur = new Collaborateur(null,'','','','')

  constructor(private cs : CollaborateursService) { }




  ngOnInit(): void {
    this.getAllCollaborateurs()
  }


 public getAllCollaborateurs() : void{
    this.cs.getAllCollaborateurs().subscribe(
      collaborateurs => {
        this.collaborateurs = collaborateurs;
      },
      (error) => {
        console.error('Erreur lors du chargement des collaborateurs : ', error);
      }
    );
  }
 
    
 supprimerCollaborateur(id : number | null) {
  if (id !== null) {
  this.cs.deleteCollaborateur(id).subscribe(
    (response: any) =>{
      this.getAllCollaborateurs()
    },
    (error) => {
      console.log(error.message)
    }
  );
 
  }else{

  }

}



onAddCollaborateur() {
  this.cs.saveCollaborateurs(this.newCollaborateur).subscribe(
    (response: Collaborateur) =>{
      console.log(response)
      this.getAllCollaborateurs()
      this.newCollaborateur  = new Collaborateur(null,'','','','')
    },
    (error) => {
      console.log(error.message)
    }
  );
  }
  




}
