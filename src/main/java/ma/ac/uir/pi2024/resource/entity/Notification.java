package ma.ac.uir.pi2024.resource.entity;


import jakarta.persistence.*;


@Entity
@Table(name = "notification")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private int id;

    @Column(name = "label")
    private String label;


    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User user;


    public Notification(int id, String label, User user) {
        this.id = id;
        this.label = label;
        this.user = user;
    }

    public Notification() {

    }

    public int getId() {
        return id;
    }

    public String label() {
        return label;
    }

    public User getUser() {
        return user;
    }
}

