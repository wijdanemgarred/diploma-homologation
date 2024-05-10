import { Component, OnInit } from '@angular/core';
import { DemandeService } from '../services/demande.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Demande } from '../interfaces/demande';

@Component({
  selector: 'app-update-statut',
  templateUrl: './update-statut.component.html',
  styleUrls: ['./update-statut.component.css'] // Fix typo here
})
export class UpdateStatutComponent implements OnInit {
  id: number;
  statut!: string;
  
  demande: Demande = new Demande();

  constructor(private demandeService: DemandeService,
              private route: ActivatedRoute,
              private router: Router) {
    this.id = 1;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.demandeService.getDemandeById(this.id).subscribe(data => {
      this.demande = data;
    }, error => console.log(error));
  }

  onSubmit() {
    this.demandeService.updateStatut(this.id, this.statut).subscribe(data => {
      this.goToDemandeList();
      console.log(this.statut);
    }, error => console.log(error));
  }

  goToDemandeList() {
    this.router.navigate(['/Alldemandes']);
  }
  
logout(){
  this.router.navigate(['/login']);
}
}
