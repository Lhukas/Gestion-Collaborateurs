import { Component, OnInit,Input } from '@angular/core';
import { Employe } from '../models/employe-modele';

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.scss']
})
export class EmployeComponent implements OnInit {

  @Input() employeElementArray!: Employe;

  constructor() { }

  ngOnInit(): void {
  }


  test(bouton: HTMLButtonElement){
    console.log("Le bouton a été cliqué !");
    console.log("Texte du bouton : " + bouton.textContent);
    console.log("Autres propriétés : ", bouton);
    //console.log(this.listEmploye)

    bouton.textContent = "Gerer"
    //bouton.disabled = true
  }

}
