import { Injectable } from '@angular/core';
import { Bac } from '../interfaces/bac';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BacService {
  private apiUrl = 'http://localhost:8080/bac'; // Adjust with your actual API base URL

  constructor(private http: HttpClient) {}

  createBac(demandeid: number, bac: Bac): Observable<Bac> {
    const params = new HttpParams()
      .set('date', bac.date)
      .set('pays', bac.pays)
      .set('serie', bac.serie);
    
    return this.http.post<Bac>(`${this.apiUrl}/create/${demandeid}`, null, { params });
  }

  getBacsByDemandeId(demandeId: number): Observable<Bac[]> {
    return this.http.get<Bac[]>(`${this.apiUrl}/${demandeId}`);
  }

}
