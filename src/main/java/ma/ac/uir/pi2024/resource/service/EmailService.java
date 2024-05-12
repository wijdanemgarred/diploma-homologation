package ma.ac.uir.pi2024.resource.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender emailSender;

    public void sendEmailNotification(String recipientEmail) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(recipientEmail);
        message.setSubject("Notification de traitement de demande");
        message.setText("Votre demande a été traitée avec succès. Consultez votre compte pour vérifier le statut.");
        emailSender.send(message);
    }
}
