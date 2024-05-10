package ma.ac.uir.pi2024.resource.controller;


import ma.ac.uir.pi2024.resource.entity.Demande;
import ma.ac.uir.pi2024.resource.exception.ResourceNotFoundException;
import ma.ac.uir.pi2024.resource.repository.DemandeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/demande")
public class DemandeController {

    @Autowired
    private DemandeRepository demandeRepository;
    @Autowired
    private JavaMailSender emailSender;// Injecter JavaMailSender pour envoyer des e-mails

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
    @PostMapping("/demandes")
    public Demande createDemande(@RequestBody Demande demande) {
        return demandeRepository.save(demande);
    }

    // get employee by id rest api
    @GetMapping("/demandes/{id}")
    public ResponseEntity<Demande> getDemandeById(@PathVariable int id) {
        Demande demande = demandeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));
        return ResponseEntity.ok(demande);
    }





    // update employee rest api

    @PutMapping("/demandes/{id}")
    public ResponseEntity<Demande> updateDemande(@PathVariable int id, @RequestBody Demande demandeDetails){
        Demande demande = demandeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));

        demande.setStatut(demandeDetails.getStatut());
        demande.setNumDemande(demandeDetails.getNumDemande());
        demande.setUser(demandeDetails.getUser());
        demande.setDiplome(demandeDetails.getDiplome());

        Demande updatedDemande = demandeRepository.save(demande);

        // Envoyer un e-mail lorsque la demande est traitée
        sendEmailNotification(updatedDemande); // Appeler la méthode pour envoyer l'e-mail de notification

        return ResponseEntity.ok(updatedDemande);
    }
    @PutMapping("/demandes/updatestatut/{id}")
    public ResponseEntity<Demande> updateStatut(@PathVariable int id, @RequestParam String statut){
        Demande demande = demandeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Demande not found with id :" + id));

        demande.setStatut(statut);

        Demande updatedDemande = demandeRepository.save(demande);
        return ResponseEntity.ok(updatedDemande);
    }


    // Méthode pour envoyer un e-mail de notification
    private void sendEmailNotification(Demande demande) {
        SimpleMailMessage message = new SimpleMailMessage(); // Créer un objet SimpleMailMessage pour composer l'e-mail
        message.setTo(demande.getUser().getEmail()); // Définir l'adresse e-mail de l'utilisateur comme destinataire
        message.setSubject("Notification de traitement de demande"); // Définir le sujet de l'e-mail
        message.setText("Votre demande a été traitée avec succès. Consultez votre compte pour vérifier le statut."); // Définir le contenu de l'e-mail

        emailSender.send(message); // Envoyer l'e-mail à l'aide de JavaMailSender
    }





    // delete employee rest api
    @DeleteMapping("/demandes/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteDemande(@PathVariable int id){
        Demande demande = demandeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));

        demandeRepository.delete(demande);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }


}
