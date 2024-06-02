package ma.ac.uir.pi2024.resource.repository;

import ma.ac.uir.pi2024.resource.entity.Demande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DemandeRepository extends JpaRepository<Demande, Integer>{
    List<Demande> findByUserId(int userId);


    @Query("SELECT COUNT(d) FROM Demande d WHERE d.statut = 'en cours'")
    long countByStatutEnCours();

    @Query("SELECT COUNT(d) FROM Demande d WHERE d.statut = 'en attente'")
    long countByStatutEnAttente();

    @Query("SELECT COUNT(d) FROM Demande d WHERE d.statut = 'accordé'")
    long countByStatutAccorde();

    @Query("SELECT COUNT(d) FROM Demande d WHERE d.statut = 'refusé'")
    long countByStatutRefuse();

}