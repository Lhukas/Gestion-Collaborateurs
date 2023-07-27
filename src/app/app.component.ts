import { Component, OnInit } from '@angular/core';
import { ListEmploye } from './models/list-employe-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  listEmploye!: ListEmploye;

ngOnInit() {
  this.listEmploye = new ListEmploye(
    "lhukas",
    "nelhomme",
    new Date(),
  )
}


  
}
