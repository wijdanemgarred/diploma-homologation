package ma.ac.uir.pi2024.resource.repository;

import ma.ac.uir.pi2024.resource.entity.Bac;
import ma.ac.uir.pi2024.resource.entity.Diplome;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DiplomeRepository extends JpaRepository<Diplome, Integer> {
    List<Diplome> findByDemandeId(int demandeId);
}
