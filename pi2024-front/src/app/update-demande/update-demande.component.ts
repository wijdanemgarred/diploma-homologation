import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Demande } from '../interfaces/demande';
import { DemandeService } from '../services/demande.service';

@Component({
  selector: 'app-update-demande',
  templateUrl: './update-demande.component.html',
  styleUrls: ['./update-demande.component.css']
})
export class UpdateDemandeComponent implements OnInit {

  id: number;
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
    this.demandeService.updateDemande(this.id, this.demande).subscribe(data => {
      this.goToDemandeList();
    }, error => console.log(error));
  }

  goToDemandeList() {
    this.router.navigate(['/']); //review the redirection
  }
}
