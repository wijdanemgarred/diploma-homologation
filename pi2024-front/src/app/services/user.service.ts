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

  updatePassword(oldPassword: String, newPassword: String, id: number): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}/users/updatePassword?oldPassword=${oldPassword}&newPassword=${newPassword}&id=${id}`, null);
  }

 
  loginUser(email: string, password: string): Observable<User> {
    console.log(password); // Print the password
    const url = `${this.baseURL}/login`;
    const queryParams = `?email=${email}&mdp=${password}`;
    return this.httpClient.post<User>(url + queryParams, null);
    
  }

}
