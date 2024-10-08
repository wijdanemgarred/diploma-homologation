package ma.ac.uir.pi2024.resource.controller;


import ma.ac.uir.pi2024.resource.entity.Demande;
import ma.ac.uir.pi2024.resource.entity.User;
import ma.ac.uir.pi2024.resource.exception.ResourceNotFoundException;
import ma.ac.uir.pi2024.resource.repository.DemandeRepository;
import ma.ac.uir.pi2024.resource.repository.UserRepository;
import ma.ac.uir.pi2024.resource.service.DemandeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.StringTrimmerEditor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;


import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;
    private DemandeRepository demandeRepository;

    // create employee rest api
    @PostMapping("/newuser")
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    @PostMapping("/create")
    public ResponseEntity<User> createUser(
            @RequestParam("nom") String nom,
            @RequestParam("prenom") String prenom,
            @RequestParam("email") String email,
            @RequestParam("mdp") String mdp,
            @RequestParam("cin") String cin
    ) {
        // Create a new User object with the provided parameters
        User newUser = new User();
        newUser.setNom(nom);
        newUser.setPrenom(prenom);
        newUser.setEmail(email);
        newUser.setMdp(mdp);
        newUser.setCin(cin);
        newUser.setRole("etudiant"); // Set the role to "etudiant"

        // Save the new user to the database
        User savedUser = userRepository.save(newUser);

        // Return the saved user in the response body
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(
            @PathVariable int id,
            @RequestParam(value = "nom", required = false) String nom,
            @RequestParam(value = "prenom", required = false) String prenom,
            @RequestParam(value = "email", required = false) String email,
            @RequestParam(value = "cin", required = false) String cin) {

        // Retrieve the user from the repository
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        // Update the user properties if the corresponding parameters are not null
        if (nom != null) {
            user.setNom(nom);
        }
        if (prenom != null) {
            user.setPrenom(prenom);
        }
        if (email != null) {
            user.setEmail(email);
        }
        if (cin != null) {
            user.setCin(cin);
        }
        // Update other user properties as needed

        // Save the updated user to the database
        User updatedUser = userRepository.save(user);

        return ResponseEntity.ok(updatedUser);
    }


    @GetMapping("/{id}/demandes")
    public ResponseEntity<List<Demande>> getUserDemands(@PathVariable int id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        List<Demande> demands = user.getDemandes(); // Assuming you have a getter for demandes in your User class

        return ResponseEntity.ok(demands);
    }


    @GetMapping("/users")
    public ResponseEntity<User> getUserByEmail(@RequestParam String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

        return ResponseEntity.ok(user);
    }
    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable int id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        return ResponseEntity.ok(user);
    }


    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestParam("email") String email, @RequestParam("mdp") String mdp) {
        // Retrieve user by email
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            // Check if the password matches
            if (user.getMdp().equals(mdp)) {
                return ResponseEntity.ok(user);
            }
        }
        // If user not found or password doesn't match, return unauthorized
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
    }

    @DeleteMapping("/{userId}/{demandeId}")
    public ResponseEntity<String> deleteDemande(@PathVariable int userId, @PathVariable int demandeId) {
        try {
            demandeRepository.findById(demandeId);
            demandeRepository.deleteById(demandeId);
            return new ResponseEntity<>("Demande deleted successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Transactional
    @PutMapping("/users/updatePassword")
    public ResponseEntity<Map<String, String>> updatePassword(
            @RequestParam String oldPassword,
            @RequestParam String newPassword,
            @RequestParam int id) {

        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (user.getMdp().equals(oldPassword)) {
                userRepository.updatePassword(newPassword, id);
                Map<String, String> response = new HashMap<>();
                response.put("message", "Password updated successfully");
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                Map<String, String> response = new HashMap<>();
                response.put("message", "Incorrect old password");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
        } else {
            Map<String, String> response = new HashMap<>();
            response.put("message", "User not found");
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }




    @GetMapping("/count")
    public long countUsers() {
        return userRepository.count();
    }
}
