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

   currentMonth: number;
   currentYear: number;
   daysInMonth!: number[];
   weeks!: number[][];


 viewDate : Date = new Date()
  constructor(private route: ActivatedRoute,
      private employeService :EmployeService
    ) {
      const currentDate = new Date();
      this.currentMonth = currentDate.getMonth();
      this.currentYear = currentDate.getFullYear();
      this.generateCalendar();
     }

  ngOnInit(): void {
    const employe_id = +this.route.snapshot.params['id'];
    this.employe = this.employeService.getEmployeByID(employe_id)


    this.prenom = this.employe.prenom
  }

  // Méthode pour générer le calendrier
  generateCalendar(): void {
    this.daysInMonth = [];
    this.weeks = [];

    const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);
    const lastDayOfMonth = new Date(this.currentYear, this.currentMonth + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();

    let dayOfWeek = firstDayOfMonth.getDay();
    let week: number[] = [];

    for (let i = 1; i <= daysInMonth; i++) {
      week.push(i);
      dayOfWeek++;

      if (dayOfWeek === 7 || i === daysInMonth) {
        this.weeks.push(week);
        week = [];
        dayOfWeek = 0;
      }
    }
  }

  // Méthode pour changer le mois
  changeMonth(monthOffset: number): void {
    this.currentMonth += monthOffset;

    if (this.currentMonth < 0) {
      this.currentYear--;
      this.currentMonth = 11;
    } else if (this.currentMonth > 11) {
      this.currentYear++;
      this.currentMonth = 0;
    }

    this.generateCalendar();
  }

  getMonthName(monthIndex: number): string {
    const monthNames = [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];
    return monthNames[monthIndex];
  }

  onDateClick(date: number): void {
    console.log(date);
  }

}
