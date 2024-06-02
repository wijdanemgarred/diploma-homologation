package ma.ac.uir.pi2024.resource.controller;

import ma.ac.uir.pi2024.resource.entity.Demande;
import ma.ac.uir.pi2024.resource.entity.Document;
import ma.ac.uir.pi2024.resource.exception.ResourceNotFoundException;
import ma.ac.uir.pi2024.resource.repository.DemandeRepository;
import ma.ac.uir.pi2024.resource.repository.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/file")
public class FileResource {

    // Define the directory where uploaded files will be stored
    public static final String UPLOAD_DIR = "C:\\Users\\NBH\\Downloads\\pi";
    @Autowired
    private DemandeRepository demandeRepository;

    @Autowired
    private DocumentRepository documentRepository;
    // Define a method to upload files
    @PostMapping("/upload/{demandeId}")
    public ResponseEntity<List<String>> uploadFiles(
            @PathVariable int demandeId,
            @RequestParam("identite") MultipartFile identite,
            @RequestParam("baccalaureat") MultipartFile baccalaureat,
            @RequestParam("diplome") MultipartFile diplome) {
        try {
            Demande demande = demandeRepository.findById(demandeId)
                    .orElseThrow(() -> new ResourceNotFoundException("Demande not found with id: " + demandeId));

            List<String> downloadLinks = new ArrayList<>();
            MultipartFile[] files = {identite, baccalaureat, diplome};
            String[] labels = {"identite", "baccalaureat", "diplome"};
            for (int i = 0; i < files.length; i++) {
                MultipartFile file = files[i];
                String label = labels[i];

                String fileUUID = UUID.randomUUID().toString();
                Path filePath = Paths.get(UPLOAD_DIR, fileUUID + "_" + StringUtils.cleanPath(file.getOriginalFilename()));
                Files.copy(file.getInputStream(), filePath);

                Document document = new Document();
                document.setType(file.getContentType());
                document.setFileUUID(fileUUID);
                document.setName(file.getOriginalFilename());
                document.setLabel(label);
                document.setDemande(demande);
                documentRepository.save(document);

                String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                        .path("/file/download/")
                        .path(fileUUID)
                        .toUriString();

                downloadLinks.add(fileDownloadUri);
            }
            return ResponseEntity.ok().body(downloadLinks);
        } catch (IOException ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Define a method to download files
    @GetMapping("/download/{fileUUID}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileUUID) {
        Document document = documentRepository.findByFileUUID(fileUUID);
        if (document == null) {
            return ResponseEntity.notFound().build();
        }

        Path filePath = Paths.get(UPLOAD_DIR, fileUUID + "_" + document.getName());
        Resource resource;
        try {
            resource = new UrlResource(filePath.toUri());
        } catch (MalformedURLException e) {
            return ResponseEntity.notFound().build();
        }

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"");

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(document.getType()))
                .headers(headers)
                .body(resource);
    }

    // New endpoint to get download links for all files associated with a demandeId
    @GetMapping("/downloadLinks/{demandeId}")
    public ResponseEntity<List<String>> getDownloadLinksByDemandeId(@PathVariable int demandeId) {
        List<Document> documents = documentRepository.findByDemandeId(demandeId);
        List<String> downloadLinks = new ArrayList<>();

        for (Document document : documents) {
            String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/file/download/")
                    .path(document.getFileUUID())
                    .toUriString();
            downloadLinks.add(fileDownloadUri);
        }

        return ResponseEntity.ok().body(downloadLinks);
    }
}
