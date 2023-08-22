import { Component, OnInit } from '@angular/core';
import { addMonths, subMonths, startOfWeek, format, eachDayOfInterval, addDays } from 'date-fns';

import { CalendarView, CalendarEvent } from 'angular-calendar';
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

  ngOnInit(): void {
    this.weekdays = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    this.selectedDate = new Date();
    this.generateCalendar(this.selectedDate);
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
    this.selectedDate = subMonths(this.selectedDate, 1);
    this.generateCalendar(this.selectedDate);
  }

  nextMonth(): void {
    this.selectedDate = addMonths(this.selectedDate, 1);
    this.generateCalendar(this.selectedDate);
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
}

