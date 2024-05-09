package ma.ac.uir.pi2024.resource.controller;


import ma.ac.uir.pi2024.resource.entity.Demande;
import ma.ac.uir.pi2024.resource.entity.User;
import ma.ac.uir.pi2024.resource.exception.ResourceNotFoundException;
import ma.ac.uir.pi2024.resource.repository.UserRepository;
import ma.ac.uir.pi2024.resource.service.DemandeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.StringTrimmerEditor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
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

    // create employee rest api
    @PostMapping("/newuser")
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable int id, @RequestBody User userDetails) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        // Update the user details with the provided information
        user.setNom(userDetails.getNom());
        user.setPrenom(userDetails.getPrenom());
        user.setEmail(userDetails.getEmail());
        user.setMdp(userDetails.getMdp());
        user.setCin(userDetails.getCin());
        user.setRole(userDetails.getRole());
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

}
