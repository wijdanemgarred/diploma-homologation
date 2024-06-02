import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { User } from '../interfaces/user';
import { Observable, catchError, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  changePassword(oldPassword: any, newPassword: any) {
    throw new Error('Method not implemented.');
  }
  private baseURL = "http://localhost:8080/user";

  constructor(private httpClient: HttpClient) { }
   
  getDemandesList(): Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.baseURL}`);
  }

  getUserByEmail(email: String): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseURL}/users?email=${email}`);
  }

  getUserById(userId: number): Observable<User> {
    return this.httpClient.get<User>(`${this.baseURL}/users/${userId}`);
  } 


  updatePassword(oldPassword: string, newPassword: string, id: number): Observable<Object> {
    return this.httpClient.put(
      `${this.baseURL}/users/updatePassword?oldPassword=${oldPassword}&newPassword=${newPassword}&id=${id}`, 
      null, 
      { responseType: 'text' }
    );
  }
  
  loginUser(email: string, password: string): Observable<User> {
    console.log(password); // Print the password
    const url = `${this.baseURL}/login`;
    const queryParams = `?email=${email}&mdp=${password}`;
    return this.httpClient.post<User>(url + queryParams, null);
    
  }

  getUsersCount(): Observable<number> {
    return this.httpClient.get<number>(`${this.baseURL}/count`);
  }

  createUser(nom: string, prenom: string, email: string, mdp: string, cin: string): Observable<any> {
    const url = `${this.baseURL}/create?nom=${nom}&prenom=${prenom}&email=${email}&mdp=${mdp}&cin=${cin}`;
    return this.httpClient.post<any>(url, null); // Send a POST request with an empty body
  } 
  

  updateProfile(id: number, nom: string, prenom: string, email: string, cin: string): Observable<any> {
    const url = `${this.baseURL}/${id}?nom=${nom}&prenom=${prenom}&email=${email}&cin=${cin}`;
    return this.httpClient.put<any>(url, {});
  }
  
}
