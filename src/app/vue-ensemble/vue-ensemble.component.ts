import { Component, OnInit } from '@angular/core';
import { addMonths, subMonths, startOfWeek, format, eachDayOfInterval, addDays } from 'date-fns';

import { CalendarView, CalendarEvent } from 'angular-calendar';
import { Collaborateur } from '../models/collaborateur-modele';
import { Jours } from '../models/jours-modele';
import { ActivatedRoute } from '@angular/router';
import { CollaborateursService } from '../services/collaborateurs.service';
import { JoursServices } from '../services/jours.services';
import { LowerCasePipe } from '@angular/common';



@Component({
  selector: 'app-vue-ensemble',
  templateUrl: './vue-ensemble.component.html',
  styleUrls: ['./vue-ensemble.component.scss']
})
export class VueEnsembleComponent implements OnInit {
  currentMonth!: string;
  weekdays!: string[];
  weeks: Date[][] = [];
  selectedDate!: Date;
  dates!: Date[];
  currentMois !: String;
  jours !: Jours[]
  joursTableau !: Jours[]

  IDjoursDOM !: String;
  nbCollaborateursJours : number = 0

  personneEnConge : Collaborateur[] = [];
  messageLoading!: string;
  loadingScreen!: boolean;

  constructor(
    private js: JoursServices,
    private cs : CollaborateursService
  ) {}

  
  async ngOnInit(): Promise<void> {
    this.weekdays = [ 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam','Dim'];
    this.selectedDate = new Date();
    this.generateCalendar(this.selectedDate);

    this.refreshConge()

    
  }
generateCalendar(date: Date): void {
  this.currentMonth = date.toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  });

  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();

  // Adjusting the first day of the week to be Monday (1)
  let firstDayOfWeek = firstDayOfMonth.getDay();
  if (firstDayOfWeek === 0) {
    firstDayOfWeek = 6; // Sunday, adjust to the last day of the previous week
  } else {
    firstDayOfWeek--; // Adjusting to Monday-based indexing
  }

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
    this.selectedDate = subMonths(this.selectedDate, 1);
    this.generateCalendar(this.selectedDate);
    this.refreshConge()
  }

  nextMonth(): void {
    this.selectedDate = addMonths(this.selectedDate, 1);
    this.generateCalendar(this.selectedDate);
    this.refreshConge()
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






  async refreshConge(){


    this.loadingScreen = true;
    this.messageLoading = 'chargement en cours....';


    this.currentMois =
    this.selectedDate.getMonth() < 9
      ? '0' + (this.selectedDate.getMonth() + 1)
      : (this.selectedDate.getMonth() + 1).toString();

    this.jours = await this.js
      .getJoursByMois(this.currentMois)
      .toPromise()

      this.joursTableau = []
      
      if(this.jours.length != 0){
    this.jours.sort((a, b) => parseInt(a.idFormatLong) - parseInt(b.idFormatLong));

    this.joursTableau = this.jours.filter((item, index, self) =>
        index === self.findIndex((t) => t.idFormatLong === item.idFormatLong)
);





this.IDjoursDOM = this.jours[0].idFormatLong;
var result = 0 ;

const savePromises = this.jours.map(async (element) => {

  
  await this.cs.getCollaborateur(element.id_collaborateurs!).toPromise()
  .then(async (collaborateur) => {

  
  const elementIdString = element.idFormatLong.toString();
  const elementIdTableauString = elementIdString + "-tableau";
  const collaborateurHtml = '<p class="nomCollaborateur ' + element.type + '">' + collaborateur.trigramme + '</p>';


  document.getElementById(elementIdString)!.innerHTML += collaborateurHtml;
 
  if(document.getElementById(elementIdString)!.querySelectorAll('p').length == 3){
    document.getElementById(elementIdString)!.innerHTML = parseInt(element.jour) + '<p class="nomCollaborateur more">3+</p>'
  }
  

  
  document.getElementById(elementIdTableauString)!.innerHTML += collaborateurHtml;
  
  })

 
});

await Promise.all(savePromises);




  }
  this.messageLoading = 'Terminée';
this.loadingScreen = false;
}
}

