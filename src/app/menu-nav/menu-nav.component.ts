import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-menu-nav',
  templateUrl: './menu-nav.component.html',
  styleUrls: ['./menu-nav.component.scss']
})
export class MenuNavComponent implements OnInit {


  NamePage : string = "Dashboard"
  admin !: boolean;
  
  constructor(private route: ActivatedRoute) { }

  changePath(path : string) : void{

    this.NamePage = path
  }

  ngOnInit() {
    const currentRoute = this.route.snapshot.routeConfig?.path; // Utilisation de l'opérateur de navigation sécurisée (?.)
    
    if (currentRoute) {
      
      switch (currentRoute) {
        case "Vue-ensemble":
          this.changePath("Vue d'ensemble");
          break;
      
        default:
          this.changePath(currentRoute);
          break;
      }
    } 

    
    this.admin = sessionStorage.getItem("ADMIN") == null;





  }
  




}
