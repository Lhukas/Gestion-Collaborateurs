import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-menu-nav',
  templateUrl: './menu-nav.component.html',
  styleUrls: ['./menu-nav.component.scss']
})
export class MenuNavComponent  {


  NamePage : string = "Dashboard"
  

  changePath(path : string) : void{

    this.NamePage = path
  }




}
