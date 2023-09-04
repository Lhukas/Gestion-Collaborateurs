import { Injectable } from '@angular/core';
import * as nodemailer from 'nodemailer';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'dlinfo.planning@gmail.com', // Remplacez par votre adresse Gmail
      pass: '20@Lhukas01' // Remplacez par votre mot de passe Gmail
    }
  });

  constructor() { }

 








  EmailDemande(prenom : string, nom : string, email : string) : Promise<any>{
    
    const mailOptions = {
      from: 'dlinfo.planning@gmail.com',
      to: email,
      subject: "Demande de congée(s)",
      text: "demande de congé"
    };


    return new Promise((resolve, reject) => {
      this.transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve(info);
        }
      });
    });

  
  }


  Emailrefus(motif : string, email : string){
    const mailOptions = {
      from: 'dlinfo.planning@gmail.com',
      to: email,
      subject: "Refus de congée(s)",
      text: "demande de congé"
    };


    return new Promise((resolve, reject) => {
      this.transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve(info);
        }
      });
    });

  }



  EmailAccord(prenom : string, nom : string, email : string){

    const mailOptions = {
      from: 'dlinfo.planning@gmail.com',
      to: email,
      subject: "Accord congée(s)",
      text: "demande de congé"
    };


    return new Promise((resolve, reject) => {
      this.transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve(info);
        }
      });
    });

  }



}
