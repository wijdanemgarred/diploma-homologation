import { Component } from '@angular/core';
import { FileService } from '../services/file.service';
import { User } from '../interfaces/user';
import { DemandeService } from '../services/demande.service';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {

  selectedFiles: File[] = [];
  downloadLinks: string[] = [];


  user!: User ; // User object obtained dynamically

  constructor(private demandeService: DemandeService,private userService: UserService,private router: Router, private route: ActivatedRoute,private fileService: FileService) { }

  onFileSelected(event: any, index: number): void {
    this.selectedFiles[index] = event.target.files[0];
  }

  onUpload(): void {this.route.params.subscribe(params => {
    const demandeId = +params['demandeId']; 
    const userId = +params['userId'];
    if (this.selectedFiles.length === 3) {
      this.fileService.upload(demandeId, this.selectedFiles).subscribe(
        (downloadLinks: string[]) => {
          this.downloadLinks = downloadLinks;
        },
        (error: any) => {
          console.error('Upload error:', error);
        }
      );
    } else {
      alert('Please select all three files.');
    }
  });
  }

  onDownload(link: string): void {
    window.open(link, '_blank');
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
  profile() {
    const userId = Number(this.route.snapshot.paramMap.get('userId'));
    this.router.navigate(['/user-profile', userId]);
   
  }

  demandes() {
    // const demandeId = Number(this.route.snapshot.paramMap.get('demandeId'));
  
    const userId = Number(this.route.snapshot.paramMap.get('userId'));
    this.router.navigate(['/demandes', userId]);
   
  }
  

}
