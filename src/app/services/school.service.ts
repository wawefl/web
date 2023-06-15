import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SchoolService {
  backendUrl: string;

  constructor(private http: HttpClient) {
    this.backendUrl = environment.backendUrl;
  }

  get(id: number): Observable<any> {
    return this.http.get<any>(`${this.backendUrl}/admin/school/${id}`);
  }

  create(school: any): Observable<any> {
    return this.http.post<any>(`${this.backendUrl}/admin/school`, school);
  }

  update(school: any): Observable<any> {
    return this.http.put<any>(`${this.backendUrl}/admin/school`, school);
  }
}
