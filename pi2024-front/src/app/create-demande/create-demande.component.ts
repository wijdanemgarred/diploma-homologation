import { Component } from '@angular/core';
import { Demande } from '../interfaces/demande';
import { ActivatedRoute, Router } from '@angular/router';
import { DemandeService } from '../services/demande.service';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { Bac } from '../interfaces/bac';
import { BacService } from '../services/bac.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-demande',
  templateUrl: './create-demande.component.html',
  styleUrl: './create-demande.component.css'
})
export class CreateDemandeComponent {

  bac: Bac = {
    id: 0, // Default value
    serie: '',
    pays: '',
    date: ''
  };
  user!: User ; // User object obtained dynamically
  demande: Demande = new Demande();
  constructor(private bacService: BacService, private demandeService: DemandeService,private userService: UserService,
    private router: Router,private route: ActivatedRoute,) { }

    ngOnInit(): void { 
      this.route.params.subscribe(params => {
      const userId = +params['userId']; // Convert the string to a number
      
      this.getUserById(userId); 
    });
  
    }


   
    onSubmit()  {
      this.route.params.subscribe(params => {
        const userId = +params['userId']; // Convert the string to a number
        
   
      this.demandeService.createDemande(userId).subscribe(
        (data: any) => {
          this.demande = data as Demande;
          console.log(this.demande.id);
          const demandeId = this.demande.id; // Extract the ID of the saved Demande
          this.bacService.createBac(demandeId, this.bac).subscribe({
            next: (response: Object) => {
              console.log('Bac created successfully', response);
              this.router.navigate([`${userId}/diplome`, demandeId]);

            },
            error: (error) => {
              console.error('There was an error creating the Bac!', error);
            }
          });
        },
        error => {
          console.log(error);
        }
      );
    });
  }

    getUserById(userId: number) {
      this.userService.getUserById(userId).subscribe(
        (data: any) => {
          this.user = data as User; // Type assertion
          
        },
        error => {
          console.log(error);
        }
      );}
    
  saveDemande(userId: number){
   
    return this.demandeService.createDemande(userId);
  }

  
  

  goToDemandeList(){
    this.router.navigate(['/demandes']);
  }


  logout(){
    this.router.navigate(['/login']);
  }
  profile(userId: number) {
    { this.route.params.subscribe(params => {
      const userId = +params['userId']; 
    this.router.navigate(['/user-profile', userId]);});
   
  }}
}
