export class Collaborateur {

    constructor(
        
        public collaborateur_id: number | null,
        public nom : string,
        public prenom : string,
        public ticket_resto : string, 
        public trigramme : string,
        public matricule : string,
        public groupe : string,
        public admin : boolean,
        public mdp : string
        ){}

}