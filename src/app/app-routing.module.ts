import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CalendrierEmployeComponent } from "./calendrier-employe/calendrier-employe.component";
import { CollaborateursComponent } from "./collaborateurs/collaborateurs.component";
import { VueEnsembleComponent } from "./vue-ensemble/vue-ensemble.component";
import { PageConnexionComponent } from "./page-connexion/page-connexion.component";
import { AppComponent } from "./app.component";
import { DashboardCollaborateurComponent } from "./dashboard-collaborateur/dashboard-collaborateur.component";
import { DashboardAdminComponent } from "./dashboard-admin/dashboard-admin.component";
import { TestComponent } from "./test/test.component";


const routes : Routes = [

    { path: '', redirectTo: 'Connexion', pathMatch: 'full' },
    { path: 'Connexion', component : PageConnexionComponent },
    { path: 'Calendrier/:id', component : CalendrierEmployeComponent },
    { path: 'Collaborateur', component : CollaborateursComponent },
    { path: 'Vue-ensemble', component : VueEnsembleComponent },
    { path: 'Dashboard-Collaborateur', component : DashboardCollaborateurComponent },
    { path: 'Dashboard-admin', component : DashboardAdminComponent },
    { path: 'test', component : TestComponent },
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