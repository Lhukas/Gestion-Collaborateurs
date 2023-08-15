import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CollaborateursService } from '../services/collaborateurs.service';
import { Collaborateur } from '../models/collaborateur-modele';
import { Jours } from '../models/jours-modele';
import { JoursServices } from '../services/jours.services';
import { async } from 'rxjs/internal/scheduler/async';

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

  current_month_string!: string;

  collaborateur!: Collaborateur;

  datetraitement: string[] = [];
  jour!: Jours[];
  JourSelect: Jours[] = [];
  choixTypeJour: boolean = false;
  typeCongeSelectionne!: string;
  eligibleTr!: string;
  messageLoading!: string;
  loadingScreen!: boolean;

  constructor(
    private route: ActivatedRoute,
    private cs: CollaborateursService,
    private js: JoursServices
  ) {}

  ngOnInit(): void {
    this.weekdays = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
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
  }

  ngAfterViewInit(): void {
    this.putJours();
  }

  putJours() {
    const currentMois =
      this.selectedDate.getMonth() < 9
        ? '0' + (this.selectedDate.getMonth() + 1)
        : (this.selectedDate.getMonth() + 1).toString();

    this.js.getJoursByMoisAndId(this.employe_id, currentMois).subscribe(
      (data: Jours[]) => {
        this.jour = data;
        this.jour.forEach(function (jour) {
          const jourDom = document.getElementById(jour.idFormatLong);
          switch (jour.type) {
            case 'CSS':
              jourDom!.style.backgroundColor = 'black';
              jourDom!.style.color = 'white';
              break;

            case 'CP':
              jourDom!.style.backgroundColor = 'orange';
              jourDom!.style.color = 'black';
              break;

            case 'PRESENT':
              jourDom!.style.backgroundColor = 'green';
              jourDom!.style.color = 'white';
              break;

            case 'ABS':
              jourDom!.style.backgroundColor = 'red';
              jourDom!.style.color = 'white';
              break;

            default:
              break;
          }
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
    this.selectedDate.setMonth(this.selectedDate.getMonth() - 1);
    this.generateCalendar(this.selectedDate);
    this.putJours();
  }

  nextMonth(): void {
    this.selectedDate.setMonth(this.selectedDate.getMonth() + 1);
    this.generateCalendar(this.selectedDate);
    this.putJours();
  }

  isSelected(id: string): void {
    document.getElementById(id)!.style.backgroundColor = '#1A598D';
    document.getElementById(id)!.style.color = 'white';
  }
  notSelected(id: string): void {
    document.getElementById(id)!.style.backgroundColor = 'transparent';
    document.getElementById(id)!.style.color = 'black';
  }
  /*
  selectDate(date: Date): void {
    const dateSelected: Jours = new Jours(
      null,
      this.collaborateur.collaborateur_id,
      date.getDate().toString(),
      date.getMonth().toString(),
      date.getFullYear().toString(),
      null,
      null,
      this.getFormattedDateId(date)
    );

    if (this.JourSelect.length == 0) {
      this.JourSelect.push(dateSelected);
      console.log('Élément ajouté !');
    } else {
      const index = this.JourSelect.indexOf(dateSelected);

      if (index !== -1) {
        // L'élément est présent dans le tableau, on le supprime
        this.JourSelect.splice(index, 1);
        console.log('Élément supprimé !');
      } else {
        // L'élément n'est pas présent dans le tableau, on l'ajoute
        this.JourSelect.push(dateSelected);
        console.log('Élément ajouté !');
      }
    }
    console.log(this.JourSelect);
  }
  */
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

  async saveJours(): Promise<void> {
    this.loadingScreen = true;
    this.messageLoading = 'sauvegarde en cours....';
    switch (this.typeCongeSelectionne) {
      case 'CP':
        this.eligibleTr = 'OUI';
        break;
      case 'PRESENT':
        this.eligibleTr = 'OUI';
        break;
      default:
        this.eligibleTr = 'NON';
        break;
    }

    await this.datetraitement.forEach((element) => {
      const jourToSave: Jours = new Jours(
        null,
        this.collaborateur.collaborateur_id,
        element.slice(0, 2),
        element.slice(3, 4),
        element.slice(4, 8),
        this.typeCongeSelectionne,
        this.eligibleTr,
        element
      );
      console.log("jours :" +  element.slice(0, 2))

      this.js.saveJours(jourToSave).subscribe();
    });

    this.messageLoading = 'Terminée';
    this.datetraitement = [];
    this.choixTypeJour = false;
    this.ngOnInit();
    await this.putJours();
    this.loadingScreen = false;
  }
}
