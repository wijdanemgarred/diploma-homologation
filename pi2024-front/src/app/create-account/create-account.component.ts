import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent  { 
  createUserForm: FormGroup;
  

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router, public dialog: MatDialog) {
    this.createUserForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mdp: ['', [Validators.required]],
      cin: ['', Validators.required],
      confirmmdp: ['', Validators.required], // New field for confirm password
    }, { validator: this.passwordMatchValidator });
  }
  passwordMatchValidator( control: AbstractControl) {
    return control.get('mdp')?.value === control.get('confirmmdp')?.value
    ? null
    : { mismatch : true};
   
  }
  createUser() {
    if (this.createUserForm.valid) {
      const { nom, prenom, email, mdp, cin } = this.createUserForm.value;
      this.userService.createUser(nom, prenom, email, mdp, cin).subscribe(
        response => {
          console.log('User created successfully!', response);
          this.openSuccessDialog();
          // You can add further actions here, such as redirecting to another page
        },
        error => {
          console.error('Error creating user:', error);
          // Handle error appropriately, e.g., display error message to the user
        }
      );
    }
  }
  openSuccessDialog(): void {
    const dialogRef = this.dialog.open(SuccessDialogComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/login']);
    });
  }

}