

export class Employe {
    constructor(
        public nom : string,
        public prenom : string,
        public nombreConge : number,
        public today : Date,
        public location?: string
        
        ){}
}