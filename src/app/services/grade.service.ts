import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GradeService {
  backendUrl: string;

  constructor(private http: HttpClient) {
    this.backendUrl = environment.backendUrl;
  }

  getAll(): Observable<any> {
    return this.http.get<any>(`${this.backendUrl}/commun/grade`);
  }

  get(id: number): Observable<any> {
    return this.http.get<any>(`${this.backendUrl}/commun/grade/${id}`);
  }

  create(school: any): Observable<any> {
    return this.http.post<any>(`${this.backendUrl}/commun/grade`, school);
  }

  update(school: any): Observable<any> {
    return this.http.put<any>(`${this.backendUrl}/commun/grade`, school);
  }
}
