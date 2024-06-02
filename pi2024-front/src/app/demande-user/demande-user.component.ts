import { Component, OnInit } from '@angular/core';
import { Demande } from '../interfaces/demande';
import { DemandeService } from '../services/demande.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { DiplomeService } from '../services/diplome.service';
import { Diplome } from '../interfaces/diplome';

@Component({
  selector: 'app-demande-user',
  templateUrl: './demande-user.component.html',
  styleUrl: './demande-user.component.css'
})
export class DemandeUserComponent implements OnInit {
  demandes: Demande[] = [];
  user!: User ; // User object obtained dynamically
  diplomes: Diplome[] = [];
  userId!: number;
  
  
  constructor(private demandeService: DemandeService,private userService: UserService,
    private router: Router,private route: ActivatedRoute,private diplomeService: DiplomeService) { }


ngOnInit(): void {
  this.route.params.subscribe(params => {
    const userId = Number(this.route.snapshot.paramMap.get('userId'));
    this.getDemandesByUserId(userId);
    
   this.getalldiplomes();
   // Retrieve user ID from the route parameters
   
   this.getUserById(userId);
  });
}
  getalldiplomes() {
    this.diplomeService.getAllDiplomes().subscribe(data => {
      this.diplomes = data;
     
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
  );
}
  private getDemandesByUserId(userId: number) {
    this.demandeService.getDemandesByUserId(userId).subscribe(data => {
      this.demandes = data;
      for (let demande of this.demandes) {
        // Assuming demande has an 'id' property, adjust accordingly if different
        const demandeid = demande.id;
        this.diplomeService.getDiplomesByDemandeId(demandeid).subscribe(data => {
          this.diplomes = data;
          for (let diplome of this.diplomes){
            const diplometype =diplome.type;
            demande.diplome = diplometype;
          }
          

         
        });
    }
     
    });
  }

  profile(userId: number) {
    { this.route.params.subscribe(params => {
      const userId = +params['userId']; 
    this.router.navigate(['/user-profile', userId]);});
   
  }}
  updateDemande(id: number) {
    this.router.navigate(['update-demande', id]);
  }

  demandeDetails(id: number) { this.route.params.subscribe(params => {
    const userId = +params['userId']; 
    this.router.navigate([`${userId}/details-demande-user`, id]);});
  }

  deleteDemande(id: number) {
    this.demandeService.deleteDemande(id).subscribe(data => {
      console.log(data);
      // After deleting the demande, navigate to the 'demandes' page
      // Assuming you want to navigate back to the 'demandes' page for the same user
     // const userId = this.user.id; // Assuming 'user' is a property of the component containing the user information
      //this.router.navigate(['/demandes', userId]);
    });
  }/*
  deleteDemande(id: number) {
    this.demandeService.deleteDemande(id).subscribe(data => {
      console.log(data);
      // After deleting the demande, navigate to the 'demandes' page
      // Assuming you want to navigate back to the 'demandes' page for the same user
      const userId = this.user.id;
      this.router.navigate(['/demandes', userId]);
    });
  }
  */

 
logout(){
  this.router.navigate(['/login']);
}
}
