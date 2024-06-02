package ma.ac.uir.pi2024.resource.controller;


import ma.ac.uir.pi2024.resource.entity.Demande;
import ma.ac.uir.pi2024.resource.entity.User;
import ma.ac.uir.pi2024.resource.exception.ResourceNotFoundException;
import ma.ac.uir.pi2024.resource.repository.DemandeRepository;
import ma.ac.uir.pi2024.resource.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ma.ac.uir.pi2024.resource.repository.UserRepository;

import java.util.*;


@RestController
@RequestMapping("/demande")
public class DemandeController {

    @Autowired
    private DemandeRepository demandeRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EmailService emailService;

    // get all employees
    @GetMapping("/demandes")
    public List<Demande> getAllDemande(){
        return demandeRepository.findAll();
    }
//demanded by usr id
    @GetMapping("/demandesuser/{userId}")
    public List<Demande> getDemandeByUserId(@PathVariable("userId") int userId){
        return demandeRepository.findByUserId(userId);
    }

    // create employee rest api
    @PutMapping("/create/{userid}")
    public Demande createDemande(@PathVariable int userid) {
        Demande demande = new Demande();
        User user = userRepository.findById(userid).orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userid));;
        demande.setStatut("en cours");
        demande.setNumDemande(generateRandomString(7));
        demande.setUser(user);
        return demandeRepository.save(demande);
    }

    // get employee by id rest api
    @GetMapping("/create/{id}")
    public ResponseEntity<Demande> getDemandeById(@PathVariable int id) {
        Demande demande = demandeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));
        return ResponseEntity.ok(demande);
    }



    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    private static final Random RANDOM = new Random();

    public static String generateRandomString(int length) {
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            int index = RANDOM.nextInt(CHARACTERS.length());
            sb.append(CHARACTERS.charAt(index));
        }
        return sb.toString();
    }

    // update employee rest api

    @PutMapping("/demandes/{id}")
    public ResponseEntity<Demande> updateDemande(@PathVariable int id, @RequestBody Demande demandeDetails){
        Demande demande = demandeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));

        demande.setStatut(demandeDetails.getStatut());
        demande.setNumDemande(demandeDetails.getNumDemande());
        demande.setUser(demandeDetails.getUser());

        Demande updatedDemande = demandeRepository.save(demande);


        return ResponseEntity.ok(updatedDemande);
    }
    @PutMapping("/demandes/updatestatut/{id}")
    public ResponseEntity<Demande> updateStatut(@PathVariable int id, @RequestParam String statut){
        Demande demande = demandeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Demande not found with id :" + id));

        demande.setStatut(statut);
        User u = userRepository.findByDemandesId(id);
        String To = u.getEmail();
        String Subject = "Changement d'état de votre demande";
        String Text = "Bonjour,\n" +
                "\n" +
                "Nous tenons à vous informer qu'il y a eu un changement d'état pour votre demande sur notre plateforme. Votre demande a été mise à jour avec succès.\n" +
                "\n" +
                "Merci de vous connecter à la plateforme pour consulter les détails et suivre l'évolution de votre demande.\n" +
                "\n" +
                "Cordialement,\n" +
                "L'équipe de support ";

        Demande updatedDemande = demandeRepository.save(demande);
        emailService.sendSimpleMessage(To,Subject, Text);
        return ResponseEntity.ok(updatedDemande);
    }








    @DeleteMapping("/demandes/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteDemande(@PathVariable int id) {
        Demande demande = demandeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Demande not found with id: " + id));

        demandeRepository.delete(demande);

        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/count")
    public long countDemandes() {
        return demandeRepository.count();
    }

    @GetMapping("/countbystatus")
    public long countDemandesByStatut(@RequestParam String statut) {
        switch (statut) {
            case "en cours":
                return demandeRepository.countByStatutEnCours();
            case "en attente":
                return demandeRepository.countByStatutEnAttente();
            case "accordé":
                return demandeRepository.countByStatutAccorde();
            case "refusé":
                return demandeRepository.countByStatutRefuse();
            default:
                return 0;
        }
    }
}
