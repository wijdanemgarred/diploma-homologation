import { Component } from '@angular/core';
import { BacService } from '../services/bac.service';
import { ActivatedRoute, Router } from '@angular/router';

import { DemandeService } from '../services/demande.service';
import { UserService } from '../services/user.service';
import { DiplomeService } from '../services/diplome.service';
import { FileService } from '../services/file.service';
import { Diplome } from '../interfaces/diplome';
import { Bac } from '../interfaces/bac';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-details-demande-user',
  templateUrl: './details-demande-user.component.html',
  styleUrl: './details-demande-user.component.css'
})
export class DetailsDemandeUserComponent {
  demandeId!: number;
  userId!: number;
  bacs: Bac[] = [];
  diplomes: Diplome[] = [];
  downloadLinks: string[] = [];
  user!: User ; // User object obtained dynamically
  
  constructor(private bacService: BacService, private demandeService: DemandeService,private userService: UserService,
    private router: Router,private route: ActivatedRoute,private diplomeService : DiplomeService, private fileService: FileService ) { }

    ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.demandeId = +params['id'];
        this.getBacs();
        this.getDiplomes();
        this.getDownloadLinks();
       this.userId = +params['userId'];
      });
    }
  
    getBacs(): void {
      this.bacService.getBacsByDemandeId(this.demandeId).subscribe(
        bacs => this.bacs = bacs,
        error => console.error('Error fetching bacs:', error)
      );
    }
  
    getDiplomes(): void {
      this.diplomeService.getDiplomesByDemandeId(this.demandeId).subscribe(
        diplomes => this.diplomes = diplomes,
        error => console.error('Error fetching diplomes:', error)
      );
    }
  
    getDownloadLinks(): void {
      this.fileService.getDownloadLinksByDemandeId(this.demandeId).subscribe(
        links => this.downloadLinks = links,
        error => console.error('Error fetching download links:', error)
      );
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
   
  }
}}

