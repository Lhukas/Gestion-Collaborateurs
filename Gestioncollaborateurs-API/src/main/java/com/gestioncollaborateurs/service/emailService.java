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
    	 mail.setTemplateId(templateId);
    	 
    	 
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
    	   

    	    SendGrid sg = new SendGrid(apiKey);
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
     
    
    
    
    
    
    
    public int ValidationConge(Courriel courriel) throws MessagingException, IOException {
   	 
   	 
   	 String apiKey = "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"; // Remplacez par votre clé API SendGrid
        String templateId = "d-842863e3601341e6a573932b0a233b1f"; // ID de votre modèle SendGrid

        Mail mail = new Mail();
   	 
   	 /*Template*/
   	 mail.setTemplateId(templateId);
   	 
   	 
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
   	   // personalization.addDynamicTemplateData("Jours", courriel.getContenu());
   	    
   	   
   	   
   	    mail.addPersonalization(personalization);
   	   

   	    SendGrid sg = new SendGrid(apiKey);
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
    
    
    
    public int RefusConge(Courriel courriel) throws MessagingException, IOException {
      	 
      	 
      	 String apiKey = "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"; // Remplacez par votre clé API SendGrid
           String templateId = "d-761aa6417bee42019d06a9d8534ea0c8"; // ID de votre modèle SendGrid

           Mail mail = new Mail();
      	 
      	 /*Template*/
      	 mail.setTemplateId(templateId);
      	 
      	 
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
      	    personalization.addDynamicTemplateData("contenu", courriel.getContenu());
      	    
      	   
      	   
      	    mail.addPersonalization(personalization);
      	   

      	    SendGrid sg = new SendGrid(apiKey);
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

