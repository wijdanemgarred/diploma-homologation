package ma.ac.uir.pi2024.resource.service;

import ma.ac.uir.pi2024.resource.entity.Demande;
import ma.ac.uir.pi2024.resource.repository.DemandeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class DemandeService implements DemandeServiceInt{

    private DemandeRepository demandeRepository;

    @Override
    @Transactional
    public void addDemande(Demande demande) {
        demandeRepository.save(demande);
    }

    @Transactional
    public Optional<Demande> getDemande(int id) {
        return demandeRepository.findById(id);
    }

    @Transactional
    public List<Demande> getDemandes() {
        return demandeRepository.findAll();
    }

    @Override
    @Transactional
    public void deleteDemande(int id) {
        demandeRepository.deleteById(id);
    }

    @Override
    @Transactional
    public List<Demande> searchDemande(String searchString) {
        return demandeRepository.findAll(); //review
    }

    @Autowired
    public void setdemandeRepository(DemandeRepository demandeRepository) {
        this.demandeRepository = demandeRepository;
    }
}