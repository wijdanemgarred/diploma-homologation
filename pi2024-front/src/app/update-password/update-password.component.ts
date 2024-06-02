import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../interfaces/user';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  form!: FormGroup;
  user!: User;
  userId!: number;

  constructor(
    private fb: FormBuilder, 
    private userService: UserService, 
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const userId = Number(this.route.snapshot.paramMap.get('userId'));
    this.form = this.fb.group({
      oldPassword: ['', [Validators.required], [this.oldPasswordValidator(userId)]],
      newPassword: ['', Validators.required]
    });
    this.getUserById(userId);
  }

  oldPasswordValidator(userId: number): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.userService.getUserById(userId).pipe(
        map((user: any) => {
          return user.mdp === control.value ? null : { invalidOldPassword: true };
        }),
        catchError(() => of(null))
      );
    };
  }

  onSubmit() {
    if (this.form.valid) {
      const { oldPassword, newPassword } = this.form.value;
      const userId = Number(this.route.snapshot.paramMap.get('userId'));
      this.userService.updatePassword(oldPassword, newPassword, userId)
        .subscribe(
          response => {
            console.log('Password updated successfully:', response);
            this.openSuccessDialog();
          },
          error => {
            console.error('Failed to update password:', error);
          }
        );
    }
  }

  openSuccessDialog(): void {
    const dialogRef = this.dialog.open(SuccessDialogComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

  getUserById(userId: number) {
    this.userService.getUserById(userId).subscribe(
      (data: any) => {
        this.user = data as User;
        console.log(this.user);
      },
      error => {
        console.log(error);
      }
    );
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
