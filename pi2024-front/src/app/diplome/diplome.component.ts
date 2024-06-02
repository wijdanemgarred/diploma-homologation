import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DemandeService } from '../services/demande.service';
import { DiplomeService } from '../services/diplome.service';
import { Diplome } from '../interfaces/diplome';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-diplome',
  templateUrl: './diplome.component.html',
  styleUrl: './diplome.component.css'
})
export class DiplomeComponent {
  diplome: Diplome = {
    id: 0,
    type: '', // Initialize type with an empty string or null
    etablissment: '',
    domaine: '',
    date: '',
    pays: '',
    diplomemaroc: ''
  };
 
  user!: User ; // User object obtained dynamically


  // Inject ActivatedRoute in your component constructor
  constructor(private demandeService: DemandeService,private userService: UserService, private diplomeService: DiplomeService, private router: Router, private route: ActivatedRoute) {}
 
  ngOnInit(): void { 
    this.route.params.subscribe(params => {
    const userId = +params['userId']; // Convert the string to a number
    this.getUserById(userId); 
  });}

  onSubmit(): void {this.route.params.subscribe(params => {
    const demandeId = +params['demandeId']; 
    const userId = +params['userId']; // Convert the string to a number

    this.diplomeService.createDiplome(demandeId, this.diplome).subscribe({
      next: (response) => {
        console.log('Diplome created successfully', response);
        // Navigate to another route after successfully creating the Diplome
        this.router.navigate([`${userId}/upload`, demandeId]);
      },
      error: (error) => {
        console.error('There was an error creating the Diplome!', error);
      }
    });  });
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
  
  logout(){
    this.router.navigate(['/login']);
  }
  profile(userId: number) {
    { this.route.params.subscribe(params => {
      const userId = +params['userId']; 
    this.router.navigate(['/user-profile', userId]);});
   
  }}
}