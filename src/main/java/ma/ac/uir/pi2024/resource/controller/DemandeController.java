package ma.ac.uir.pi2024.resource.controller;


import ma.ac.uir.pi2024.resource.entity.Demande;
import ma.ac.uir.pi2024.resource.service.DemandeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.StringTrimmerEditor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;



import java.util.List;

@Controller
@RequestMapping("/demande")
public class DemandeController {

    private DemandeService demandeService;

    @InitBinder
    public void initBinder(WebDataBinder webDataBinder) {
        StringTrimmerEditor trimmer = new StringTrimmerEditor(true);
        webDataBinder.registerCustomEditor(String.class, trimmer);
    }

    @GetMapping("/list")
    public String demandeList(@RequestParam(name = "sortBy", required = false) String sortBy , Model model) {
        if (sortBy != null) {
            int sort = Integer.parseInt(sortBy);
            List<Demande> demandes = demandeService.getDemandes(sort);
            model.addAttribute("search", null);
            model.addAttribute("demandes", demandes);
        }
        return "demande-list";
    }

    @Autowired
        public void setDemandeRepository(DemandeService demandeService) {
        this.demandeService = demandeService;
    }
}
