import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Demande } from '../interfaces/demande';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DemandeService {
  private baseURL = "http://localhost:8080/demande/demandes";
  private baseURL1 = "http://localhost:8080/demande";
  private baseURLuser = "http://localhost:8080/user";

  constructor(private httpClient: HttpClient) { }
   
  getDemandesList(): Observable<Demande[]>{
    return this.httpClient.get<Demande[]>(`${this.baseURL}`);
  }
  getDemandesByUserId(userId: number): Observable<Demande[]> {
    return this.httpClient.get<Demande[]>(`${this.baseURL1}/demandesuser/${userId}`);
  }
  createDemande(demande: Demande): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, demande);
  }

  getDemandeById(id: number): Observable<Demande>{
   return this.httpClient.get<Demande>(`${this.baseURL}/${id}`);
 }

  updateDemande(id: number, demande: Demande): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, demande);
  }  

  updateStatut(id: number, statut: String): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}/updatestatut/${id}?statut=${statut}`, null);
  }
  

 
  deleteDemande(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
}
