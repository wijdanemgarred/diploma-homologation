package ma.ac.uir.pi2024.resource.repository;

import ma.ac.uir.pi2024.resource.entity.Demande;

import java.util.List;

public interface DemandeRepositoryInterface {
    void addDemande(Demande demande);


    public List<Demande> getDemandes(int sortBy) ;
    Demande getDemande(int id);

    void deleteDemande(int id);

    List<Demande> searchDemande(String searchString);
}
