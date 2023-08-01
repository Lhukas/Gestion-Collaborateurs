import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { MenuNavComponent } from '../menu-nav/menu-nav.component';
import { Collaborateur } from '../models/collaborateur-modele';
import { Employe } from '../models/employe-modele';
import { EmployeService } from '../services/employe.service';


@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.scss']
})
export class EmployeComponent implements OnInit {

  @Input() employeElementArray!: Collaborateur;


  constructor(private employeService : EmployeService, private router : Router) { }

  ngOnInit(): void {
  }


  OnEmployeCalendrier(){
    
    this.router.navigateByUrl('Calendrier/'+this.employeElementArray.collaborateur_id)
    

  }

}
