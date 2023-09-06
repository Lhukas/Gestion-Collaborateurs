package com.gestioncollaborateurs.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


import com.gestioncollaborateurs.model.Courriel;
import com.gestioncollaborateurs.service.CollaborateursService;
import com.gestioncollaborateurs.service.emailService;

import jakarta.mail.MessagingException;

@CrossOrigin(origins = "*")
@RestController
public class emailController {
	
	@Autowired
	private emailService es;
	
	@Autowired
	private CollaborateursService cs;
	
	
	
	
	 @PostMapping("/Conge/demande")
	    public int demandeConge(@RequestBody Courriel email) throws MessagingException, IOException {
	        
		    return es.demandeConge(email);
	        
	    }
	 
	 
	 
	 @PostMapping("/Conge/valide")
	    public int ValidationConge(@RequestBody Courriel email) throws MessagingException, IOException {
	        return es.ValidationConge(email);
	    }
	 
	 

	 @PostMapping("/Conge/refus")
	    public int refusConge(@RequestBody Courriel email) throws MessagingException, IOException {
	        
	        return es.RefusConge(email);
	    }
	
	
	
	
	

}
