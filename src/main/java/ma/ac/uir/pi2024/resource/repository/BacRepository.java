package ma.ac.uir.pi2024.resource.repository;

import ma.ac.uir.pi2024.resource.entity.Bac;
import ma.ac.uir.pi2024.resource.entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BacRepository extends JpaRepository<Bac, Integer> {
    List<Bac> findByDemandeId(int demandeId);
}
