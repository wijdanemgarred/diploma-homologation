package ma.ac.uir.pi2024.resource.service;

import ma.ac.uir.pi2024.resource.entity.Demande;
import ma.ac.uir.pi2024.resource.repository.DemandeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DemandeService implements DemandeServiceInt{

    private DemandeRepository demandeRepository;

    @Override
    @Transactional
    public void addDemande(Demande demande) {
        demandeRepository.addDemande(demande);
    }

    @Transactional
    public Demande getDemande(int id) {
        return demandeRepository.getDemande(id);
    }

    @Transactional
    public List<Demande> getDemandes(int sortBy) {
        return demandeRepository.getDemandes(sortBy);
    }

    @Override
    @Transactional
    public void deleteDemande(int id) {
        demandeRepository.deleteDemande(id);
    }

    @Override
    @Transactional
    public List<Demande> searchDemande(String searchString) {
        return demandeRepository.searchDemande(searchString);
    }

    @Autowired
    public void setdemandeRepository(DemandeRepository demandeRepository) {
        this.demandeRepository = demandeRepository;
    }
}