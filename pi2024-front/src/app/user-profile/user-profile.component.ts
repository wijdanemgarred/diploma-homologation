import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  user!: User ; // User object obtained dynamically

  constructor(private userService: UserService,
    private router: Router,private route: ActivatedRoute,) { }

  
ngOnInit(): void {
  const userId = Number(this.route.snapshot.paramMap.get('userId'));
 
    // Call method to fetch user by userId
    this.getUserById(userId);
}


getUserById(userId: number) {
  this.userService.getUserById(userId).subscribe(
    (data: any) => {
      this.user = data as User; // Type assertion
      console.log(this.user);
    },
    error => {
      console.log(error);
    }
  );
}

logout(){
  this.router.navigate(['/login']);
}
changermdp(userId : number){
  this.router.navigate(['/changermdp', userId]);
}
}