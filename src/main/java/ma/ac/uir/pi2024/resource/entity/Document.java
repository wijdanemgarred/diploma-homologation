package ma.ac.uir.pi2024.resource.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "document")
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private int id;


    @Column(name = "type")
    private String type;


    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "demande_id")
    private Demande demande;

    public Document(int id, String type, Demande demande) {
        this.id = id;
        this.type = type;
        this.demande = demande;
    }

    public Document() {

    }

    public int getId() {
        return id;
    }

    public String getType() {
        return type;
    }

    public Demande getDemande() {
        return demande;
    }
}
