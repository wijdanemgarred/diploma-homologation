import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class FileService {
  private baseUrl = 'http://localhost:8080/file';


  constructor(private http: HttpClient) {}





  upload( demandeId: number, files: File[]): Observable<string[]> {
    const formData: FormData = new FormData();
    formData.append('identite', files[0]);
    formData.append('baccalaureat', files[1]);
    formData.append('diplome', files[2]);

    return this.http.post<string[]>(`${this.baseUrl}/upload/${demandeId}`, formData);
  }

  download(fileUUID: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/download/${fileUUID}`, {
      responseType: 'blob'
    });
  }
  getDownloadLinksByDemandeId(demandeId: number): Observable<string[]> {
    const url = `${this.baseUrl}/downloadLinks/${demandeId}`;
    return this.http.get<string[]>(url);
  }
}