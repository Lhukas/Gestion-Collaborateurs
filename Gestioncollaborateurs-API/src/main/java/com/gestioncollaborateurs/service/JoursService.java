package com.gestioncollaborateurs.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import com.gestioncollaborateurs.model.Collaborateurs;
import com.gestioncollaborateurs.model.Jours;
import com.gestioncollaborateurs.repository.JoursRepository;

import lombok.Data;

@Data
@Service
public class JoursService {
	
	
	@Autowired
	private JoursRepository jr;
	
	
	public Optional<Jours> getJour(final Long id) {
		return jr.findById(id);
	}
	
	
	 public Iterable<Jours> getJours(){
		return jr.findAll();
	}
	 
	 
	 public void updateJours(Jours jour) {
		jr.save(jour);
		 
	 }
	
	 
	 public Jours saveJour(Jours jour) {
		 jour.setIdFormatLong();
		 return jr.save(jour);
		
	 }
	 
	
	public List<Jours> getJoursByCollaborateurId(Long id) {
		return jr.findAllById_collaborateurs(id);
	}
	
	
	public List<Jours> getJoursByMois(String mois) {
		return jr.findAllByMois(mois);
	}


	public List<Jours> getJoursByMoisAndId(Long id, String mois) {
		return jr.findAllByMoisAndId(id,mois);
	}



}
