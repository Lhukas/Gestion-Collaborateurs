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
  
  newCollaborateur : Collaborateur = new Collaborateur(null,'','','','','','',false,'','')

  updateCollaborateur !: Collaborateur

  modification : boolean = false

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
 
    
  async modifieCollaborateur(id : number | null) {

  this.modification = true
    this.newCollaborateur = await this.cs.getCollaborateur(id!).toPromise()
    console.log(this.newCollaborateur)
/*
  //Rajouter une alerte
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
*/
}

fermerModification(){
  this.modification = false;
  this.newCollaborateur = new Collaborateur(null,'','','','','','',false,'','')
}


supprimeCollaborateur(id : number){


  var result = confirm("Voulez-vous vraiment supprimé ce collaborateur?");

  if(result)  {
  this.cs.deleteCollaborateur(id).subscribe(
    async (response: any) =>{
      await this.getAllCollaborateurs()
      this.newCollaborateur = new Collaborateur(null,'','','','','','',false,'','')
      this.modification = false;
    },
    (error) => {
      console.log(error.message)
    }
  );} else {
   
  }


  
}


onAddCollaborateur() {

    this.cs.saveCollaborateurs(this.newCollaborateur).subscribe(
      (response: Collaborateur) =>{
        console.log(response)
        this.getAllCollaborateurs()
        this.newCollaborateur  = new Collaborateur(null,'','','','','','',false,'','')
      },
      (error) => {
        console.log(error.message)
      }
    );
  
}
}
