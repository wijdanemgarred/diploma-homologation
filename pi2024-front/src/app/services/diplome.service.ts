import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Diplome } from '../interfaces/diplome';

@Injectable({
  providedIn: 'root'
})
export class DiplomeService {
  private apiUrl = 'http://localhost:8080/diplome/create';
  private baseUrl = 'http://localhost:8080/diplome';

  constructor(private http: HttpClient) { }  
  createDiplome(demandeId: number, diplome: Diplome): Observable<Diplome> {
    const params = new HttpParams()
      .set('date', diplome.date)
      .set('pays', diplome.pays)
      .set('diplomemaroc', diplome.diplomemaroc)
      .set('domaine', diplome.domaine)
      .set('etablissment', diplome.etablissment)
      .set('type', diplome.type);
    
    return this.http.post<Diplome>(`${this.apiUrl}/${demandeId}`, null, { params });
  }

  getDiplomesByDemandeId(demandeId: number): Observable<Diplome[]> {
    return this.http.get<Diplome[]>(`http://localhost:8080/diplome/${demandeId}`);
  }

  getAllDiplomes(): Observable<Diplome[]> {
    return this.http.get<Diplome[]>(`${this.baseUrl}/all/diplomes`);
  }
}
