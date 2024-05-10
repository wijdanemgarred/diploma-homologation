// login.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
  login() {
    if (this.loginForm.invalid) {
      // Form validation failed
      this.errorMessage = 'Email and password are required.';
      return;
    }
  
    const email: string = this.loginForm.value.email;
    const password: string = this.loginForm.value.password;
  
    this.authService.loginUser(email, password).subscribe(
      (user: any) => {
        // Handle successful login
        console.log('Login successful', user);
        // Extract user ID and role from the response
        const userId = user.id;
        const userRole = user.role;
        console.log( user.role);
        // Navigate based on user role
        if (userRole === 'etudiant') {
          // Redirect to 'demandes' page for students
          this.router.navigate(['/demandes', userId]);
        } else if (userRole === 'admin') {
          // Redirect to 'Alldemandes' page for admins
          this.router.navigate(['/Alldemandes']);
        } else {
          // Handle other roles if needed
        }
      },
      error => {
        // Handle login error
        this.errorMessage = 'Invalid email or password.';
      }
    );
  }    
}
/*
    this.authService.loginUser(email, password).subscribe(
      (user: any) => {
        // Save user ID in session storage upon successful login
        sessionStorage.setItem('userId', user.id.toString());
        // Redirect to the demand list page
        this.router.navigate(['/demandes', user.id]);
      },
      error => {*/

