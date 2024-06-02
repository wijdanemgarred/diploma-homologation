package ma.ac.uir.pi2024.resource.entity;

import jakarta.persistence.*;


@Entity
@Table(name = "bac")
public class Bac {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private int id;


    @Column(name = "serie")
    private String serie;

    @Column(name = "pays")
    private String pays;

    @Column(name = "date")
    private String date;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "demande_id")
    private Demande demande;


    public Bac(int id, String serie, String pays, String date) {
        this.id = id;
        this.serie = serie;
        this.pays = pays;
        this.date = date;
    }

    public Bac() {

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getSerie() {
        return serie;
    }

    public void setSerie(String serie) {
        this.serie = serie;
    }

    public String getPays() {
        return pays;
    }

    public void setPays(String pays) {
        this.pays = pays;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Demande getDemande() {
        return demande;
    }

    public void setDemande(Demande demande) {
        this.demande = demande;
    }

    @Override
    public String toString() {
        return "Bac{" +
                "id=" + id +
                ", serie='" + serie + '\'' +
                ", pays='" + pays + '\'' +
                ", date='" + date + '\'' +
                ", demande=" + demande +
                '}';
    }
}
