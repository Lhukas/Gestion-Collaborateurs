import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CollaborateursService } from '../services/collaborateurs.service';
import { Collaborateur } from '../models/collaborateur-modele';
import { Jours } from '../models/jours-modele';
import { JoursServices } from '../services/jours.services';
import { async } from 'rxjs/internal/scheduler/async';
import { EmailService } from '../services/email.services';
import { Email } from '../models/email-modele';

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
  employe_id!: number;
refus : boolean = false
  current_month_string!: string;
  jourRefus !: string

  collaborateur!: Collaborateur;
  admin !: Collaborateur;

  jourAttente : number[] = [];

  datetraitement: string[] = [];
  jour!: Jours[];
  JourSelect: Jours[] = [];
  choixTypeJour: boolean = false;
  typeCongeSelectionne!: string;
  eligibleTr!: string;
  messageLoading!: string;
  loadingScreen!: boolean;

  nbTicket: number = 0;
  motifRefus!: string;

  constructor(
    private route: ActivatedRoute,
    private cs: CollaborateursService,
    private js: JoursServices,
    private es : EmailService
  ) {}

  ngOnInit(): void {
    this.weekdays = [ 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam','Dim'];
    this.selectedDate = new Date();
    this.generateCalendar(this.selectedDate);

    this.employe_id = this.route.snapshot.params['id'];

    this.cs
      .getCollaborateur(this.employe_id)
      .subscribe((collaborateur: Collaborateur) => {
        this.collaborateur = collaborateur;
        this.prenom = collaborateur.prenom;
        this.nom = collaborateur.nom;
      });

      this.cs
      .getCollaborateur(parseInt(sessionStorage.getItem("ID")!))
      .subscribe((collaborateur: Collaborateur) => {
        this.admin = collaborateur;
      });

  }

  ngAfterViewInit(): void {
    this.updateJours();
  }


  async updateJours() {
    const currentMois =
      this.selectedDate.getMonth() < 9
        ? '0' + (this.selectedDate.getMonth() + 1)
        : (this.selectedDate.getMonth() + 1).toString();

    this.nbTicket = 0;

    const data: Jours[] = await this.js
      .getJoursByMoisAndId(this.employe_id, currentMois)
      .toPromise();

    this.jour = data;
    this.jour.sort((a, b) => parseInt(a.jour) - parseInt(b.jour));

    this.jour.forEach((jour) => {
      console.log(jour)
      if (jour.eligible_tr === 'OUI') {
        this.nbTicket++;
      }
      
      const jourDom = document.getElementById(jour.idFormatLong);
      if (jour.valide == false) {
        jourDom!.className = 'ATT-VALIDATION'
      } else {
        jourDom!.className = jour.type
      }
      
    });
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
    this.selectedDate.setMonth(this.selectedDate.getMonth() - 1);
    this.generateCalendar(this.selectedDate);
    this.updateJours();
  }

  nextMonth(): void {
    this.selectedDate.setMonth(this.selectedDate.getMonth() + 1);
    this.generateCalendar(this.selectedDate);
    this.updateJours();
  }

  isSelected(id: string): void {
    document.getElementById(id)!.className = 'selected';
  }
  notSelected(id: string): void {
    document.getElementById(id)!.className = '';
  }

  selectDate(date: Date): void {
    this.selectedDate = date;

    const dateSelected = this.getFormattedDateId(this.selectedDate);

    if (this.datetraitement.length == 0) {
      this.datetraitement.push(dateSelected);
      console.log('Élément ajouté !');
      this.isSelected(dateSelected);
    } else {
      const index = this.datetraitement.indexOf(dateSelected);

      if (index !== -1) {
        // L'élément est présent dans le tableau, on le supprime
        this.datetraitement.splice(index, 1);
        console.log('Élément supprimé !');
        this.notSelected(dateSelected);
      } else {
        // L'élément n'est pas présent dans le tableau, on l'ajoute
        this.datetraitement.push(dateSelected);
        console.log('Élément ajouté !');
        this.isSelected(dateSelected);
      }
    }

    console.log(this.datetraitement);
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

  GestionJours(): void {
    this.choixTypeJour = true;
  }

  async saveJours() {
    this.loadingScreen = true;
    this.messageLoading = 'sauvegarde en cours....';
    
    switch (this.typeCongeSelectionne) {
      case 'ECOLE':
        this.eligibleTr = 'OUI';
        break;
      case 'PRESENT':
        this.eligibleTr = 'OUI';
        break;
      default:
        this.eligibleTr = 'NON';
        break;
    }
  
    const savePromises = this.datetraitement.map(async (element) => {
      const jourToSave = new Jours(
        null,
        this.collaborateur.collaborateur_id,
        element.slice(0, 2),
        element.slice(2, 4),
        element.slice(4, 8),
        this.typeCongeSelectionne,
        this.eligibleTr,
        element,
        true
      );
      
      console.log(element.slice(2, 4))
      
      return this.js.saveJours(jourToSave).toPromise();
    });
  
    await Promise.all(savePromises); // Attend que toutes les sauvegardes soient terminées
     await this.updateJours();
    this.messageLoading = 'Terminée';
    this.datetraitement = [];
    this.choixTypeJour = false;
  
    this.loadingScreen = false;
    //window.location.reload();
  }


  async refuseJours(idFormatLong: string) {

  
    this.refus = true
    this.jourRefus = idFormatLong



    }


    async deleteJours() {

      this.loadingScreen = true;
      this.messageLoading = 'En cours de sauvagarde';
  
      const savePromises = this.jourAttente.map(async (element) => {
  
        return await this.js.deleteJoursByID(this.jourRefus, this.employe_id).toPromise()
      });
    
      await Promise.all(savePromises);
  
    
      await this.es.refusConge(new Email(this.collaborateur.mail,this.admin.nom, this.admin.prenom,this.motifRefus) ).toPromise()
      console.log(this.collaborateur.mail)
  
      await this.updateJours();
  
      this.jourAttente = []
      this.loadingScreen = false;

      this.refus = false
  
  
      }


    

  async accepterJours() {


    this.loadingScreen = true;
    this.messageLoading = 'En cours de sauvagarde';

    const savePromises = this.jourAttente.map(async (element) => {

      const JourTrouve : Jours = await this.js.getJoursById(element).toPromise()
       JourTrouve.valide = true
      
      
      return this.js.saveJours(JourTrouve).toPromise();
    });
  
    await Promise.all(savePromises);

  
    await this.es.validationConge(new Email(this.collaborateur.mail,this.admin.nom, this.admin.prenom,"") ).toPromise()
    console.log(this.collaborateur.mail)

    await this.updateJours();

    this.jourAttente = []
    this.loadingScreen = false;
    }


    selection(idJours: number) {
    if (this.jourAttente.length == 0) {
      document.getElementById(idJours.toString())!.style.backgroundColor = 'green';
      document.getElementById(idJours.toString())!.innerHTML = 'Sélectionné';
      this.jourAttente.push(idJours);
     
    } else {
      const index = this.jourAttente.indexOf(idJours);
      if (index !== -1) {
        // L'élément est présent dans le tableau, on le supprime
        this.jourAttente.splice(index, 1);
        document.getElementById(idJours.toString())!.style.backgroundColor = '#007bff';
        document.getElementById(idJours.toString())!.innerHTML = 'Sélection';
      } else {
        // L'élément n'est pas présent dans le tableau, on l'ajoute
        this.jourAttente.push(idJours);
        document.getElementById(idJours.toString())!.style.backgroundColor = 'green';
        document.getElementById(idJours.toString())!.innerHTML = 'Sélectionné';
        this.isSelected(idJours.toString());
      }
    }
    console.log(this.jourAttente)
      }
  
}


