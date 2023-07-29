import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employe } from '../models/employe-modele';
import { EmployeService } from '../services/employe.service';
import { BrowserModule } from '@angular/platform-browser';



@Component({
  selector: 'app-calendrier-employe',
  templateUrl: './calendrier-employe.component.html',
  styleUrls: ['./calendrier-employe.component.scss']
})
export class CalendrierEmployeComponent implements OnInit {

  currentMonth!: string;
  weekdays!: string[];
  dates!: Date[];
  selectedDate!: Date;
  employe!: Employe
  prenom !: string
  nom !: string
 

  constructor(
    private route: ActivatedRoute,
    private employeService :EmployeService
  ) {}

  ngOnInit(): void {
    this.weekdays = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    this.selectedDate = new Date();
    this.generateCalendar(this.selectedDate);

    const employe_id = +this.route.snapshot.params['id'];
    this.employe = this.employeService.getEmployeByID(employe_id)
    this.prenom = this.employe.prenom
    this.nom = this.employe.nom

    
  }

  ngAfterViewInit() : void {
    console.log(document.getElementById("26062023"))
    document.getElementById("26062023")!.style.backgroundColor = "red"
  }

  generateCalendar(date: Date): void {
    this.currentMonth = date.toLocaleString('default', { month: 'long', year: 'numeric' });

    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();

    const firstDayOfWeek = firstDayOfMonth.getDay();

    this.dates = [];

    // Add previous month's days to fill the first week
    for (let i = firstDayOfWeek; i > 0; i--) {
      const prevDate = new Date(firstDayOfMonth);
      prevDate.setDate(prevDate.getDate() - i);
      this.dates.push(prevDate);
    }

    // Add current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(date.getFullYear(), date.getMonth(), i);
      this.dates.push(currentDate);
    }
  }

  prevMonth(): void {
    this.selectedDate.setMonth(this.selectedDate.getMonth() - 1);
    this.generateCalendar(this.selectedDate);
  }

  nextMonth(): void {
    this.selectedDate.setMonth(this.selectedDate.getMonth() + 1);
    this.generateCalendar(this.selectedDate);
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  isSelected(date: Date): boolean {
    return date.toDateString() === this.selectedDate.toDateString();
  }

  selectDate(date: Date): void {
    this.selectedDate = date;
  }
  isSameDate(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  getFormattedDateId(date: Date): string {
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate().toString();
    const month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1).toString();
    const year = date.getFullYear().toString();
    return day + month  + year;
  }
}





