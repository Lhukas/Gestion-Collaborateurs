import { Injectable } from '@angular/core';
import * as SibApiV3Sdk from '@sendinblue/client';




@Injectable({
  providedIn: 'root'
})
export class EmailService {

  apiInstance: any;



  constructor() {

 const ApiKey = "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"
  const apiInstance = new SibApiV3Sdk.AccountApi()

apiInstance.setApiKey(SibApiV3Sdk.AccountApiApiKeys.apiKey, ApiKey)

   }



  EmailDemande(idCollaborateur: number, mail: string) {

    

this.apiInstance.getAccount().then(
  function (data: { body: any; }) {
    console.log('API called successfully. Returned data: ', data.body)
  },
  function (error: any) {
    console.error(error)
  }
)
   
  }

  



}
