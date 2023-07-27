import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit,Input } from '@angular/core';
import { ListEmploye } from '../models/list-employe-model';

@Component({
  selector: 'app-list-employe',
  templateUrl: './list-employe.component.html',
  styleUrls: ['./list-employe.component.scss']
})
export class ListEmployeComponent {

@Input() listEmploye!: ListEmploye;


  test(bouton: HTMLButtonElement){
    console.log("Le bouton a été cliqué !");
    console.log("Texte du bouton : " + bouton.textContent);
    console.log("Autres propriétés : ", bouton);
    console.log(this.listEmploye)

    bouton.textContent = "test"
    //bouton.disabled = true
  }
}
