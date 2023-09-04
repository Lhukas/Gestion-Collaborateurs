package com.gestioncollaborateurs.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class emailService {

    @Autowired
    private JavaMailSender javaMailSender;

    public void sendEmail(String destinataire, String objet, String contenu) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(destinataire);
            message.setSubject(objet);
            message.setText(contenu);
            javaMailSender.send(message);
        } catch (MailException e) {
            // Gérer les erreurs d'envoi d'e-mail ici
            e.printStackTrace();
        }
    }
}
