export class Jours {
   
  
    constructor(
        public id_jour: number | null,
        public id_collaborateurs: number | null,
        public jour: string,
        public mois: string,
        public annee: string,
        public type: string | null,
        public eligible_tr: string | null,
        public idFormatLong : string 
      ) 
    {}
  }
  