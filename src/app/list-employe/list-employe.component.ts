import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit,Input } from '@angular/core';
import { Employe } from '../models/employe-modele';

@Component({
  selector: 'app-list-employe',
  templateUrl: './list-employe.component.html',
  styleUrls: ['./list-employe.component.scss']
})
export class ListEmployeComponent implements OnInit {



ListEmploye!: Employe[];

  ngOnInit() {

    this.ListEmploye = [
      new Employe("lhukas","nelhomme",10,new Date(),"test"),
      new Employe("lhukas2","nelhomme2",10.123456789,new Date(),"paris" )
    ]
  }
  
}
