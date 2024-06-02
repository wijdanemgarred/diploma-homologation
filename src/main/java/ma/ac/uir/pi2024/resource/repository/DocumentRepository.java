package ma.ac.uir.pi2024.resource.repository;

import ma.ac.uir.pi2024.resource.entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface  DocumentRepository extends JpaRepository<Document, Integer> {
    Document findByFileUUID(String fileUUID);
    List<Document> findByDemandeId(int demandeId);
}
