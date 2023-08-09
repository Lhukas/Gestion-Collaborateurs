export class Jours {
   
  
    constructor(
        public id_jour: number,
        public id_collaborateurs: number,
        public jour: number,
        public mois: number,
        public annee: number,
        public type: string,
        public eligible_tr: string,
        public idFormatLong : string
      ) 
    {}
  }
  