package com.gestioncollaborateurs.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "collaborateurs")
public class Collaborateurs {

	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long collaborateur_id;
	
	

	private String prenom;
	
	private String nom;
	
	
	private String ticket_resto;


	public Long getCollaborateur_id() {
		return collaborateur_id;
	}


	public void setCollaborateur_id(Long collaborateur_id) {
		this.collaborateur_id = collaborateur_id;
	}


	public String getPrenom() {
		return prenom;
	}


	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}


	public String getNom() {
		return nom;
	}


	public void setNom(String nom) {
		this.nom = nom;
	}


	public String getTicket_resto() {
		return ticket_resto;
	}


	public void setTicket_resto(String ticket_resto) {
		this.ticket_resto = ticket_resto;
	}


	@Override
	public String toString() {
		return "Collaborateurs [collaborateur_id=" + collaborateur_id + ", prenom=" + prenom + ", nom=" + nom
				+ ", ticket_resto=" + ticket_resto + "]";
	}
	
	
	




	
	
		
}
