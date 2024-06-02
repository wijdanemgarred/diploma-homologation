import { Component, OnInit } from '@angular/core';
import { Demande } from '../interfaces/demande';
import { DemandeService } from '../services/demande.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../interfaces/user';


// Angular Material Modules
import { MatCardTitle, MatCardContent, MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-demande-list',
  templateUrl: './demande-list.component.html',
  styleUrls: ['./demande-list.component.css']
})
export class DemandeListComponent implements OnInit {
  demandes: Demande[] = [];
 // User object obtained dynamically
  
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
    this.demandeService.deleteDemande(id).subscribe({
      next: () => {
        console.log('Demande deleted successfully');
        // Handle any additional logic after deletion (e.g., refreshing the list)
      },
      error: (error) => {
        console.error('Error deleting demande:', error);
      }
    });
  }
  
  demandeDetails(id: number) { this.route.params.subscribe(params => {
    const userId = +params['userId']; 
    this.router.navigate([`${userId}/details-demande-user`, id]);});
  }
logout(){
  this.router.navigate(['/login']);
}
dashboard(){
  this.router.navigate(['/Dashboard']);
}
}
