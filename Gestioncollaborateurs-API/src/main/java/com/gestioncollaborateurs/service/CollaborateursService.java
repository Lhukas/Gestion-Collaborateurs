package com.gestioncollaborateurs.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gestioncollaborateurs.model.Collaborateurs;
import com.gestioncollaborateurs.repository.CollaborateurRepository;

import lombok.Data;

@Data
@Service
public class CollaborateursService {
	
	
	@Autowired
	private CollaborateurRepository cr;
	
	
	public String getCollaborateur( final Long id ){
		Collaborateurs nCollaborateurs = cr.findById(id).get();
		return nCollaborateurs.toString();
		
	}
	
	
	public Iterable<Collaborateurs> getCollaborateurs(){
		return cr.findAll();
	}
	
	public void deleteCollaborateurs( final Long id) {
		
		cr.deleteById(id);
	}


	public Collaborateurs saveCollaborateurs( Collaborateurs collaborateur) {
		Collaborateurs collaborateurSave = cr.save(collaborateur);
		return collaborateurSave;
	}

}
