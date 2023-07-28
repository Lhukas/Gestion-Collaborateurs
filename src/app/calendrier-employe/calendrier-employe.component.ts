import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employe } from '../models/employe-modele';
import { EmployeService } from '../services/employe.service';

@Component({
  selector: 'app-calendrier-employe',
  templateUrl: './calendrier-employe.component.html',
  styleUrls: ['./calendrier-employe.component.scss']
})
export class CalendrierEmployeComponent implements OnInit {

  employe!: Employe
  prenom !: string

  constructor(private route: ActivatedRoute,
      private employeService :EmployeService
    ) { }

  ngOnInit(): void {
    const employe_id = +this.route.snapshot.params['id'];
    this.employe = this.employeService.getEmployeByID(employe_id)


    this.prenom = this.employe.prenom
  }

}
