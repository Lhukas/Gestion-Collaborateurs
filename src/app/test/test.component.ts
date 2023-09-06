import { Component, OnInit } from '@angular/core';
import { EmailService } from '../services/email.services';
import { Email } from '../models/email-modele';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  jourAttente: number[] = [12022023, 12022023, 13022023];
  constructor(
    private es : EmailService,
  ) { }

   ngOnInit() {


  }




  async test() {

    this.jourAttente.sort((a, b) => a - b);

    let joursJSON = this.jourAttente.map(jour => ({ jour: jour.toString() }));
    let joursJSONString = JSON.stringify(joursJSON);

    console.log(joursJSONString)

    console.log( await this.es.validationConge(new Email("lhukassauvage@gmail.com","test", "test",joursJSONString) ).toPromise())
    }

}
