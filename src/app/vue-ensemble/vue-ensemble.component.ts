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
  listCollaborateur : Collaborateur[] = []

  nbTicket : number = 0

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
    this.weekdays = [ 'L', 'M', 'M', 'J', 'V', 'S','D'];
    this.selectedDate = new Date();
    this.generateCalendar(this.selectedDate);


    this.listCollaborateur = await this.cs.getAllCollaborateurs().toPromise()

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
    this.calculTR()
  }

  nextMonth(): void {
    this.selectedDate = addMonths(this.selectedDate, 1);
    this.generateCalendar(this.selectedDate);
    this.refreshConge()
    this.calculTR()
  }


  getFormattedDateId(date: Date, trigramme : string): string {
    const day =
      date.getDate() < 10 ? '0' + date.getDate() : date.getDate().toString();
    const month =
      date.getMonth() + 1 < 10
        ? '0' + (date.getMonth() + 1)
        : (date.getMonth() + 1).toString();
    const year = date.getFullYear().toString();
    if (trigramme == 'null') {
      return day + month + year;
    } else {
      return day + month + year+'-'+trigramme;
    }
    
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

const savePromises = this.jours.map(async (jour) => {

  
  await this.cs.getCollaborateur(jour.id_collaborateurs!).toPromise()
  .then(async (collaborateur) => {

    var className : string = ""
  
      if (jour.valide == false) {
        className = 'ATT-VALIDATION'
      } else {
        className = jour.type
      }

  
  const jourIdString = jour.idFormatLong.toString()+"-"+collaborateur.trigramme;
  const jourIdTableauString = jour.idFormatLong.toString() + "-tableau";
  const collaborateurHtml = '<p class="nomCollaborateur ' + className + '">' + collaborateur.trigramme + '</p>';

  if (jour.valide == true) {
    document.getElementById(jourIdString)!.classList.add(jour.type);
  } else {
    document.getElementById(jourIdString)!.classList.add("ATT-VALIDATION");
  }


  document.getElementById(jourIdTableauString)!.innerHTML += collaborateurHtml;
  
  })

 
});
 this.calculTR()
await Promise.all(savePromises);




  }
  this.messageLoading = 'Terminée';
  this.loadingScreen = false;
}


  async calculTR() {

    console.log(this.currentMois)

    await this.listCollaborateur.forEach(async element => {

     var nbTickets = 0

      await this.js
    .getJoursByMoisAndId(element.collaborateur_id!, this.currentMois)
    .subscribe((jours: Jours[]) => {
      for (const jour of jours) {
        if (jour.eligible_tr === 'OUI') {
          nbTickets++;
        }
      }
      
    document.getElementById("TR-"+element.trigramme)!.innerHTML! = nbTickets.toString()
    });
    
    

  
   
     
    });
    
  
 
}



}

