import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { DemandeService } from '../services/demande.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  usersCount: number = 0;
  demandesCount: number = 0;
  enCoursCount: number = 0;
  enAttenteCount: number = 0;
  accordeCount: number = 0;
  refuseCount: number = 0;

  constructor(private userService: UserService, private demandeService: DemandeService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadCounts();
  }

  loadCounts(): void {
    this.userService.getUsersCount().subscribe(count => this.usersCount = count);
    this.demandeService.getDemandesCount().subscribe(count => this.demandesCount = count);
    this.demandeService.getDemandesCountByStatus('en cours').subscribe(count => this.enCoursCount = count);
    this.demandeService.getDemandesCountByStatus('en attente').subscribe(count => this.enAttenteCount = count);
    this.demandeService.getDemandesCountByStatus('accordé').subscribe(count => this.accordeCount = count);
    this.demandeService.getDemandesCountByStatus('refusé').subscribe(count => this.refuseCount = count);
  }
  logout(){
    this.router.navigate(['/login']);
  }

  Alldemands(){
     this.router.navigate(['/Alldemandes']);
  }
}