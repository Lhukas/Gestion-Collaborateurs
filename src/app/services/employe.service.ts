import { Injectable } from "@angular/core";
import { Employe } from "../models/employe-modele";


//services de employe , ce sera la que sera fait les appels pour le backend
@Injectable({
    providedIn: 'root'
})

export class EmployeService {
    ListEmploye : Employe[] = [
        new Employe(1,"lhukas","nelhomme",10,new Date(),"test"),
        new Employe(2,"julien","caullet",10.123456789,new Date(),"paris" ),
        new Employe(3,"Aurelie","bellenfant",10.123456789,new Date(),"paris" ),
        new Employe(4,"guy","tchatat",10.123456789,new Date(),"paris" )
    ]

//function pour recuperer tous les employe
    getAllEmploye() : Employe[] {
        return this.ListEmploye;
    }

//trouve un employe par son id
getEmployeByID(IDemploye : number) : Employe {

    const employeFound = this.ListEmploye.find(employe => employe.id == IDemploye)
    
    if (!employeFound) {
        throw new Error('personne none trouvé')
    } else {
        return employeFound;
    }
    
}

/* petie tips rapide

variable === 'valeur qu'on veux vrai ' ? action si vrai : action si faux

exemple : snapType === 'ajouter' ? faceSnap++ : faceSnap--;

*/

}