package com.gestioncollaborateurs.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.gestioncollaborateurs.model.Collaborateurs;
import com.gestioncollaborateurs.model.Jours;

@Repository
public interface JoursRepository extends CrudRepository <Jours, Long>{
	
	

	@Query("SELECT j FROM Jours j WHERE j.id_collaborateurs = :collaborateurId")
	List<Jours> findAllById_collaborateurs(Long collaborateurId);

}
