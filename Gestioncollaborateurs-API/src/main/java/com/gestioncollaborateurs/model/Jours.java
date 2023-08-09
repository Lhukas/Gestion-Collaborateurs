package com.gestioncollaborateurs.model;

import org.hibernate.bytecode.internal.bytebuddy.PrivateAccessorException;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "jours")
public class Jours {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id_jour;
	
	
	
	@Column(name = "id_collaborateurs")
	private Long id_collaborateurs;
	
	
	private String jour;
	
	@Column(name = "mois")
	private String mois;
	
	private String annee;
	
	
	private String type;
	
	
	private String eligible_tr;
	
	private String idFormatLong;

	
	



	public Long getId_jours() {
		return id_jour;
	}


	public void setId_jours(Long id_jours) {
		this.id_jour = id_jours;
	}


	public String getJour() {
		return jour;
	}


	public void setJour(String jour) {
		this.jour = jour;
	}


	public String getMois() {
		return mois;
	}


	public void setMois(String mois) {
		this.mois = mois;
	}


	public String getAnnee() {
		return annee;
	}


	public void setAnnee(String annee) {
		this.annee = annee;
	}


	public String getType() {
		return type;
	}


	public void setType(String type) {
		this.type = type;
	}


	public String getEligible_tr() {
		return eligible_tr;
	}


	public void setEligible_tr(String eligible_tr) {
		this.eligible_tr = eligible_tr;
	}


	public Long getId_collaborateurs() {
		return id_collaborateurs;
	}


	public void setId_collaborateurs(Long id_collaborateurs) {
		this.id_collaborateurs = id_collaborateurs;
	}


	public String getIdFormatLong() {
		return idFormatLong;
	}


	public void setIdFormatLong() {
		
		if(Integer.parseInt(this.jour)< 10) {
			setJour("0"+this.jour);
		}
		
		if(Integer.parseInt(this.mois)< 10) {
			setMois("0"+this.mois);
		}
		this.idFormatLong = this.jour + this.mois + this.annee;
	}
	
	
}
