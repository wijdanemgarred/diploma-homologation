package ma.ac.uir.pi2024.resource.controller;


import ma.ac.uir.pi2024.resource.entity.Bac;
import ma.ac.uir.pi2024.resource.entity.Demande;
import ma.ac.uir.pi2024.resource.entity.User;
import ma.ac.uir.pi2024.resource.exception.ResourceNotFoundException;
import ma.ac.uir.pi2024.resource.repository.BacRepository;
import ma.ac.uir.pi2024.resource.repository.DemandeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bac")
public class BacController {
    @Autowired
    private BacRepository bacRepository;
    @Autowired
    private DemandeRepository demandeRepository;


    // create employee rest api
    @PostMapping("/create/{demandeid}")
    public Bac createbac(@PathVariable int demandeid,
                         @RequestParam String date,
                         @RequestParam String pays,
                         @RequestParam String serie) {
        Demande demande = demandeRepository.findById(demandeid)
                .orElseThrow(() -> new ResourceNotFoundException("Demande not found with id: " + demandeid));

        Bac bac = new Bac();
        bac.setDate(date);
        bac.setPays(pays);
        bac.setSerie(serie);
        bac.setDemande(demande);

        return bacRepository.save(bac);
    }
    @GetMapping("/{demandeId}")
    public List<Bac> getBacsByDemandeId(@PathVariable int demandeId) {
        return bacRepository.findByDemandeId(demandeId);
    }
}
