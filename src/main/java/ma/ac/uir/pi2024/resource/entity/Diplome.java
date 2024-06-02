package ma.ac.uir.pi2024.resource.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;


@Entity
@Table(name = "diplome")
public class Diplome {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private int id;


    @Column(name = "type")
    private String type;


    @Column(name = "etablissment")
    private String etablissment;

    @Column(name = "domaine")
    private String domaine;

    @Column(name = "date")
    private String date;

    @Column(name = "pays")
    private String pays;

    @Column(name = "diplomemaroc")
    private String diplomemaroc;

    @ManyToOne(cascade = CascadeType.ALL)
    @JsonIgnore
    @JoinColumn(name = "demande_id")
    private Demande demande;

    public Diplome(int id, String type, String etablissment, String domaine, String date, String pays, String diplomemaroc) {
        this.id = id;
        this.type = type;
        this.etablissment = etablissment;
        this.domaine = domaine;
        this.date = date;
        this.pays = pays;
        this.diplomemaroc = diplomemaroc;
    }

    public Diplome() {

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getEtablissment() {
        return etablissment;
    }

    public void setEtablissment(String etablissment) {
        this.etablissment = etablissment;
    }

    public String getDomaine() {
        return domaine;
    }

    public void setDomaine(String domaine) {
        this.domaine = domaine;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getPays() {
        return pays;
    }

    public void setPays(String pays) {
        this.pays = pays;
    }

    public String getDiplomemaroc() {
        return diplomemaroc;
    }

    public void setDiplomemaroc(String diplomemaroc) {
        this.diplomemaroc = diplomemaroc;
    }

    public Demande getDemande() {
        return demande;
    }

    public void setDemande(Demande demande) {
        this.demande = demande;
    }

    @Override
    public String toString() {
        return "Diplome{" +
                "id=" + id +
                ", type='" + type + '\'' +
                ", etablissment='" + etablissment + '\'' +
                ", domaine='" + domaine + '\'' +
                ", date='" + date + '\'' +
                ", pays='" + pays + '\'' +
                ", diplomemaroc='" + diplomemaroc + '\'' +
                '}';
    }
}
