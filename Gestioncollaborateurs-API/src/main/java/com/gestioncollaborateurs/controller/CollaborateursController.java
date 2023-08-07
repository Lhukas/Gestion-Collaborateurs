package com.gestioncollaborateurs.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gestioncollaborateurs.model.Collaborateurs;
import com.gestioncollaborateurs.service.CollaborateursService;



@CrossOrigin(origins = "*")
@RestController
public class CollaborateursController {
	
	@Autowired
	private CollaborateursService cs;
	
	@RequestMapping("/")
	public String acceuil() {
		return ("l'API fonctionne correctement");
	}
	
	
	
	@GetMapping("/Collaborateurs/")
	public Iterable<Collaborateurs> getCollaborateurs(){
		
		return cs.getCollaborateurs();
		
	}

	@GetMapping("/Collaborateurs/{id}")
	public Collaborateurs getCollaborateur(@PathVariable Long id){
		return cs.getCollaborateur(id);
	}
	
	@RequestMapping("/Collaborateurs/save")
	public void addCollaborateurs(@RequestBody Collaborateurs collaborateurs) {
		cs.saveCollaborateurs(collaborateurs);
	}
	
	@RequestMapping("/Collaborateurs/update"  )
	public void updateCollaborateurs(@RequestBody Collaborateurs collaborateurs) {
		cs.updateCollaborateurs(collaborateurs);
	}
	
	
	@RequestMapping("/Collaborateurs/delete/{id}"  )
	public void delateCollaborateurs(@PathVariable Long id) {
		cs.deleteCollaborateurs(id);
	}
	
	
	
	

}

/*
 * 
 * 
 * [{"id":1,"prenom":"fbds","nom":"fdb","mail":"fdb","ticket_resto":"fdsb"},
 * {"id":2,"prenom":"fbd","nom":"fsdb","mail":"gb","ticket_resto":"fbd"}]*/
