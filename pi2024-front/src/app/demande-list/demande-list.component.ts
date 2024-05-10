import { Component, OnInit } from '@angular/core';
import { Demande } from '../interfaces/demande';
import { DemandeService } from '../services/demande.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-demande-list',
  templateUrl: './demande-list.component.html',
  styleUrls: ['./demande-list.component.css']
})
export class DemandeListComponent implements OnInit {
  demandes: Demande[] = [];
  user: User = {
    id: 0,
    cin: '',
    email: '',
    mdp: '',
    nom: '',
    prenom: '',
    role: ''
  }; // User object obtained dynamically
  
  constructor(private demandeService: DemandeService,
    private router: Router,private route: ActivatedRoute,) { }


ngOnInit(): void {
  this.getDemandes();
}

private getDemandes(){
  this.demandeService.getDemandesList().subscribe(data => {
    this.demandes = data;
  });
}
  updateDemande(id: number) {
    this.router.navigate(['update-statut', id]);
  }

  deleteDemande(id: number) {
    this.demandeService.deleteDemande(id).subscribe(data => {
      console.log(data);
    });
    this.router.navigate(['/Alldemandes']);
  }
  
logout(){
  this.router.navigate(['/login']);
}
}
