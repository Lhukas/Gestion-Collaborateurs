package com.gestioncollaborateurs.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.gestioncollaborateurs.model.Collaborateurs;

@Repository
public interface CollaborateurRepository  extends CrudRepository <Collaborateurs, Long>{

}
