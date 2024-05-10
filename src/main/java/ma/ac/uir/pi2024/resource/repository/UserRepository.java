package ma.ac.uir.pi2024.resource.repository;

import ma.ac.uir.pi2024.resource.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);


    @Modifying
    @Query("update User u set u.mdp = :mdp where u.id = :id")
    void updatePassword(String mdp, int id);
}
