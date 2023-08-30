package com.gestioncollaborateurs.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.gestioncollaborateurs.model.Collaborateurs;

@Repository
public interface CollaborateurRepository  extends CrudRepository <Collaborateurs, Long>{

	
	@Query("SELECT c FROM Collaborateurs c WHERE c.trigramme = :trigramme ")
	Collaborateurs findByTrigramme(@Param("trigramme") String trigramme);

}
