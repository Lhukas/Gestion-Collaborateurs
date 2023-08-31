import { Component, OnInit } from '@angular/core';
import { Collaborateur } from '../models/collaborateur-modele';
import { CollaborateursService } from '../services/collaborateurs.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent implements OnInit {



//connecter le component au services
constructor(private cs : CollaborateursService) { }


collaborateurs !: Collaborateur[] ;

ngOnInit(): void {

this.cs.getAllCollaborateurs().subscribe(
    (data: any[]) => {
      this.collaborateurs = data;
    },
    (error) => {
      console.error('Erreur lors du chargement des collaborateurs : ', error);
    }
  );
}

}
