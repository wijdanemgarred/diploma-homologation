package ma.ac.uir.pi2024.resource.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "demande")
public class Demande {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private int id;

    @Column(name = "numdemande")
    private String numDemande;



    @Column(name = "statut")
    private String statut;


    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;


    @OneToMany(fetch = FetchType.LAZY, mappedBy = "demande", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Document> documents;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "demande", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Bac> bac;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "demande", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Diplome> diplome;

    public Demande(int id, String numDemande, String statut, User user) {
        this.id = id;
        this.numDemande = numDemande;
        this.statut = statut;
        this.user = user;
    }

    public Demande() {
    }

    public int getId() {
        return id;
    }

    public String getNumDemande() {
        return numDemande;
    }

    public String getStatut() {
        return statut;
    }

    public User getUser() {
        return user;
    }

    public List<Document> getDocuments() {
        return documents;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setNumDemande(String numDemande) {
        this.numDemande = numDemande;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }


    public void setUser(User user) {
        this.user = user;
    }

    public void setDocuments(List<Document> documents) {
        this.documents = documents;
    }

    public List<Bac> getBac() {
        return bac;
    }

    public void setBac(List<Bac> bac) {
        this.bac = bac;
    }

    public List<Diplome> getDiplome() {
        return diplome;
    }

    public void setDiplome(List<Diplome> diplome) {
        this.diplome = diplome;
    }
}

