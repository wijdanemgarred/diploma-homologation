import { Component } from '@angular/core';
import { Demande } from '../interfaces/demande';
import { Router } from '@angular/router';
import { DemandeService } from '../services/demande.service';

@Component({
  selector: 'app-create-demande',
  templateUrl: './create-demande.component.html',
  styleUrl: './create-demande.component.css'
})
export class CreateDemandeComponent {

  demande: Demande = new Demande();
  constructor(private demandeService: DemandeService,
    private router: Router) { }

    ngOnInit(): void {
    }

    
  saveDemande(){
    this.demandeService.createDemande(this.demande).subscribe( data =>{
      console.log(data);
      this.goToDemandeList();
    },
    error => console.log(error));
  }

  
  

  goToDemandeList(){
    this.router.navigate(['/demandes']);
  }
  
  onSubmit(){
    console.log(this.demande);
    this.saveDemande();
  }

}
