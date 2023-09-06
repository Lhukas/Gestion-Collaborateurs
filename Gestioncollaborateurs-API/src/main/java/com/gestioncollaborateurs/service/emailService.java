package com.gestioncollaborateurs.service;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;

import com.gestioncollaborateurs.model.Courriel;
import com.sendgrid.*;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import com.sendgrid.helpers.mail.objects.Personalization;


@Service
public class emailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private JavaMailSender mailSender;

    public int demandeConge(Courriel courriel) throws MessagingException, IOException {
    	 
    	 
    	 String apiKey = "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"; // Remplacez par votre clé API SendGrid
         String templateId = "d-a7a332143cad4e16a43314889cedb2cb"; // ID de votre modèle SendGrid

         Mail mail = new Mail();
    	 
    	 /*Template*/
    	 mail.setTemplateId("d-a7a332143cad4e16a43314889cedb2cb");
    	 
    	 
    	 /*from party*/
	 	 	Email fromEmail = new Email();
	 	    fromEmail.setName("DL planning");
	 	    fromEmail.setEmail("dlinfo.planning@gmail.com");
	 	    mail.setFrom(fromEmail);
    	    
    	    
    	
    	    
    	    /*Partie destinataire*/
    	    final Personalization personalization = new Personalization();
    	    personalization.addTo( new Email(courriel.getDestinataire()));
    	    personalization.addDynamicTemplateData("nom", courriel.getNom().toUpperCase());
    	    personalization.addDynamicTemplateData("prenom", courriel.getPrenom());
    	   
    	   
    	    mail.addPersonalization(personalization);
    	   

    	    SendGrid sg = new SendGrid("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");
    	    Request request = new Request();
    	    try {
    	      request.setMethod(Method.POST);
    	      request.setEndpoint("mail/send");
    	      request.setBody(mail.build());
    	      Response response = sg.api(request);
    	      return response.getStatusCode();
    	    } catch (IOException ex) {
    	      throw ex;
    	    }
    	  
    }
     
    }

