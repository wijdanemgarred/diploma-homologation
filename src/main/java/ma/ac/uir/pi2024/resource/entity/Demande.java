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

    @Column(name = "diplome")
    private String diplome;

    @Column(name = "statut")
    private String statut;


    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "demande", cascade = CascadeType.ALL)
    private List<Document> documents;


    public Demande(int id, String numDemande, String statut, User user,String diplome) {
        this.id = id;
        this.numDemande = numDemande;
        this.statut = statut;
        this.diplome = diplome;
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

    public String getDiplome() {
        return diplome;
    }

    public void setDiplome(String diplome) {
        this.diplome = diplome;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setDocuments(List<Document> documents) {
        this.documents = documents;
    }
}
