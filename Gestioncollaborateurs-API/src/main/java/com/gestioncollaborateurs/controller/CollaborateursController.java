package com.gestioncollaborateurs.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gestioncollaborateurs.model.Collaborateurs;
import com.gestioncollaborateurs.service.CollaborateursService;

@RestController
public class CollaborateursController {
	
	@Autowired
	private CollaborateursService cs;
	
	@RequestMapping("/")
	public String acceuil() {
		return ("l'API fonctionne correctement");
	}
	
	
	
	@GetMapping("/Collaborateurs")
	public Iterable<Collaborateurs> getCollaborateurs(){
		
		return cs.getCollaborateurs();
		
	}
	
	
	@GetMapping("/Collaborateur2")
	public String getCollaborateur(){
		return cs.getCollaborateur((long) 1);
	}
	
	

}
