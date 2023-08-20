package com.gestioncollaborateurs.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.gestioncollaborateurs.model.Collaborateurs;
import com.gestioncollaborateurs.model.Jours;

@Repository
public interface JoursRepository extends CrudRepository <Jours, Long>{
	
	

	@Query("SELECT j FROM Jours j WHERE j.id_collaborateurs = :collaborateurId")
	List<Jours> findAllById_collaborateurs(Long collaborateurId);
	
	
	
	@Query("SELECT j FROM Jours j WHERE j.mois = :mois")
	List<Jours> findAllByMois(String mois);


	@Query("SELECT j FROM Jours j WHERE j.mois = :mois and j.id_collaborateurs = :id")
	List<Jours> findAllByMoisAndId(Long id, String mois);
	
	
	
	@Query("SELECT j FROM Jours j WHERE j.idFormatLong = :IDformatLong")
	Jours findJour(@Param("IDformatLong") String jour);
	
	@Modifying
	@Query("DELETE FROM Jours WHERE id_collaborateurs = :id")
	void deleteAllJoursByCollaborateur(@Param("id") Long id);




}
