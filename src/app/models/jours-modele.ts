export class Jours {
   
  
    constructor(
        public id_jours: number | null,
        public id_collaborateurs: number | null,
        public jour: string,
        public mois: string,
        public annee: string,
        public type: string ,
        public eligible_tr: string,
        public idFormatLong : string,
        public valide : boolean
      ) 
    {}
  }
  