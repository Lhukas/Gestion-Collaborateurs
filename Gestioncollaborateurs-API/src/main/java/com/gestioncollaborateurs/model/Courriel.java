package com.gestioncollaborateurs.model;

import jakarta.persistence.Entity;


public class Courriel {

	
	private String destinataire;
    private String nom;
    private String prenom;
    private String contenu;
    
    
	public String getContenu() {
		return contenu;
	}
	public void setContenu(String contenu) {
		this.contenu = contenu;
	}
	public String getDestinataire() {
		return destinataire;
	}
	public void setDestinataire(String destinataire) {
		this.destinataire = destinataire;
	}
	public String getNom() {
		return nom;
	}
	public void setNom(String nom) {
		this.nom = nom;
	}
	public String getPrenom() {
		return prenom;
	}
	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}
    
    
    
    
    
    
    
}
