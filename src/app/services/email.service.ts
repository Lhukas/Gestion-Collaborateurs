import { Injectable } from '@angular/core';
import * as nodemailer from 'nodemailer';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'votre_adresse@gmail.com', // Remplacez par votre adresse Gmail
      pass: 'votre_mot_de_passe' // Remplacez par votre mot de passe Gmail
    }
  });

  constructor() { }

  sendEmail(to: string, subject: string, text: string): Promise<any> {
    const mailOptions = {
      from: 'votre_adresse@gmail.com',
      to: to,
      subject: subject,
      text: text
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
