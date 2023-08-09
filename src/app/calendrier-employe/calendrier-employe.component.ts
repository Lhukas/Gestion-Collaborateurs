import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CollaborateursService } from '../services/collaborateurs.service';
import { Collaborateur } from '../models/collaborateur-modele';
import { Jours } from '../models/jours-modele';
import { JoursServices } from '../services/jours.services';

@Component({
  selector: 'app-calendrier-employe',
  templateUrl: './calendrier-employe.component.html',
  styleUrls: ['./calendrier-employe.component.scss'],
})
export class CalendrierEmployeComponent implements OnInit {
  currentMonth!: string;
  weekdays!: string[];
  dates!: Date[];
  selectedDate!: Date;
  prenom!: string;
  nom!: string;
  employe_id !: number;

  current_month_string !:string;

  collaborateur!: Collaborateur;

  datetraitement: string[] = [];
  jour!: Jours[]

  constructor(
    private route: ActivatedRoute,
    private cs: CollaborateursService,
    private js : JoursServices
  ) {}

  ngOnInit(): void {
    this.weekdays = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    this.selectedDate = new Date();
    this.generateCalendar(this.selectedDate);

    this.employe_id = this.route.snapshot.params['id'];
    //this.collaborateur = this.cs.getCollaborateur(employe_id)
    console.log(this.cs.getCollaborateur(this.employe_id));
    //console.log(this.collaborateur)
  }

  ngAfterViewInit(): void {

  this.putJours()

    /* console.log(document.getElementById("26062023"))
    document.getElementById("26062023")!.style.backgroundColor = "red" */
  }


putJours(){
   const currentMois  = this.selectedDate.getMonth() < 9 
  ? "0" + (this.selectedDate.getMonth() + 1)
  : (this.selectedDate.getMonth() + 1).toString();

this.js.getJoursByMoisAndId(this.employe_id,currentMois).subscribe(
    (data: Jours[]) => {
      this.jour = data;
      console.log(currentMois)
      console.log(this.jour)
      this.jour.forEach(function(item) {
        console.log(item.idFormatLong)
        console.log(document.getElementById(item.idFormatLong))
      });
    },
    (error) => {
      console.error('Erreur lors du chargement des collaborateurs : ', error);
    }
  );
}

  generateCalendar(date: Date): void {
    this.currentMonth = date.toLocaleString('default', {
      month: 'long',
      year: 'numeric',
    });

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
    this.selectedDate.setMonth((this.selectedDate.getMonth()) - 1);
    this.generateCalendar(this.selectedDate);
    this.putJours()
  }

  nextMonth(): void {
    this.selectedDate.setMonth((this.selectedDate.getMonth()) + 1);
    this.generateCalendar(this.selectedDate);
   this.putJours()
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

    const dateSelected = this.getFormattedDateId(this.selectedDate);

    if (this.datetraitement.length == 0) {
      this.datetraitement.push(dateSelected);
      console.log('Élément ajouté !');
    } else {
      const index = this.datetraitement.indexOf(dateSelected);

      if (index !== -1) {
        // L'élément est présent dans le tableau, on le supprime
        this.datetraitement.splice(index, 1);
        console.log('Élément supprimé !');
      } else {
        // L'élément n'est pas présent dans le tableau, on l'ajoute
        this.datetraitement.push(dateSelected);
        console.log('Élément ajouté !');
      }
    }
  }
  isSameDate(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  getFormattedDateId(date: Date): string {
    const day =
      date.getDate() < 10 ? '0' + date.getDate() : date.getDate().toString();
    const month =
      date.getMonth() + 1 < 10
        ? '0' + (date.getMonth() + 1)
        : (date.getMonth() + 1).toString();
    const year = date.getFullYear().toString();
    return day + month + year;
  }

  GestionJours(): void {}
}
