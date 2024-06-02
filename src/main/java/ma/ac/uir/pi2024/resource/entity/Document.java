package ma.ac.uir.pi2024.resource.entity;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "document")
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private int id;


    @Column(name = "name")
    private String name;

    @Column(name = "type")
    private String type;

    // This column will store the unique identifier (UUID) of the file.
    @Column(name = "file_uuid")
    private String fileUUID;

    @Column(name = "label")
    private String label;



    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "demande_id")
    private Demande demande;

    public Document(int id, String type, Demande demande, String fileUUID, String label) {
        this.id = id;
        this.type = type;
        this.demande = demande;
        this.fileUUID = fileUUID;
        this.label = label;
    }

    public Document() {

    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getFileUUID() {
        return fileUUID;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setFileUUID(String fileUUID) {
        this.fileUUID = fileUUID;
    }

    public void setDemande(Demande demande) {
        this.demande = demande;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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
