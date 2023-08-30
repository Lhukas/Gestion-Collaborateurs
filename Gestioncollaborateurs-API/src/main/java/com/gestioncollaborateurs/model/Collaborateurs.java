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
	
	private String matricule;
	
	private String trigramme;
	
	private String groupe;
	
	private Boolean admin;
	
	
	private String mdp;
	





	public String getMatricule() {
		return matricule;
	}


	public void setMatricule(String matricule) {
		this.matricule = matricule;
	}


	public String getTrigramme() {
		return trigramme;
	}


	public void setTrigramme(String trigramme) {
		this.trigramme = trigramme;
	}


	public String getGroupe() {
		return groupe;
	}


	public void setGroupe(String groupe) {
		this.groupe = groupe;
	}


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


	public Boolean getAdmin() {
		return admin;
	}


	public void setAdmin(Boolean admin) {
		this.admin = admin;
	}


	public String getMdp() {
		return mdp;
	}


	public void setMdp(String mdp) {
		this.mdp = mdp;
	}
	
	
	




	
	
		
}
