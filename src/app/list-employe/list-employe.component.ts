import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit,Input } from '@angular/core';
import { Employe } from '../models/employe-modele';
import { EmployeService } from '../services/employe.service';

@Component({
  selector: 'app-list-employe',
  templateUrl: './list-employe.component.html',
  styleUrls: ['./list-employe.component.scss']
})
export class ListEmployeComponent implements OnInit {



ListEmploye!: Employe[];
//connecter le component au services
constructor(private employeService : EmployeService){}

  ngOnInit() {
//Initialisation des données grace au services
    this.ListEmploye = this.employeService.getAllEmploye()
  }
  
}
