package com.gestioncollaborateurs.service;

import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gestioncollaborateurs.model.Collaborateurs;
import com.gestioncollaborateurs.repository.CollaborateurRepository;
import com.gestioncollaborateurs.repository.JoursRepository;

import jakarta.transaction.Transactional;
import lombok.Data;

@Data
@Service
public class CollaborateursService {
	
	
	@Autowired
	private CollaborateurRepository cr;
	
	@Autowired
	private JoursRepository jr;
	
	
	public Collaborateurs getCollaborateur( final Long id ){
		return cr.findById(id).get();
				
				/*.orElseThrow(()->new UserNotFoundException("ce collaborateur n'as pas été trouvé"));*/
		
	}
	
	
	public Iterable<Collaborateurs> getCollaborateurs(){
		return cr.findAll();
	}
	
	@Transactional
	public void deleteCollaborateurs( final Long id) {
		cr.deleteById(id);
		jr.deleteAllJoursByCollaborateur(id);
		
	}


	public Collaborateurs saveCollaborateurs( Collaborateurs collaborateur) {
		Collaborateurs collaborateurSave = cr.save(collaborateur);
		return collaborateurSave;
	}


	public void updateCollaborateurs(Collaborateurs collaborateurs) {
		cr.save(collaborateurs);
		
	}

}
