import { Component, OnInit } from '@angular/core';
import { EmailService } from '../services/email.services';
import { Email } from '../models/email-modele';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {


  constructor(
    private es : EmailService,
  ) { }

   ngOnInit() {
  }




  test() {
    console.log(this.es.demandeConge(new Email("lhukassauvage@gmail.com","nelhomme","lhukas")).toPromise())
    }

}
