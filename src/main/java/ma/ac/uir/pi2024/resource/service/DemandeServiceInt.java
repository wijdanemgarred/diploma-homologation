package ma.ac.uir.pi2024.resource.service;

import ma.ac.uir.pi2024.resource.entity.Demande;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface DemandeServiceInt {


    @Transactional
    void addDemande(Demande demande);

    @Transactional
    void deleteDemande(int id);

    @Transactional
    List<Demande> searchDemande(String searchString);
}
