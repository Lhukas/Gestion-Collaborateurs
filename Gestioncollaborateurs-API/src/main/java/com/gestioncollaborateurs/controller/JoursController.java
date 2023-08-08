package com.gestioncollaborateurs.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gestioncollaborateurs.model.Collaborateurs;
import com.gestioncollaborateurs.model.Jours;
import com.gestioncollaborateurs.service.JoursService;

@CrossOrigin(origins = "*")
@RestController
public class JoursController {
	
	
	
	@Autowired
	private JoursService js;
	
	
	@GetMapping("/Jours/")
	public Iterable<Jours> getJours(){
		return js.getJours();
	}
	
	
	@GetMapping("/Jours/{id}")
	public Optional<Jours> getJour(Long id){
		return js.getJour(id);
	}
	
	@RequestMapping("/Jours/save")
	public void addJours(@RequestBody Jours jour) {
		js.saveJour(jour);
	}
	
	@RequestMapping("/Jours/update")
	public void updateJour(@RequestBody Jours jour) {
		js.updateJours(jour);
	}
	
	@GetMapping("/Jours/collaborateur/{id}")
    public List<Jours> getJoursByCollaborateur(@PathVariable Long id) {
        return js.getJoursByCollaborateurId(id);
    }

	
	
	@GetMapping("/Jours/mois/{mois}")
    public List<Jours> getJoursByMois(@PathVariable String mois) {
        return js.getJoursByMois(mois);
    }
}
