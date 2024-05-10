import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.css'
})
export class UpdatePasswordComponent implements OnInit {
  form!: FormGroup; // Declare FormGroup variable
  confirmPassword: any;
  newPassword: any;
  updatepassword : any;
  oldPassword: any;

  constructor(private fb: FormBuilder , private userService: UserService) { } // Inject FormBuilder

  ngOnInit(): void {
    // Initialize form and define form controls with validation rules
    this.form = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },{ validator: this.passwordsShouldMatchValidator }); // Add custom validator for password matching
  }
  passwordsShouldMatchValidator(formGroup: FormGroup) {
    const newPassword = formGroup.get('newPassword')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (newPassword !== confirmPassword) {
      return { passwordsShouldMatch: true };
    } else {
      return null;
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const { oldPassword, newPassword } = this.form.value;
      const userId = 1; // Assuming you have the user ID, you can retrieve it from your application's authentication system
      this.userService.updatePassword(oldPassword, newPassword, userId)
        .subscribe(
          response => {
            console.log('Password updated successfully:', response);
            // Handle success scenario
          },
          error => {
            console.error('Failed to update password:', error);
            // Handle error scenario
          }
        );
    }
  }
  

}
