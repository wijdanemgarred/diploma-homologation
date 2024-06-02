import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-update-profil',
  templateUrl: './update-profil.component.html',
  styleUrl: './update-profil.component.css'
})
export class UpdateProfilComponent implements OnInit {
  form!: FormGroup;
  user!: User;
  userId!: number;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cin: ['', Validators.required]
    });

    // Retrieve user ID from the route parameters
    const userId = Number(this.route.snapshot.paramMap.get('userId'));
    this.getUserById(userId);
  }

  getUserById(userId: number): void {
    this.userService.getUserById(userId).subscribe(
      (data: User) => {
        this.user = data;
        // Initialize form values with user data
        this.form.patchValue({
          nom: this.user.nom,
          prenom: this.user.prenom,
          email: this.user.email,
          cin: this.user.cin
          
        });
      },
      error => {
        console.error(error);
      }
    );
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formData = this.form.value;
      console.log('Form Data:', formData);
      // Call your updateProfile method from UserService passing the formData
      // You can use this.user.id to get the current user ID
      this.userService.updateProfile(
        this.user.id,
        formData.nom,
        formData.prenom,
        formData.email,
        formData.cin
      ).subscribe(
        () => {
          console.log(formData.nom);
          console.log(this.user.id);
          console.log('Profile updated successfully');
          // Handle success scenario, e.g., show a success message
          this.router.navigate(['/user-profile', this.user.id]);
        },
        error => {
          console.error('Failed to update profile:', error);
          // Handle error scenario, e.g., show an error message
        }
      );
    }
  }

  logout() {
    this.router.navigate(['/login']);
  }
  
  profile(userId: number) {
    { this.route.params.subscribe(params => {
      const userId = +params['userId']; 
    this.router.navigate(['/user-profile', userId]);});
   
  }}
}