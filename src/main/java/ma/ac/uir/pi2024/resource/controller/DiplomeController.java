package ma.ac.uir.pi2024.resource.controller;

import ma.ac.uir.pi2024.resource.entity.Bac;
import ma.ac.uir.pi2024.resource.entity.Demande;
import ma.ac.uir.pi2024.resource.entity.Diplome;
import ma.ac.uir.pi2024.resource.exception.ResourceNotFoundException;
import ma.ac.uir.pi2024.resource.repository.DiplomeRepository;
import ma.ac.uir.pi2024.resource.repository.DemandeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/diplome")
public class DiplomeController {
    @Autowired
    private DiplomeRepository diplomeRepository;
    @Autowired
    private DemandeRepository demandeRepository;

    // create employee rest api
    @PostMapping("/create/{demandeid}")
    public Diplome creatediplome(@PathVariable int demandeid,
                                 @RequestParam String date,
                                 @RequestParam String pays,
                                 @RequestParam String diplomemaroc,
                                 @RequestParam String domaine,
                                 @RequestParam String etablissment,
                                 @RequestParam String type) {
        Demande demande = demandeRepository.findById(demandeid)
                .orElseThrow(() -> new ResourceNotFoundException("Demande not found with id: " + demandeid));

        Diplome diplome = new Diplome();
        diplome.setDate(date);
        diplome.setPays(pays);
        diplome.setDiplomemaroc(diplomemaroc);
        diplome.setDomaine(domaine);
        diplome.setEtablissment(etablissment);
        diplome.setType(type);

        diplome.setDemande(demande);

        return diplomeRepository.save(diplome);
    }

    @GetMapping("/{demandeId}")
    public List<Diplome> getDiplomeByDemandeId(@PathVariable int demandeId) {
        return diplomeRepository.findByDemandeId(demandeId);
    }

    // get all employees
    @GetMapping("/all/diplomes")
    public List<Diplome> getAllDiplomes() {
        return diplomeRepository.findAll();
    }

}
