import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CalendrierEmployeComponent } from "./calendrier-employe/calendrier-employe.component";
import { CollaborateursComponent } from "./collaborateurs/collaborateurs.component";
import { ListEmployeComponent } from "./list-employe/list-employe.component";

const routes : Routes = [

{ path: '', component : ListEmployeComponent },
{ path: 'Acceuil', component : ListEmployeComponent },
{ path: 'Calendrier/:id', component : CalendrierEmployeComponent },
{ path: 'Collaborateur', component : CollaborateursComponent },
];


@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule{}