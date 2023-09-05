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

import com.sendgrid.*;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;


@Service
public class emailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private JavaMailSender mailSender;

    public void sendHtmlEmail() throws MessagingException, IOException {
    	 Email from = new Email("test@example.com");
    	    String subject = "Sending with SendGrid is Fun";
    	    Email to = new Email("test@example.com");
    	    Content content = new Content("text/plain", "and easy to do anywhere, even with Java");
    	    Mail mail = new Mail(from, subject, to, content);

    	    SendGrid sg = new SendGrid("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");
    	    Request request = new Request();
    	    try {
    	      request.setMethod(Method.POST);
    	      request.setEndpoint("mail/send");
    	      request.setBody(mail.build());
    	      Response response = sg.api(request);
    	      System.out.println(response.getStatusCode());
    	      System.out.println(response.getBody());
    	      System.out.println(response.getHeaders());
    	    } catch (IOException ex) {
    	      throw ex;
    	    }
    	  
    }
}
