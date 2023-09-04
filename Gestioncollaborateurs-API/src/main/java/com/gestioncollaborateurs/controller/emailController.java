package com.gestioncollaborateurs.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.gestioncollaborateurs.model.email;
import com.gestioncollaborateurs.service.CollaborateursService;
import com.gestioncollaborateurs.service.emailService;

@CrossOrigin(origins = "*")
@RestController
public class emailController {
	
	@Autowired
	private emailService es;
	
	@Autowired
	private CollaborateursService cs;
	
	
	
	
	 @PostMapping("/send-email")
	    public String sendEmail(@RequestBody email emailRequest) {
	        // Utilisez le service d'e-mail pour envoyer un e-mail
	        es.sendEmail(emailRequest.getDestinataire(), emailRequest.getObjet(), emailRequest.getContenu());
	        return "E-mail envoyé avec succès!";
	    }
	
	
	
	
	

}
