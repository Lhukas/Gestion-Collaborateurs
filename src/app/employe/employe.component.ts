import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { MenuNavComponent } from '../menu-nav/menu-nav.component';
import { Employe } from '../models/employe-modele';
import { EmployeService } from '../services/employe.service';


@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.scss']
})
export class EmployeComponent implements OnInit {

  @Input() employeElementArray!: Employe;



  
  constructor(private employeService : EmployeService, private router : Router) { }

  ngOnInit(): void {
  }


  OnEmployeCalendrier(){
    /*
    console.log("Le bouton a été cliqué !");
    console.log("Texte du bouton : " + bouton.textContent);
    console.log("Autres propriétés : ", bouton);
    //console.log(this.listEmploye)

    bouton.textContent = "Gerer"
    //bouton.disabled = true*/

    this.router.navigateByUrl('Calendrier/'+this.employeElementArray.id)


    console.log(this.employeService.getEmployeByID(this.employeElementArray.id))



  }

}
