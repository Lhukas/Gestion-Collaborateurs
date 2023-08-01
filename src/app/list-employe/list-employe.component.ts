import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit,Input } from '@angular/core';
import { Collaborateur } from '../models/collaborateur-modele';
import { Employe } from '../models/employe-modele';
import { CollaborateursService } from '../services/collaborateurs.service';
import { EmployeService } from '../services/employe.service';

@Component({
  selector: 'app-list-employe',
  templateUrl: './list-employe.component.html',
  styleUrls: ['./list-employe.component.scss']
})
export class ListEmployeComponent implements OnInit {



ListEmploye!: Employe[];
//connecter le component au services
constructor(private cs : CollaborateursService) { }


collaborateurs !: Collaborateur[] ;

ngOnInit(): void {

this.cs.getAllCollaborateurs().subscribe(
    (data: any[]) => {
      this.collaborateurs = data;
      console.log(this.collaborateurs)
    },
    (error) => {
      console.error('Erreur lors du chargement des collaborateurs : ', error);
    }
  );
}

}
