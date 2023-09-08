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

import jakarta.transaction.Transactional;

@Repository
public interface JoursRepository extends CrudRepository <Jours, Long>{
	
	

	@Query("SELECT j FROM Jours j WHERE j.id_collaborateurs = :collaborateurId")
	List<Jours> findAllById_collaborateurs(Long collaborateurId);
	
	
	
	@Query("SELECT j FROM Jours j WHERE j.mois = :mois")
	List<Jours> findAllByMois(String mois);


	@Query("SELECT j FROM Jours j WHERE j.mois = :mois and j.id_collaborateurs = :id")
	List<Jours> findAllByMoisAndId(Long id, String mois);
	
	
	
	@Query("SELECT j FROM Jours j WHERE j.idFormatLong = :IDformatLong AND j.id_collaborateurs = :IDcollaborateur")
	Jours findJour(@Param("IDformatLong") String IDformatLong, @Param("IDcollaborateur") Long long1);
	
	@Modifying
	@Query("DELETE FROM Jours WHERE id_collaborateurs = :id")
	void deleteAllJoursByCollaborateur(@Param("id") Long id);


	@Modifying
	@Query("DELETE FROM Jours j WHERE j.id_collaborateurs = :IDcollaborateur AND j.id_jour = :IDJours")
	@Transactional
	void deletejoursByIdFormat(@Param("IDcollaborateur") Long IDcollaborateur, @Param("IDJours") String IDJours);



}
