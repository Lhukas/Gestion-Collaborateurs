package com.gestioncollaborateurs.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="Collaborateurs")
public class Collaborateurs {

	
	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY)
	private Long id;
	
	
	@Column(name = "prenom")
	private String prenom;
	
	@Column(name = "nom")
	private String nom;
	
	private String mail;
	
	private String ticket_resto;

	@Override
	public String toString() {
		return "Collaborateurs [id=" + id + ", prenom=" + prenom + ", nom=" + nom + ", mail=" + mail + ", ticket_resto="
				+ ticket_resto + "]";
	}
	
	
	
		
}
